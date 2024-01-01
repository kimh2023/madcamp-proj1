package com.madcampproj1.textdetection

import android.media.Image
import androidx.camera.core.ImageProxy

import com.mrousavy.camera.frameprocessor.Frame
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin

import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.Text
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions

class TextDetectionPlugin(options: Map<String, Any>?): FrameProcessorPlugin(options) {
  override fun callback(frame: ImageProxy, arguments: Map<String, Any>?): Any? {
    // code goes here
    val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
    val mediaImage: Image? = frame.getImage()

    if (mediaImage != null) {
      val image = InputImage.fromMediaImage(mediaImage, frame.imageInfo.rotationDegrees)
      val result = recognizer.process(image)
        .addOnSuccessListener { visionText ->
          // return "success"
        }
        .addOnFailureListener { e ->
          // return e
        }

    }
    return "hi"
  }
}
