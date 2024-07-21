---
author: "Peter Yaacoub"
layout: "article"
title: "Principles of Great Widgets - WWDC21"
---

## Introduction

Creating effective widgets requires understanding their update mechanics, location-based features, and design principles. This article outlines key points from the [WWDC21 session](https://developer.apple.com/videos/play/wwdc2021/10048/) on crafting exceptional widgets, focusing on how to optimize their functionality and user experience.

## Time

Widgets update at intervals measured in minutes and hours, not seconds. Highly viewed widgets can receive between 40 to 70 updates per day. Below is a summary of different update methods:

|                             | Budgeted | Free |
|-----------------------------|----------|------|
| TimelineReloadPolicy        | ✓        |      |
| WidgetCenter                | ✓        | ~    |
| Significant location change |          | ✓    |
| System update               |          | ✓    |

### TimelineReloadPolicy

- **[`atEnd`](https://developer.apple.com/documentation/widgetkit/timelinereloadpolicy/atend)**: For content that continuously updates.
- **[`after(_:)`](https://developer.apple.com/documentation/widgetkit/timelinereloadpolicy/after(_:))**: For unpredictable content, but be cautious of server overload if many users trigger updates simultaneously.
- **[`never`](https://developer.apple.com/documentation/widgetkit/timelinereloadpolicy/never)**: For static content, utilize WidgetCenter reload methods for updates.

## Location

Widgets can provide location-specific content by setting the `NSWidgetUsesLocation` property to true in the Info.plist (documentation not found). Use [`CLLocationManager`](https://developer.apple.com/documentation/corelocation/cllocationmanager) in the timeline provider to check user authorization with the [`isAuthorizedForWidgetUpdates`](https://developer.apple.com/documentation/corelocation/cllocationmanager/isauthorizedforwidgetupdates) property.

### Location Permissions

| Location permission          | Widget’s access |
|------------------------------|-----------------|
| Never                        |                 |
| Allow once                   |                 |
| While using app              | ~               |
| While using app or widgets   | ~               |
| Always                       | ✓               |

## Design

Widgets adapt to light and dark modes using SwiftUI. They can also maintain a consistent brand style, independent of the theme. iPadOS supports an extra-large widget variant, providing more design flexibility.

### Privacy-Sensitive Information

For privacy-sensitive content, use the [`privacySensitive(_:)`](https://developer.apple.com/documentation/swiftui/view/privacysensitive(_:)) view modifier and set the `com.apple.developer.default-data-protection` entitlement to [`NSFileProtectionComplete`](https://developer.apple.com/documentation/foundation/nsfileprotectioncomplete).

**Example Code Snippet:**
```swift
Text("Sensitive Info")
    .privacySensitive()
```

### Widget Configuration

Widgets are part of a [`WidgetBundle`](https://developer.apple.com/documentation/swiftui/widgetbundle), ordered by importance. Configuration options include [`StaticConfiguration`](https://developer.apple.com/documentation/widgetkit/staticconfiguration) and [`IntentConfiguration`](https://developer.apple.com/documentation/widgetkit/intentconfiguration), offering diverse customization for optimal user experience.

```swift
struct MyWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "com.example.mywidget", provider: Provider()) { entry in
            MyWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}
```

## Conclusion

Adhering to these principles ensures that your widgets are functional, user-friendly, and visually appealing. By understanding update mechanics, leveraging location features, and following design best practices, you can create widgets that enhance the user experience and add significant value to your app.