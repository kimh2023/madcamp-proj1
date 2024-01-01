package com.madcampproj1

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import com.google.mlkit.vision.common.InputImage
import android.util.Log

class TextDetectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "TextDetectionModule"

    fun recognizeImage(byteArray: ByteArray) {
//        reactContext.runOnJS

//        var image = Input
//        var image = InputImage.fromByteArray(
//            byteArray,
//            /* image width */ 480,
//            /* image height */ 360,
//            0,
//            InputImage.IMAGE_FORMAT_NV21 // or IMAGE_FORMAT_YV12
//    )
    }
}


