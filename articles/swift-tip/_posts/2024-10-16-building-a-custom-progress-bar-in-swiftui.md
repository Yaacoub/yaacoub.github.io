---
author: "Peter Yaacoub"
layout: "article"
title: "Building a Custom Progress Bar in SwiftUI"
---

## Introduction

Visual feedback is crucial for enhancing user experience in mobile applications. One of the most effective ways to show progress or completion status is through a progress bar. In this article, we'll explore how to create a custom progress bar in SwiftUI, sharing my specific implementation for my app, Catzumi.

## Code Implementation

Let's dive into the SwiftUI code that brings our custom progress bar to life:

```swift
import SwiftUI

struct ProgressBar: View {
    
    // MARK: - Properties
    
    var value: Int
    var maxValue: Int
    
    // MARK: - Properties (View)
    
    var body: some View {
        HStack {
            GeometryReader { proxy in
                ZStack(alignment: .leading) {
                    Rectangle()
                        .frame(width: proxy.size.width * min(1, CGFloat(value) / CGFloat(maxValue)))
                    Rectangle()
                        .foregroundStyle(.clear)
                        .border(.foreground, width: 4)
                        .frame(width: proxy.size.width)
                }
            }
            .frame(height: 40)
            Text("\(value)/\(maxValue)")
                .padding(.leading)
        }
    }
    
}
```

## Key Features

1. **Adaptive Sizing**: Using `GeometryReader`, our progress bar adapts to different screen sizes.
2. **Visual Clarity**: The progress is represented by a filled rectangle, with a clear border providing definition.
3. **Numerical Clarity**: The current progress is displayed as text, offering precise alongside visual representation.

## Usage

Here's an example of how I implemented the ProgressBar in Catzumi's HealthView:

```swift
import SwiftUI

struct HealthView: View {
    
    // MARK: - Properties (Private)
    
    @StateObject private var themeManager = ThemeManager()
    @StateObject private var viewModel = HealthViewModel()
    
    // MARK: - Properties (Views)
    
    var body: some View {
        // ...
        ProgressBar(value: viewModel.catHealth, maxValue: viewModel.catHealthMaximum)
            .foregroundStyle(themeManager.health)
        // ...
    }
    
}
```

## Conclusion

Creating a custom progress bar in SwiftUI allows for precise control over the user interface and experience. In Catzumi, these progress bars have become an integral part of the app's design, providing clear and consistent visual feedback across various features.

By maintaining a cohesive design language through components like this ProgressBar, we've created an intuitive interface that encourages user engagement and regular interaction.

Remember, the key to a great user interface is consistency and clarity. By thoughtfully implementing and styling components like progress bars, you can significantly enhance the overall user experience of your SwiftUI app.