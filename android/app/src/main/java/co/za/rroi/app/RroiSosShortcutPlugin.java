package co.za.rroi.app;

import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "RroiSosShortcut")
public class RroiSosShortcutPlugin extends Plugin {

    private static final String SHORTCUT_ID = "rroi-sos-shortcut";

    @PluginMethod
    public void addToHomeScreen(PluginCall call) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            call.reject(
                "Home-screen shortcuts require Android 8.0 or newer."
            );
            return;
        }

        ShortcutManager shortcutManager =
            getContext().getSystemService(ShortcutManager.class);

        if (
            shortcutManager == null ||
            !shortcutManager.isRequestPinShortcutSupported()
        ) {
            call.reject(
                "This phone does not support pinned Home Screen shortcuts."
            );
            return;
        }

        Intent shortcutIntent =
            new Intent(getContext(), MainActivity.class);

        shortcutIntent.setAction(Intent.ACTION_VIEW);
        shortcutIntent.putExtra(
    "rroi_target_url",
    "https://www.rroi.co.za/rroi-sos"
);

        shortcutIntent.addFlags(
            Intent.FLAG_ACTIVITY_NEW_TASK |
            Intent.FLAG_ACTIVITY_CLEAR_TOP
        );

        ShortcutInfo shortcut =
            new ShortcutInfo.Builder(
                getContext(),
                SHORTCUT_ID
            )
                .setShortLabel("RROI SOS")
                .setLongLabel("Open RROI SOS")
                .setIcon(
                    Icon.createWithResource(
                        getContext(),
                        R.drawable.rroi_sos_shortcut
                    )
                )
                .setIntent(shortcutIntent)
                .build();

        boolean requested =
            shortcutManager.requestPinShortcut(
                shortcut,
                null
            );

        JSObject result = new JSObject();
        result.put("requested", requested);

        call.resolve(result);
    }
}