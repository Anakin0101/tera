package com.teramobile;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.content.Intent;
import android.provider.Settings;



public class OpenSettingsModule extends ReactContextBaseJavaModule {
   OpenSettingsModule(ReactApplicationContext context) {
       super(context);
   }

    @Override
    public String getName() {
        return "OpenSettingsModule";
    }

	 @ReactMethod
    public void openMainSettings() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(Settings.ACTION_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        context.startActivity(intent);
    }
}