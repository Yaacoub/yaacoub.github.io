---
author: "Peter Yaacoub"
layout: "article"
title: "Build Multilingual Ready Apps - WWDC24"
---

## Introduction

Creating multilingual ready apps ensures a broader reach and a better user experience. This article outlines key concepts and best practices from the WWDC24 session on building multilingual ready apps, focusing on handling keyboard interactions, text rendering, and localization.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/b9SdW3kUJXY?si=0zxwCu0jpvbIFKRU" title="YouTube video player"></iframe>

## Remember the Keyboard

To remember the keyboard language and layout, override [`UIResponder`](https://developer.apple.com/documentation/uikit/uiresponder)’s [`textInputContextIdentifier`](https://developer.apple.com/documentation/uikit/uiresponder/1621091-textinputcontextidentifier) property. This approach is primarily applicable in UIKit and not directly achievable in SwiftUI without subclassing.

**Example Code Snippet (UIKit):**
```swift
override var textInputContextIdentifier: String? {
    return "YourIdentifier"
}
```

## Stay Above the Keyboard

### UIKit

Set or override [`UIResponder`](https://developer.apple.com/documentation/uikit/uiresponder)’s [`inputAccessoryView`](https://developer.apple.com/documentation/uikit/uiresponder/1621119-inputaccessoryview) property to place a view above the keyboard.

### SwiftUI

Use a [`ToolbarItem`](https://developer.apple.com/documentation/swiftui/toolbaritem) or [`ToolbarItemGroup`](https://developer.apple.com/documentation/swiftui/toolbaritemgroup) with the [`keyboard`](https://developer.apple.com/documentation/swiftui/toolbaritemplacement/keyboard) placement to achieve the same effect.

## Check for Marked Text

Before making changes to text in a text field, ensure there is no marked text that is yet to be confirmed by using [`UITextInput`](https://developer.apple.com/documentation/uikit/uitextinput)’s [`markedTextRange`](https://developer.apple.com/documentation/uikit/uitextinput/1614489-markedtextrange) property.

```swift
if let range = textInput.markedTextRange, !range.isEmpty {
    // Handle marked text
}
```

## Standardize Search

Ensure searches are locale-aware, case, and diacritic insensitive by using a [`String`](https://developer.apple.com/documentation/swift/string)’s [`localizedStandardRange(of:)`](https://developer.apple.com/documentation/foundation/nsstring/1413574-localizedstandardrange) method.

**Example Code Snippet:**
```swift
let text = "This is an Example"
let range = text.localizedStandardRange(of: "example")
```

To highlight search strings within results, modify the color instead of text weight or italicization.

```swift
let attributedText = NSMutableAttributedString(string: "Search Result")
attributedText.addAttribute(.backgroundColor, value: UIColor.yellow, range: range)
```

## Render Language Scripts Correctly

Use the system’s default fonts for proper spacing and sizing across different scripts. Avoid overriding [`UIView`](https://developer.apple.com/documentation/uikit/uiview)’s [`clipsToBounds`](https://developer.apple.com/documentation/uikit/uiview/1622415-clipstobounds) if it contains text to ensure readability.

For consistent typesetting in SwiftUI, use the [`typesettingLanguage(_:isEnabled:)`](https://developer.apple.com/documentation/swiftui/view/typesettinglanguage(_:isenabled:)-4ldzm) method.

**Example Code Snippet (SwiftUI):**
```swift
Text(verbatim: "Hi!")
    .typesettingLanguage(.init(languageCode: .english))
```

## Format Names

Use a formatter to ensure names are used correctly across different cultures and languages.

**Example Code Snippet:**
```swift
let personName = PersonNameComponents(givenName: "John", familyName: "Doe")
let formattedName = personNameFormatter.string(from: personName)
```

## Localize Hard-Coded Numbers

Utilize [`AttributedString`](https://developer.apple.com/documentation/foundation/attributedstring) with the [`localized`](https://developer.apple.com/documentation/foundation/attributedstring/3867590-init) parameter for automatic number localization.

**Example Code Snippet:**
```swift
let localizedNumber = AttributedString("1234", locale: Locale.current)
```

## Setting the Language

To allow users to change the app’s language within the app settings, set the `UIPrefersShowingLanguageSettings` value to `true` in the Info.plist file. You can also create a button that opens the app’s settings page using [`UIApplication`](https://developer.apple.com/documentation/uikit/uiapplication/)’s [`openSettingsURLString`](https://developer.apple.com/documentation/uikit/uiapplication/1623042-opensettingsurlstring/) property.

**Example Code Snippet:**
```swift
if let url = URL(string: UIApplication.openSettingsURLString) {
    await UIApplication.shared.open(url)
}
```

For opening the notification settings page, use [`openNotificationSettingsURLString`](https://developer.apple.com/documentation/uikit/uiapplication/4013180-opennotificationsettingsurlstrin).

**Example Code Snippet:**
```swift
if let url = URL(string: UIApplication.openNotificationSettingsURLString) {
    await UIApplication.shared.open(url)
}
```

## Conclusion

Building multilingual ready apps involves careful consideration of various aspects, from keyboard interactions to text rendering and localization. By following these guidelines, you can create a more inclusive and user-friendly app that caters to a global audience.