---
author: "Peter Yaacoub"
layout: "article"
title: "Bring Widgets to Life - WWDC23"
---

## Introduction

Animating and interacting with widgets can significantly enhance their user experience. This article outlines key insights from the [WWDC23 session](https://developer.apple.com/videos/play/wwdc2023/10028/) on bringing widgets to life, focusing on animations, interaction capabilities, and content updates.

## Animations

Widgets built with SwiftUI are inherently animated when content changes. You can enhance these animations using various modifiers to achieve your desired effects.

### Key Modifiers

- **[`contentTransition(_:)`](https://developer.apple.com/documentation/swiftui/view/contenttransition(_:))**: Defines the transition style when content changes.
- **[`animation(_:value:)`](https://developer.apple.com/documentation/swiftui/view/animation(_:value:))**: Specifies the animation details, such as duration and timing curve.
- **Combination of [`id(_:)`](https://developer.apple.com/documentation/swiftui/view/id(_:)) and [`transition(_:)`](https://developer.apple.com/documentation/swiftui/view/transition(_:)-5h5h0)**: Offers fine-grained control over the animation and transition logic.

### Debugging Tips

Simplify debugging by using a `#Preview` with custom timeline entries. This approach helps you visualize and test animations without deploying the widget.

## Interaction

SwiftUI and AppIntents frameworks now support interactive views, enhancing widget interactivity. Only [`Button`](https://developer.apple.com/documentation/swiftui/button) and [`Toggle`](https://developer.apple.com/documentation/swiftui/toggle) views can be used in widgets, and they can take an app intent to define actions.

### Using App Intents

App intents open up a range of possibilities, allowing actions to be exposed across the app, widgets, Shortcuts app, and Siri.

### Updating Widget Content

When content in your widget changes, use the [`invalidatableContent`](https://developer.apple.com/documentation/SwiftUI/View/invalidatableContent(_:)) view modifier. This modifier ensures that the widget's content is updated appropriately when interactions occur.

**Example Code Snippet:**
```swift
Text("Counter: \(counter)")
    .invalidatableContent()
```

## Conclusion

By leveraging animations and interactions effectively, you can create dynamic and engaging widgets. Utilizing SwiftUI's animation and interaction capabilities, along with the [`invalidatableContent`](https://developer.apple.com/documentation/SwiftUI/View/invalidatableContent(_:)) modifier, ensures that your widgets provide a smooth and responsive user experience.