---
author: "Peter Yaacoub"
layout: "article"
title: "Catch-up on Accessibility in SwiftUI - WWDC24"
---

## Introduction

The WWDC24 session on accessibility in SwiftUI provided crucial insights into enhancing the accessibility of your apps. This article will summarize key points from the session, focusing on out-of-the-box accessibility features and custom accessibility enhancements using SwiftUI modifiers.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/PHAA6nXTbdk?si=i5mxC2Ree4pSd2zL" title="YouTube video player"></iframe>

## The Out-of-the-Box Experience

SwiftUI simplifies the creation of accessible apps by automatically generating accessibility elements for views. These elements combine accessibility attributes and actions, ensuring that your app is initially accessible with minimal effort.

Use SwiftUI’s styling system instead of creating custom views to ensure the best accessibility experience. This leverages SwiftUI's built-in accessibility features, providing a solid foundation.

## The Custom Experience

While SwiftUI's default accessibility features are robust, customizations are sometimes necessary to achieve optimal accessibility. SwiftUI offers several modifiers to fine-tune how technologies like VoiceOver interact with on-screen elements.

Accessibility Modifiers:

1. [`accessibilityLabel(_:)`](https://developer.apple.com/documentation/swiftui/view/accessibilitylabel(_:)-1d7jv)
   Overrides or appends information to an accessibility element’s label, providing more context for VoiceOver.<br>
   *Note:* When a view’s opacity is set to 0, the accessibility element is hidden and skipped by VoiceOver.

2. [`accessibilityElement(children:)`](https://developer.apple.com/documentation/swiftui/view/accessibilityelement(children:))
   Combines children views to make VoiceOver interactions faster and smoother, useful for hover views.

3. [`accessibilityActions(_:)`](https://developer.apple.com/documentation/swiftui/view/accessibilityactions(_:))
   Assigns custom actions to views or widgets using methods or app intents. For drag and drop, use [`accessibilityDropPoint(_:description:)`](https://developer.apple.com/documentation/passkit_apple_pay_and_wallet/paywithapplepaybutton/4365511-accessibilitydroppoint?changes=latest_minor) and [`accessibilityDragPoint(_:description:)`](https://developer.apple.com/documentation/passkit_apple_pay_and_wallet/paywithapplepaybutton/4365508-accessibilitydragpoint?changes=latest_minor).

You can use these modifiers' variants with the `isEnabled` parameter to conditionally apply the accessibility attribute.

## Testing Accessibility

Always test your app with VoiceOver to ensure a complete and satisfactory experience for your target users. A personal tip: simulate common app actions with your eyes closed, relying solely on VoiceOver to understand the user experience from the perspective of those who depend on these features.

## Conclusion

By leveraging SwiftUI's built-in accessibility features and using custom modifiers, you can create an app that is accessible and user-friendly for everyone. Regular testing with VoiceOver ensures that your app meets the needs of all users, providing an inclusive and seamless experience.