package co.za.rroi.app;

import android.content.Intent;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(RroiSosShortcutPlugin.class);
        super.onCreate(savedInstanceState);

        openShortcutUrl(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        openShortcutUrl(intent);
    }

    private void openShortcutUrl(Intent intent) {
        if (intent == null) {
            return;
        }

        String targetUrl = intent.getStringExtra("rroi_target_url");

        if (targetUrl != null && getBridge() != null) {
            getBridge().getWebView().post(() ->
                getBridge().getWebView().loadUrl(targetUrl)
            );
        }
    }
}