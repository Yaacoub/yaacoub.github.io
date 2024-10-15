---
author: "Peter Yaacoub"
layout: "article"
title: "Building a Customizable Segmented Control in SwiftUI"
---

## Introduction

Segmented controls are a common UI element in iOS applications, allowing users to switch between different views or options. While SwiftUI provides a built-in Picker with a segmented style, creating a custom segmented control can offer more flexibility in design and functionality. In this article, we'll explore how to build a custom segmented control in SwiftUI, drawing inspiration from my implementation in my app Catzumi.

## Code Implementation

Let's dive into the code for our custom `SegmentedControl`:

```swift
import SwiftUI

struct SegmentedControl: View {
    
    // MARK: - Properties
    
    @Binding var selection: Int
    var options: [String]
    
    // MARK: - Properties (Private)
    
    @StateObject private var themeManager = ThemeManager()
    
    // MARK: - Properties (Views)
    
    var body: some View {
        HStack(spacing: 0) {
            ForEach(options.indices, id: \.self) { index in
                Text(options[index])
                    .frame(maxWidth: .infinity)
                    .padding(8)
                    .apply { view in
                        if index == selection {
                            view
                                .foregroundStyle(themeManager.backgroundButton)
                                .background {
                                    Rectangle()
                                        .foregroundStyle(themeManager.foregroundButton)
                                }
                        } else {
                            view
                                .foregroundStyle(themeManager.foregroundButton)
                                .background {
                                    Rectangle()
                                        .foregroundStyle(themeManager.backgroundButton)
                                }
                        }
                    }
                    .onTapGesture {
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                        withAnimation(.linear(duration: 0.1)) { selection = index }
                    }
            }
        }
        .padding(8)
        .border(themeManager.foregroundButton, width: 4)
    }
    
}
```

This implementation includes several key points:
- **Dynamic Options**: The control accepts an array of strings, allowing for flexible segment options.
- **Theme Integration**: It uses a `ThemeManager` to ensure consistent styling across the app.
- **Interactive Feedback**: Haptic feedback is provided on selection changes.

## Usage

Here's how you can implement the custom `SegmentedControl` in your view:

```swift
import SwiftUI

struct ShopView: View {
    
    // MARK: - Properties (Private)
    
    @State private var section = 0
    
    // MARK: - Properties (View)
    
    var body: some View {
        ZStack {
            VStack(spacing: 0) {
                SegmentedControl(selection: $section, options: ["Cat", "Interface", "My Items"])
                    .padding()
                if section == 0 {
                    // ...
                } else if section == 1 {
                    // ...
                } else if section == 2 {
                    // ...
                }
            }
        }
    }

}
```

In this example from Catzumi, we've created a ShopView that uses our custom `SegmentedControl` to switch between different sections of the shop.

## Enhancements

To further improve the segmented control, consider these additions:
- **Accessibility**: Add voice-over labels and hints for each segment.
- **Animations**: Implement smooth transitions between segments.
- **Responsiveness**: Ensure the control adapts well to different screen sizes.

## Conclusion

Building a custom segmented control in SwiftUI allows for greater flexibility and theming options in your app. By taking inspiration from my app Catzumi, we can create intuitive and visually appealing UI elements that enhance user engagement.

Remember, the key to a great custom control is balancing functionality with design. As you implement this in your own projects, don't be afraid to experiment and adapt the control to fit your app's unique style and needs.