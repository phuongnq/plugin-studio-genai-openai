import plugins.org.rd.plugin.openai.AiServices

def subject = params.subject
def fieldName = params.fieldName

def prompt = "${subject}"
def mode = "complete"

def aiServices = new AiServices(pluginConfig)

logger.info("AI Gen for field {}, subject {}", fieldName, subject)

if("image".equals(mode)) {
    return aiServices.doImageGeneration(prompt)
} else {
    return aiServices.doCompletion(prompt)
}