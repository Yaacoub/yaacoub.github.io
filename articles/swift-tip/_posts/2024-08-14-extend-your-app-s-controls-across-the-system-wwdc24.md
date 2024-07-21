---

author: "Peter Yaacoub"
layout: "article"
title: "Extend Your App’s Controls Across the System - WWDC24"
---

## Introduction

With iOS 18, you can now extend your app’s controls across the system, making them accessible from the Control Center, the Action Button, or the Lock Screen. These controls provide quick access to key actions and information, enhancing user experience and engagement.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/7cZb7L2yfZg?si=SML4dCnKWX3n9FHG" title="YouTube video player"></iframe>

## Set-up

Controls are created using [WidgetKit](https://developer.apple.com/documentation/widgetkit), similar to the widgets introduced in iOS 14. You can use a [`ControlWidget`](https://developer.apple.com/documentation/swiftui/controlwidget) or a specialized widget like [`ControlWidgetToggle`](https://developer.apple.com/documentation/widgetkit/controlwidgettoggle) with an [`Image`](https://developer.apple.com/documentation/swiftui/image) or [`Label`](https://developer.apple.com/documentation/swiftui/label). These controls can be either a toggle or a button and come in three different sizes for various use cases.

### Static Controls

For static controls, use [`StaticControlConfiguration`](https://developer.apple.com/documentation/widgetkit/staticcontrolconfiguration?changes=_9) along with a [`ControlValueProvider`](https://developer.apple.com/documentation/widgetkit/controlvalueprovider/). This provider has [`currentValue()`](https://developer.apple.com/documentation/widgetkit/controlvalueprovider/currentvalue()) and [`previewValue`](https://developer.apple.com/documentation/widgetkit/controlvalueprovider/previewvalue) properties. The [`currentValue()`](https://developer.apple.com/documentation/widgetkit/controlvalueprovider/currentvalue()) updates asynchronously, while the [`previewValue`](https://developer.apple.com/documentation/widgetkit/controlvalueprovider/previewvalue) is displayed in the Controls Gallery or Action Button settings.

### Configurable Controls

For configurable controls, use [`AppIntentControlValueProvider`](https://developer.apple.com/documentation/widgetkit/appintentcontrolvalueprovider/) and the [`promptsForUserConfiguration()`](https://developer.apple.com/documentation/swiftui/widgetconfiguration/promptsforuserconfiguration()/) view modifier.

## Invalidation

Controls can be invalidated in three ways:

1. **Action Performed**: When the control’s action is executed.
2. **App Request**: When the app requests a reload using the [`reloadAllControls()`](https://developer.apple.com/documentation/widgetkit/controlcenter/reloadallcontrols()/) method.
3. **Notification**: When the app sends a notification coupled with the [`ControlPushHandler`](https://developer.apple.com/documentation/widgetkit/controlpushhandler/).

This capability makes the control powerful in the sense that it can sync between the user’s devices when change is required.

## Display

To ensure the control is presented as expected, use the following modifiers:

- **[`controlWidgetActionHint(_:)`](https://developer.apple.com/documentation/SwiftUI/View/controlWidgetActionHint(_:)-5yoyh)**: Modifies the text shown on the Dynamic Island or next to the Action Button.
- **[`controlWidgetStatus`](https://developer.apple.com/documentation/SwiftUI/View/controlWidgetStatus(_:)-1q1ez)**: Changes the control’s status.
- **`displayName` and `description`**: Customize how the control appears in the Controls Gallery and Action Button settings.

**Example Code Snippet (Display Customization):**
```swift
ControlWidgetToggle("Toggle Control", systemImage: "star.fill")
    .controlWidgetActionHint("Toggle Star")
    .controlWidgetStatus(.enabled)
    .displayName("Star Toggle")
    .description("A toggle for stars")
```

## Conclusion

By extending your app’s controls across the system, you enhance user interaction and provide quick access to essential functionalities. Following these guidelines and using the provided code snippets will help you integrate controls seamlessly into your app.