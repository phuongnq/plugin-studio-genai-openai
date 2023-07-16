package plugins.org.rd.plugin.openai

@Grab(group='io.github.http-builder-ng', module='http-builder-ng-core', version='1.0.4', initClass=false)

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.nio.file.Files
import java.nio.file.Path
import java.io.FileInputStream
import java.io.BufferedInputStream

import java.nio.file.StandardCopyOption

import groovy.json.JsonSlurper

import groovyx.net.http.HttpBuilder
import groovyx.net.http.ContentTypes 
import static groovyx.net.http.HttpBuilder.configure
import groovyx.net.http.optional.Download



class GenerativeContentServices {

    private static final Logger logger = LoggerFactory.getLogger(GenerativeContentServices.class)

    def aiServices

    /**
     * plugin config constructor
     */
    def GenerativeContentServices(pluginConfig) {
        aiServices = new AiServices(pluginConfig)
    }    

    /**
     * given text generate a image url
     */
    def generateImageDownloadUrlForText(text) {
        def image = null

        try {
            image = aiServices.doImageGeneration(text)
        }
        catch(err) {
            logger.error("Image request failed :" + err)
        }

        return image
    }

    /**
     * Perform a HTTP Get
     */
    def httpGet(url) {
        def apiUrl = url
        def result = HttpBuilder.configure { request.raw = apiUrl }.get()
    }
}