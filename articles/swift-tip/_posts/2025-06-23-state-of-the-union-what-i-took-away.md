---
author: "Peter Yaacoub"
layout: "article"
title: "State of the Union: What I Took Away"
---

## Introduction

This article is a quick post on what I took away from watching Apple's Platforms State of the Union at WWDC25. The aim is to be neither overly objective nor overly subjective, but to cherry-pick the information that mattered most to me in a quick read.

Here's the video if you want to watch the full keynote.

<iframe src="https://www.youtube.com/embed/51iONeETSng?si=IZGWzJ3ZteqHJa0h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="youtube"></iframe>

## A new design

### Liquid Glass

This year, Apple introduced Liquid Glass, a new universal design for all their platforms. The keywords they used were "content first" and, in theory, that's what it looks like. The focus is to make the device's glass part of the design, and to integrate this design into every library: SwiftUI, UIKit, and AppKit.

The glass is dynamic, reflects the background colors, adapts to light and dark content, and follows the curvature of the display. Besides, elements are now larger, bolder and left-aligned, as can be seen with the new alert dialogs.

![Liquid Glass](/-assets/images/articles/swift-tip/state-of-the-union-what-i-took-away/liquid_glass.webp)

### Updating

Seeing the new changes on all platforms is as simple as recompiling the Xcode project. Then, the developers like you and I can refine the look by simplifying custom controls and using new and updated APIs like `tabBarBottomAccessory`, `tabBarCollapsesOnScroll`, [`ToolbarSpacer`](https://developer.apple.com/documentation/swiftui/toolbarspacer/) and [`backgroundExtensionEffect()`](https://developer.apple.com/documentation/swiftui/view/backgroundextensioneffect()).

### Icons

Xcode now includes a new tool called Icon Composer to create and export icons for Xcode and marketing materials directly. It implements all necessary tools to adhere to the new Liquid Glass design, although the platforms automatically adapt the icons.

As a rule of thumb, an app icon should have between 2 to 4 layers as stated by Apple.

![Icon Composer](/-assets/images/articles/swift-tip/state-of-the-union-what-i-took-away/icons.webp)

## Better intelligence

### Open use

Apple platform developers can now directly tap into Apple Intelligence, the locally available AI on Apple devices. This works through the new [`FoundationModels`](https://developer.apple.com/documentation/FoundationModels) framework which, in turn, uses new API that includes a [`LanguageModelSession`](https://developer.apple.com/documentation/foundationmodels/languagemodelsession) with a [`respond(to:options:isolation:)`](https://developer.apple.com/documentation/foundationmodels/languagemodelsession/respond(to:options:isolation:)) method that allows you to get a response to a prompt with batch or streaming generation. Implemented with a [`Tool`](https://developer.apple.com/documentation/foundationmodels/tool) and [`Generable(description:)`](https://developer.apple.com/documentation/foundationmodels/generable(description:)) or [`Guide(description:)`](https://developer.apple.com/documentation/foundationmodels/guide(description:)) macros and developers can create powerful new features in their apps.

### Improvements

New improvements that help developers use and debug Apple Intelligence includes a new `#Playground` API and the [`VisualIntelligence`](https://developer.apple.com/documentation/VisualIntelligence) framework for deep linking, for instance.

## Developer Updates

### Swift 6.2

The new Swift 6.2 introduces new and improved interoperability with Java, JavaScript, WebAssembly and C++. New and updated types also include [`InlineArray`](https://developer.apple.com/documentation/swift/inlinearray?changes=l_9) and [`Span`](https://developer.apple.com/documentation/swift/span?changes=la) which replace pointers for safer code. For better safety measures, the Swift update also introduces the new `Concurrent` macro.

You can learn about all these changes and improvements at the newly redesigned [swift.org] website. There, you might also learn about a new containerization technique introduced by Apple (or not).

### SwiftUI

Apple and the SwiftUI team have finally added a new native `WebView` and `WebPage`! There's also a new rich text editor, 3D charts, and [`SwiftData`](https://developer.apple.com/documentation/SwiftData) updates.

macOS now loads lists of 100k items up to 6x faster!

### Coding with AI

Xcode can now use ChatGPT to generate fixes, playgrounds and DocC documentation and inline comments. A new history slider will also make it possible to go back in time through the prompts and code changes within a conversation.

### Augmented Reality

VisionOS updates include the all-important window and widget anchoring and persistence in space, even after shutting down the hardware. Apple now also uses a new proprietary format for visualizing media in space: `Apple Projected Media Format`.

### Gaming

Gaming on Apple is growing year by year, and it isn't stopping with the new Metal 4 update. Now, neural rendering works with AI, making the frame rate smoother than ever. The Game Porting Toolkit is also updated and debugging remotely from Windows will now be possible. Other news include the [`GameSave`](https://developer.apple.com/documentation/GameSave) framework.

Finally, macOS Tahoe will be the final release on Intel Macs. It's time to say goodbye to that era of computing.