package plugins.org.rd.plugin.openai

@Grab(group='com.theokanning.openai-gpt3-java', module='client', version='0.11.0', initClass=false)

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.theokanning.openai.OpenAiService
import com.theokanning.openai.completion.CompletionRequest
import com.theokanning.openai.image.CreateImageRequest

/** 
 * Open AI Text Gen (ChatGPT-3)
 * DAL-E image image services
 */
class AiServices {

  private static final Logger logger = LoggerFactory.getLogger(AiServices.class)

  def openAiToken
  def openAiUserId
  def openAiService

  /**
   * config constructor
   */
  def AiServices(pluginConfig) {
    openAiToken = pluginConfig.getString("openAiToken")
    openAiUserId = pluginConfig.getString("openAiUserId")

    openAiService = new OpenAiService(openAiToken)
  }

 /**
  * perform text completion
  */
  def doImageGeneration(ask) {
    CreateImageRequest request = CreateImageRequest.builder()
      .prompt(ask)
      .build();

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
      CompletionRequest completionRequest = CompletionRequest.builder()
        .model("text-davinci-003")
        .prompt(ask)
        .echo(false)
        .user(openAiUserId)
        .maxTokens(350)
        .build()

      def choices = openAiService.createCompletion(completionRequest).getChoices()

      choices.each { choice -> 
        // All of the answers come as one string (bug in API?)
        def answers = choice.text.split("\n")

        answers.each { answer ->
          if(answer && answer != "") {
            // remove number label from each answer
            def cleanedAnswer = answer.substring(answer.indexOf(". ")+1)
            
            // Clean quotes off string (may be better way long term to parse answers)
            //cleanedAnswer = cleanedAnswer.substring(1,cleanedAnswer.length)

            generatedContent.add(cleanedAnswer)
          }
        }
      }

    }
    catch(err) {
      generatedContent = ["oops"]
    }

    return generatedContent
  }
}
