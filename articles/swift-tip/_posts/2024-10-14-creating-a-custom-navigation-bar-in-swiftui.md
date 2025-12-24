---
author: "Peter Yaacoub"
layout: "article"
title: "Creating a Custom Navigation Bar in SwiftUI"
---

## Introduction

Navigation bars are a crucial component of many iOS applications, providing users with context and navigation options. While SwiftUI offers a built-in [NavigationStack](https://developer.apple.com/documentation/swiftui/navigationstack) with a default navigation bar, there are times when you need more control over the appearance and functionality. In this article, we'll explore how I created a custom navigation bar in SwiftUI, allowing for greater flexibility and design customization for my app Catzumi.

## Structure

Before diving into the implementation, let's outline the structure of our custom NavigationBar:
1. A ZStack for layering background and content
2. Customizable leading and trailing views
3. A central title view

## Code Implementation

We use generic types `<Title: View, Leading: View, Trailing: View>` to allow for flexible content in each part of the navigation bar, and the `init` method uses `@ViewBuilder` to create custom views for the title, leading, and trailing areas. Default empty views are provided for leading and trailing.

```swift
import SwiftUI

struct NavigationBar<Title: View, Leading: View, Trailing: View>: View {
    
    // MARK: - Init
    
    init(@ViewBuilder title: () -> Title, leading: () -> Leading = { EmptyView() }, trailing: () -> Trailing = { EmptyView() }) {
        self.title = title()
        self.leading = leading()
        self.trailing = trailing()
    }
    
    // MARK: - Properties
    
    var title: Title
    var leading: Leading
    var trailing: Trailing
    
    // MARK: - Properties (View)
    
    var body: some View {
        ZStack {
            HStack(spacing: 0) {
                leading.padding()
                Spacer()
                trailing.padding()
            }
            HStack {
                title.padding()
            }
        }
        .foregroundStyle(Color.black)
        .frame(height: 50)
        .background(
            Color.white
                .ignoresSafeArea(edges: .top)
        )
    }
    
}

```

## Usage

Here's how you might use the custom NavigationBar in a SwiftUI view:

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            NavigationBar {
                Text("My App")
            } leading: {
                Button(action: {}) { Image(systemName: "star") }
            } trailing: {
                Button(action: {}) { Image(systemName: "gear") }
            }
        }
    }
}
```

## Conclusion

Creating a custom navigation bar in SwiftUI offers greater control over your app's user interface. This implementation provides a flexible foundation for your navigation bar that you can easily extend and modify to suit your specific needs. Remember to consider accessibility and iOS design guidelines when customizing your navigation bar. With this custom implementation inspired by Catzumi, you have the freedom to create a unique and branded experience while maintaining the familiar iOS navigation paradigms that users expect.