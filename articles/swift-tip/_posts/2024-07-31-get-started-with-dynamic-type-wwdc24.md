---
author: "Peter Yaacoub"
layout: "article"
title: "Get Started with Dynamic Type - WWDC24"
---

## Introduction

Dynamic Type is a crucial feature for enhancing readability and accessibility in your apps. This article will guide you through the key concepts and best practices for implementing Dynamic Type in both SwiftUI and UIKit, based on the WWDC24 session.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/ZqDZjW9TpFw?si=kuKeCs5QuTsFBo5G" title="YouTube video player"></iframe>

## Text

Apple recommends using their built-in font styles instead of fixed fonts to ensure optimal readability and scalability.

### SwiftUI

Use the [`font(_:)`](https://developer.apple.com/documentation/swiftui/view/font(_:)) view modifier to apply dynamic text styles.

```swift
Text("Hello, World!")
    .font(.title)
```

### UIKit

- Set the label’s [`adjustsFontForContentSizeCategory`](https://developer.apple.com/documentation/uikit/uicontentsizecategoryadjusting/1771731-adjustsfontforcontentsizecategor) property to `true`.
- Ensure the [`numberOfLines`](https://developer.apple.com/documentation/uikit/uilabel/1620539-numberoflines) property is set to `0` for multi-line support.
- Use the [`preferredFont(forTextStyle:)`](https://developer.apple.com/documentation/uikit/uifont/1619030-preferredfont) for the given text style.

```swift
let label = UILabel()
label.adjustsFontForContentSizeCategory = true
label.numberOfLines = 0
label.font = UIFont.preferredFont(forTextStyle: .body)
```

Avoid fixed numbers of lines or fixed-size views to prevent text truncation or clipping issues.

## Layout

Using dynamic layouts ensures that your UI adapts seamlessly to different text sizes.

### SwiftUI

Use the [`dynamicTypeSize`](https://developer.apple.com/documentation/swiftui/environmentvalues/dynamictypesize) environment key to create an [`AnyLayout`](https://developer.apple.com/documentation/swiftui/anylayout) property that switches between [`HStackLayout`](https://developer.apple.com/documentation/swiftui/hstacklayout) and [`VStackLayout`](https://developer.apple.com/documentation/swiftui/vstacklayout) based on accessibility size.

```swift
@Environment(\.dynamicTypeSize) var dynamicTypeSize

let layout: AnyLayout = dynamicTypeSize.isAccessibilitySize ? AnyLayout(VStackLayout()) : AnyLayout(HStackLayout())

layout {
    Text("Dynamic")
    Text("Layout")
}
```

### UIKit

Use [`UIStackView`](https://developer.apple.com/documentation/uikit/uistackview) with the axis adjusted based on the accessibility category, and respond to content size change notifications.

```swift
let stackView = UIStackView()
stackView.axis = .vertical // Change based on content size category

NotificationCenter.default.addObserver(forName: UIContentSizeCategory.didChangeNotification, object: nil, queue: .main) { _ in
    stackView.axis = (UIApplication.shared.preferredContentSizeCategory == .accessibilityLarge) ? .vertical : .horizontal
}
```

## Images

Prioritize scaling essential views over decorative ones, and consider removing non-essential decorative views for better readability and usability.

### SwiftUI

Use the [`ScaledMetric`](https://developer.apple.com/documentation/swiftui/scaledmetric) property wrapper to scale image dimensions.

```swift
@ScaledMetric var imageSize: CGFloat = 100

Image(systemName: "star.fill")
    .frame(width: imageSize, height: imageSize)
```

### UIKit

Use [`UIImage.SymbolConfiguration`](https://developer.apple.com/documentation/uikit/uiimage/symbolconfiguration) for scalable image dimensions.

```swift
let image = UIImage(systemName: "star.fill", withConfiguration: UIImage.SymbolConfiguration(scale: .large))
```

## Custom Bars and Views

Adopt the large content viewer for custom bars and views to enhance accessibility.

### SwiftUI

Use the [`accessibilityShowsLargeContentViewer()`](https://developer.apple.com/documentation/swiftui/view/accessibilityshowslargecontentviewer()) view modifier.

**Example Code Snippet:**
```swift
Button("Custom Button") {}
    .accessibilityShowsLargeContentViewer()
```

### UIKit

Implement [`UILargeContentViewerItem`](https://developer.apple.com/documentation/uikit/uilargecontentvieweritem), [`UILargeContentViewerInteraction`](https://developer.apple.com/documentation/uikit/uilargecontentviewerinteraction), and use `gestureRecognizerForExclusionRelationship`, but I can't find documentation for the latter.

## Testing Accessibility

Always test your app with different Dynamic Type settings to ensure a full and acceptable user experience.

## Conclusion

Implementing Dynamic Type in your app ensures that it remains accessible and user-friendly for all users, regardless of their preferred text size. By following the guidelines and best practices outlined above, you can create an app that adapts seamlessly to different accessibility needs.