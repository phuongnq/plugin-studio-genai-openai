package plugins.org.rd.plugin.openai

@Grab(group='com.theokanning.openai-gpt3-java', module='service', version='0.16.0', initClass=false)

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.theokanning.openai.service.OpenAiService
import com.theokanning.openai.completion.chat.ChatCompletionRequest
import com.theokanning.openai.completion.chat.ChatMessage
import com.theokanning.openai.image.CreateImageRequest
import java.time.Duration

/**
 * Open AI Text Gen (ChatGPT-4)
 * DALL-E image image services
 */
class AiServices {

    private static final Logger logger = LoggerFactory.getLogger(AiServices.class)

    /**
     * Default API calls timeout
     */
    private static final Duration DEFAULT_TIMEOUT = Duration.ofSeconds(100)

    def openAiToken
    def openAiUserId
    def openAiService

    /**
     * config constructor
     */
    def AiServices(pluginConfig) {
        openAiToken = pluginConfig.getString("openAiToken")
        openAiUserId = pluginConfig.getString("openAiUserId")

        openAiService = new OpenAiService(openAiToken, DEFAULT_TIMEOUT)
    }

    /**
     * perform text completion
     */
    def doImageGeneration(ask) {
        CreateImageRequest request = CreateImageRequest.builder()
            .prompt(ask)
            .build()

        def images = []
        def generatedImages = openAiService.createImage(request).getData()

        generatedImages.each { image ->
            images.add(image.getUrl())
        }

        return images
    }

    def doDistillation(ask) {
        return doCompletion("distill the following to a single word or phase: "+ask)[0]
    }

    /**
     * perform text completion
     */
    def doCompletion(ask) {
        def generatedContent = []

        try {
            ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(List.of(
                new ChatMessage("user", ask)
                ))
                .user(openAiUserId)
                .maxTokens(350)
                .build()

            def choices = openAiService.createChatCompletion(completionRequest).getChoices()

            choices.each { choice ->
                // All of the answers come as one string (bug in API?)
                def answers = choice.getMessage().getContent().split("\n")

                answers.each { answer ->
                    if (answer && answer != "") {
                        generatedContent.add(answer)
                    }
                }
            }
        } catch(err) {
            generatedContent = ["oops"]
        }

        return generatedContent
    }
}
