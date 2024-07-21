---
author: "Peter Yaacoub"
layout: "article"
title: "What's New in SwiftUI - WWDC24"
---

## Introduction

SwiftUI continues to evolve, bringing a host of new features and improvements in 2024. This year, there are significant updates across various aspects of the framework, enhancing the development experience and enabling the creation of more powerful and engaging apps.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/CNMRV0F0w74?si=bq0NgNcr53rrPy71" title="YouTube video player"></iframe>

## Tab Bar

SwiftUI now allows the creation of a [`TabView`](https://developer.apple.com/documentation/swiftui/tabview) with [`Tab`](https://developer.apple.com/documentation/swiftui/tab), coupled with a [`sidebarAdaptable`](https://developer.apple.com/documentation/swiftui/tabviewstyle/sidebaradaptable) [`tabViewStyle(_:)`](https://developer.apple.com/documentation/swiftui/view/tabviewstyle(_:)). The new tab view customization provides a perfect new tab bar experience on iPadOS and macOS.

## Windowing

There are several new modifiers for customizing window presentation and behavior:

- **`presentationSizing`**: Adjusts how sheets look when presented.
- **[`DocumentGroupLaunchScene`](https://developer.apple.com/documentation/swiftui/documentgrouplaunchscene)**: Enhances the launch experience for document-based apps.
- **[`windowStyle(_:)`](https://developer.apple.com/documentation/swiftui/scene/windowstyle(_:)/), [`windowLevel(_:)`](https://developer.apple.com/documentation/swiftui/scene/windowlevel(_:)/), [`defaultWindowPlacement(_:)`](https://developer.apple.com/documentation/swiftui/scene/defaultwindowplacement(_:)/)**: Fine-tune window appearance and behavior.
- **[`WindowDragGesture`](https://developer.apple.com/documentation/swiftui/windowdraggesture/)**: Makes windows draggable.
- **[`pushWindow`](https://developer.apple.com/documentation/swiftui/environmentvalues/pushwindow/)**: Makes new windows appear by closing the previous one.

## Math

SwiftUI introduces new ways to create and visualize mathematical data:

- **[`LinePlot`](https://developer.apple.com/documentation/charts/lineplot?language=_5)**: Create line plots with functions.
- **[`Table`](https://developer.apple.com/documentation/swiftui/table/)**: Create dynamic tables with `TableColumns` and `TableColumnForEach`.
- **[`MeshGradients`](https://developer.apple.com/documentation/SwiftUI/MeshGradient)**: Add visually stunning gradients to your app.
- **[`mix(with:by:in:)`](https://developer.apple.com/documentation/swiftui/color/mix(with:by:in:))**: Blend colors together dynamically.

## VisionOS

In visionOS, you can fine-tune effects with the new [`hoverEffect(_:in:isEnabled:)`](https://developer.apple.com/documentation/swiftui/view/hovereffect(_:in:isenabled:)) view modifier and make use of updates for volumes and immersive spaces.

## Input

Enhancements to input handling include:

- **[`modifierKeyAlternate(_:_:)`](https://developer.apple.com/documentation/swiftui/view/modifierkeyalternate(_:_:))**: For power users who use hidden menu options.
- **[`onModifierKeysChanged(mask:initial:_:)`](https://developer.apple.com/documentation/swiftui/view/onmodifierkeyschanged(mask:initial:_:))**: Adjust views based on modifier key presses.
- **[`pointerStyle(_:)`](https://developer.apple.com/documentation/swiftui/view/pointerstyle(_:))**: Customize mouse and trackpad pointer styles.
- **[`onPencilSqueeze(perform:)`](https://developer.apple.com/documentation/passkit_apple_pay_and_wallet/addpasstowalletbutton/4335990-onpencilsqueeze) and `onPencilDoubleTap`**: Create customized experiences with Apple Pencil.

## Text

New features for text formatting and input:

- Format text with a reference date, offset, or timer.
- Access text selection with [`TextSelection`](https://developer.apple.com/documentation/swiftui/textselection).
- New modifiers: [`searchFocused(_:)`](https://developer.apple.com/documentation/swiftui/view/searchfocused(_:)?changes=_9), [`textInputSuggestions(_:)`](https://developer.apple.com/documentation/swiftui/view/textinputsuggestions(_:)), and [`textRenderer(_:)`](https://developer.apple.com/documentation/swiftui/view/textrenderer(_:)).

## Scroll

The scrolling experience is more customizable with new modifiers and methods:

- **[`onScrollGeometryChange(for:of:action:)`](https://developer.apple.com/documentation/swiftui/view/onscrollgeometrychange(for:of:action:)) and [`onScrollVisibilityChange(threshold:_:)`](https://developer.apple.com/documentation/swiftui/view/onscrollvisibilitychange(threshold:_:))**: Track scrolling changes.
- **[`ScrollPosition`](https://developer.apple.com/documentation/swiftui/scrollposition) and [`scrollTo(edge:)`](https://developer.apple.com/documentation/swiftui/scrollposition/scrollto(edge:))**: Control scroll positions programmatically.

## Quality of Life Changes

New property wrappers and improvements:

- **[`Entry()`](https://developer.apple.com/documentation/swiftui/entry()/)**: Create new values for [`EnvironmentValues`](https://developer.apple.com/documentation/swiftui/environmentvalues), [`FocusedValues`](https://developer.apple.com/documentation/swiftui/focusedvalues), [`Transaction`](https://developer.apple.com/documentation/swiftui/transaction), or [`ContainerValues`](https://developer.apple.com/documentation/swiftui/containervalues).
- **[`Previewable()`](https://developer.apple.com/documentation/swiftui/previewable()/)**: Create [`State`](https://developer.apple.com/documentation/swiftui/state) properties in previews.

## Conclusion

SwiftUI 2024 brings exciting new features and enhancements, making it easier to build rich, interactive, and visually appealing applications. These updates provide developers with more tools and flexibility to create high-quality apps across all Apple platforms.