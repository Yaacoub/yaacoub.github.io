---
author: "Peter Yaacoub"
layout: "article"
title: "Crafting a Typewriter Text Animation in SwiftUI"
---

## Introduction

Text animations can significantly enhance the user experience of an app, adding a touch of dynamism and interactivity. One particularly engaging effect is the typewriter animation, where text appears character by character as if being typed in real-time. For instance, this animation is particularly in vogue with AI chat platforms. In fact, I've implemented this very animation in my app Catzumi's onboarding process, creating a retro engaging and memorable first impression for new users.

In this article, we'll explore how to implement this effect in SwiftUI, creating a reusable AnimatedText view that brings your text to life.

## Understanding the Concept

Before diving into the code, let's break down the core idea behind the typewriter animation:

1. We start with an empty string and gradually reveal each character.
2. We use AttributedString to control the visibility of characters.
3. We employ a recursive function with a delay to create the typing effect.

Using AttributeString instead of adding each character one by one helps avoid layout issues.

![Animation](/-assets/images/articles/{{ page.categories | last }}/{{ page.title | slugify }}/animation.mov)

## Code Implementation

Let's walk through the implementation of our AnimatedText view.

```swift

import SwiftUI

struct AnimatedText: View {
    
    // MARK: - Inits
    
    init(_ text: Binding<String>) {
        self._text = text
        var attributedText = AttributedString(text.wrappedValue)
        attributedText.foregroundColor = .clear
        self._attributedText = State(initialValue: attributedText)
    }
    
    // MARK: - Properties (Private)
    
    @Binding private var text: String
    @State private var attributedText: AttributedString
    
    // MARK: - Properties (View)
    
    var body: some View {
        Text(attributedText)
            .onAppear { animateText() }
            .onChange(of: text) { animateText() }
    }
    
    // MARK: - Methods (Private)
    
    private func animateText(at position: Int = 0) {
        if position <= text.count {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                let stringStart = String(text.prefix(position))
                let stringEnd = String(text.suffix(text.count - position))
                let attributedTextStart = AttributedString(stringStart)
                var attributedTextEnd = AttributedString(stringEnd)
                attributedTextEnd.foregroundColor = .clear
                attributedText = attributedTextStart + attributedTextEnd
                animateText(at: position + 1)
            }
        } else {
            attributedText = AttributedString(text)
        }
    }
    
}
```

### Initialization

```swift
init(_ text: Binding<String>) {
    self._text = text
    var attributedText = AttributedString(text.wrappedValue)
    attributedText.foregroundColor = .clear
    self._attributedText = State(initialValue: attributedText)
}
```

We initialize our view with a binding to a `String`. We create an `AttributedString` from this text and initially set its color to clear, making it invisible.

### View Body

```swift
var body: some View {
    Text(attributedText)
        .onAppear { animateText() }
        .onChange(of: text) { animateText() }
}
```

The view displays the `attributedText`. We start the animation when the view appears and whenever the text changes.

### Animation Logic

```swift
private func animateText(at position: Int = 0) {
    if position <= text.count {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.075) {
            let stringStart = String(text.prefix(position))
            let stringEnd = String(text.suffix(text.count - position))
            let attributedTextStart = AttributedString(stringStart)
            var attributedTextEnd = AttributedString(stringEnd)
            attributedTextEnd.foregroundColor = .clear
            attributedText = attributedTextStart + attributedTextEnd
            animateText(at: position + 1)
        }
    } else {
        attributedText = AttributedString(text)
    }
}
```

This recursive function is the heart of our animation:
1. We split the text into two parts: visible and invisible.
2. We create attributed strings for both parts, setting the color of the end part to clear.
3. We combine these parts and update our attributedText.
4. We call the function again with the next position after a short delay of `0.075` seconds.
5. When we reach the end of the text, we make the entire text visible.

## Using the AnimatedText View

To use this view in your SwiftUI app, you can simply do:

```swift
struct ContentView: View {

    // MARK: - Properties (Private)

    @State private var text = "Hello, SwiftUI!"

    // MARK: - Properties (View)
    
    var body: some View {
        AnimatedText($text)
    }
}
```

## Benefits

Implementing this typewriter animation in Catzumi's onboarding process proved to have several benefits.

1. **Improved Engagement**: The dynamic text keeps users interested and encourages them to read through the entire onboarding process.
2. **Paced Information Delivery**: By revealing text gradually, we ensure users have time to absorb each piece of information before moving on to the next.
3. **Personality**: The typing effect adds a touch of personality to the app, making it feel more interactive and alive.
4. **Reduced Overwhelm**: For apps with complex features, this technique encourages the developer to break down information into digestible chunks, reducing the risk of overwhelming new users.

## Conclusion

The `AnimatedText` view provides a sleek, customizable typewriter animation for your SwiftUI apps. By leveraging SwiftUI's declarative syntax and the power of `AttributedString`, we've created a reusable component that can add a touch of dynamism to any text in your app.

Remember, while animations can enhance user experience, they should be used judiciously. Consider the context and frequency of use to ensure they add value rather than distraction. For instance, using the typewriter effect only in the onboarding process can serve a clear purpose in introducing new users to the app's concept and features.