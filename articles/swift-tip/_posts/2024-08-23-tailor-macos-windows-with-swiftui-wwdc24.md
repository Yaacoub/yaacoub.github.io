---
author: "Peter Yaacoub"
layout: "article"
title: "Tailor macOS Windows with SwiftUI - WWDC24"
---

## Introduction

macOS window customization with SwiftUI has reached new heights with the updates introduced at WWDC24. This article provides a summary of the "Tailor macOS Windows with SwiftUI" session, detailing the key features and modifications you can apply to enhance your app's window experience on macOS.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/zosCe4q1xPI?si=M_oVtCejQEyqDXBy" title="YouTube video player"></iframe>

## Context

### Default Window Layout

A macOS window typically consists of:
- **Toolbar**: Contains window controls and a title on the left-hand side, with additional toolbar items.
- **Main Content**: The primary content area of the window.
- **Background**: Underlies the main content.
- **Shadow**: Surrounds the window, providing a visual depth effect.

In SwiftUI, you use [`Window`](https://developer.apple.com/documentation/swiftui/window) and [`WindowGroup`](https://developer.apple.com/documentation/swiftui/windowgroup) views to create and manage these windows.

## Customization on macOS

### Removing the Toolbar

To remove the window's toolbar, use the following modifiers:

```swift
.toolbar(removing: .title)
.toolbarBackgroundVisibility(.hidden, for: .windowToolbar)
```

### Modifying the About Window

Create a new window with the “about” identifier to customize your app’s about window. You can then apply various modifiers:

```swift
Window("About", id: "about") {
    AboutView()
        .containerBackground(.thickMaterial, for: .window)
        .windowResizability(.contentSize)
        .windowMinimizeBehavior(.disabled)
        .restorationBehavior(.disabled)
}
```

### Additional Customizations

Explore other customization options such as creating borderless windows and welcome windows to suit specific needs.

## Placement & Size

### Default Window Placement

The placement and size of windows are crucial for user experience. Use the [`defaultWindowPlacement(_:)`](https://developer.apple.com/documentation/swiftui/scene/defaultwindowplacement(_:)/) modifier to set the initial position and size of a window.

### Ideal Window Placement

For cases where the user zooms the window, use the [`windowIdealPlacement(_:)`](https://developer.apple.com/documentation/swiftui/scene/windowidealplacement(_:)) modifier to ensure it behaves as expected.

## Conclusion

The enhancements introduced at WWDC24 for customizing macOS windows with SwiftUI provide developers with powerful tools to create more intuitive and visually appealing applications. By leveraging these features, you can significantly improve the user experience in your macOS apps.