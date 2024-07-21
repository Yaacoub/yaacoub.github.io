---
author: "Peter Yaacoub"
layout: "article"
title: "Enhance Your UI Animations and Transitions - WWDC24"
---

## Introduction

SwiftUI and UIKit have received significant updates for UI animations and transitions, introduced at WWDC24. This article summarizes the "Enhance Your UI Animations and Transitions" session, highlighting the new features and how to implement them to create smooth, engaging user experiences.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/UDaNFV1Ll3E?si=c8VcyfE8CVz2FLSh" title="YouTube video player"></iframe>

## Transition

### Zoom Transition

Both SwiftUI and UIKit now support a new zoom transition, enabling elements like cells to transition seamlessly into views. 

In SwiftUI, use the [`navigationTransition(_:)`](https://developer.apple.com/documentation/swiftui/view/navigationtransition(_:)?changes=_9) and [`matchedTransitionSource(id:in:configuration:)`](https://developer.apple.com/documentation/swiftui/view/matchedtransitionsource(id:in:configuration:)) view modifiers.

In UIKit, set the [`preferredTransition`](https://developer.apple.com/documentation/uikit/uiviewcontroller/4448100-preferredtransition) property.

### Transition Cycles

Understanding the appear and disappear cycles, along with push and pop actions, is crucial for implementing transitions:

- **Pop Cancelation:** The [`viewDidDisappear(_:)`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621477-viewdiddisappear) method is skipped, and the appear chain runs.
- **Push Cancelation:** The appear chain finishes, and the disappear chain runs, with no methods skipped.

### Smooth Transitions

Normally, tracking the transition state isn't necessary, and smooth transitions can be achieved by simply calling methods like [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller)'s [`pushViewController(_:animated:)`](https://developer.apple.com/documentation/uikit/uinavigationcontroller/1621887-pushviewcontroller).

## Interoperability

### SwiftUI Animations in UIKit

SwiftUI animations can now be directly implemented within UIKit, making it easier to create consistent animations across both frameworks.

```swift
UIView.animate(.spring(duration: 0.5)) {
    // Animation code here
}
```

This is equivalent to:

```swift
UIView.animate(springDuration: 0.5) {
    // Animation code here
}
```

## Conclusion

The updates introduced at WWDC24 for UI animations and transitions in SwiftUI and UIKit provide developers with powerful tools to create more engaging and visually appealing applications. By leveraging these features, you can significantly enhance the user experience in your iOS and macOS apps.