package com.teramobile

import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class OpenSettingsModule internal constructor(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "OpenSettingsModule"
    }

    @ReactMethod
    fun openMainSettings() {
        val context = reactApplicationContext
        val intent = Intent(Settings.ACTION_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY)
        context.startActivity(intent)
    }
}