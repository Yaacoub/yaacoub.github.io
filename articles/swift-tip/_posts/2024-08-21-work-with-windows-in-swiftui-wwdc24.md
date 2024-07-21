---
author: "Peter Yaacoub"
layout: "article"
title: "Work with Windows in SwiftUI - WWDC24"
---

## Introduction

SwiftUI continues to evolve, and with the latest updates in WWDC24, managing windows in your SwiftUI applications has become even more powerful and flexible. This article summarizes the key points and features introduced in the "Work with Windows in SwiftUI" session at WWDC24, providing you with the knowledge to enhance your app's window management capabilities.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/6t7LhRkBobk?si=xXtjo04jlEPxNPdt" title="YouTube video player"></iframe>

## Appearance

### Using WindowGroup

For each scene you create in your app, use a [`WindowGroup`](https://developer.apple.com/documentation/swiftui/windowgroup) with a unique identifier. This ensures that each window has its distinct context and state.

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup("MainWindow") {
            ContentView()
        }
    }
}
```

### Window Styles

Different platforms may offer unique styles for windows. For example, visionOS supports a volumetric style that provides a three-dimensional effect.

## Actions

SwiftUI provides several environment actions to manage windows effectively.

### Opening and Closing Windows

- **[`openWindow`](https://developer.apple.com/documentation/swiftui/environmentvalues/openwindow/)**: Show a new window.
- **[`dismissWindow`](https://developer.apple.com/documentation/swiftui/environmentvalues/dismisswindow)**: Hide the current window.
- **[`pushWindow`](https://developer.apple.com/documentation/swiftui/environmentvalues/pushwindow)**: Show a new window and hide the current one.

```swift
@Environment(\.openWindow) private var openWindow
@Environment(\.dismissWindow) private var dismissWindow

Button("Open New Window") {
    openWindow(id: "SecondWindow")
}

Button("Close Window") {
    dismissWindow()
}
```

### Toolbars

Use toolbars to enhance window organization and user navigation. Implement [`ToolbarItem`](https://developer.apple.com/documentation/swiftui/toolbaritem/) and [`ToolbarTitleMenu`](https://developer.apple.com/documentation/swiftui/toolbartitlemenu/) for customization. Hide system overlays when necessary using the [`persistentSystemOverlays(_:)`](https://developer.apple.com/documentation/swiftui/view/persistentsystemoverlays(_:)) view modifier.

## Placement and Size

### Window Placement

You can position windows relative to other windows, users, or the screen using the [`defaultWindowPlacement(_:)`](https://developer.apple.com/documentation/swiftui/scene/defaultwindowplacement(_:)/) modifier with the [`WindowPlacement`](https://developer.apple.com/documentation/swiftui/windowplacement) structure.

### Window Size

Control the window's size with the [`defaultSize`](https://developer.apple.com/documentation/swiftui/scene/defaultsize(_:)-3lx7m) and [`windowResizability(_:)`](https://developer.apple.com/documentation/swiftui/scene/windowresizability(_:)/) view modifiers. Adjusting these properties ensures your windows appear correctly on different devices and screen sizes.

## Conclusion

The enhancements in window management in SwiftUI introduced at WWDC24 provide developers with powerful tools to create dynamic, responsive, and user-friendly applications. By leveraging these new features, you can significantly improve the user experience in your apps across various Apple platforms.