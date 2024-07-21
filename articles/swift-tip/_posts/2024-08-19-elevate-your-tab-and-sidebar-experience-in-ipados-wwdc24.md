---
author: "Peter Yaacoub"
layout: "article"
title: "Elevate Your Tab and Sidebar Experience in iPadOS - WWDC24"
---

## Introduction

The new tab and sidebar experience in iPadOS has been expanded to all Apple platforms, including iOS, visionOS, macOS, and tvOS. This session covers the enhancements and adjustments to the tab bar and sidebar, making them more intuitive and versatile across different devices. Let's explore these updates and how you can implement them in your apps.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/si-7DinDz5c?si=NXYLgzIe__aTDJO3" title="YouTube video player"></iframe>

## Changes Across Platforms

### Unified Tab Bar Experience

The new tab bar experience is now consistent across all Apple platforms:

- **iOS**: Traditional bottom tab bar.
- **iPadOS**: Centered on the top navigation bar, enhancing visibility.
- **macOS, visionOS, tvOS**: Adaptive to different screen sizes and orientations.

No code changes are required for this visual shift, maintaining a seamless transition across devices.

### Tab Bar Structure

- **Fixed Items**: Always visible tabs.
- **Customizable Items**: User-configurable tabs.
- **Pinned Items**: Always accessible, even when scrolling.

## SwiftUI Enhancements

SwiftUI introduces several new features for handling tabs and sidebars seamlessly:

### Using TabView and TabViewStyle

- **Syntax**: Use [`TabView`](https://developer.apple.com/documentation/swiftui/tabview) with [`TabViewStyle`](https://developer.apple.com/documentation/swiftui/tabviewstyle) to create tabs.
- **Special Roles**: Utilize tabs with special roles, like `searchTab`.

### Sidebar Integration

- **Automatic Sidebar Transition**: Use [`tabViewStyle(sidebarAdaptable)`](https://developer.apple.com/documentation/swiftui/view/tabviewstyle(_:)) for iPadOS, macOS, visionOS, and tvOS.
- **Organizing Items**: Use [`TabViewStyle`](https://developer.apple.com/documentation/swiftui/tabviewstyle) views and [`sectionActions(content:)`](https://developer.apple.com/documentation/swiftui/view/sectionactions(content:)) modifier for section management.
- **Drag and Drop Handling**: Implement [`dropDestination(for:action:isTargeted:)`](https://developer.apple.com/documentation/swiftui/view/dropdestination(for:action:istargeted:)) to manage item dragging.

### Customization

Use [`tabViewCustomization(_:)`](https://developer.apple.com/documentation/swiftui/view/tabviewcustomization(_:)), [`customizationIdentifier`](https://developer.apple.com/documentation/uikit/uinavigationitem/3987968-customizationidentifier/), [`defaultVisibility(_:for:)`](https://developer.apple.com/documentation/swiftui/tabcontent/defaultvisibility(_:for:)), and [`customizationBehavior(_:for:)`](https://developer.apple.com/documentation/swiftui/tabcontent/customizationbehavior(_:for:)) for full customization.

## UIKit Integration

### Setting Up Tabs

In UIKit, creating and customizing tabs is straightforward:

- **Use [`UITabBarController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller)**: Manage tabs with [`tabs`](https://developer.apple.com/documentation/uikit/uitabbarcontroller/4434593-tabs) property and [`UITab`](https://developer.apple.com/documentation/uikit/uitab) variants like [`UISearchTab`](https://developer.apple.com/documentation/uikit/uisearchtab).

### Sidebar Experience

- **Modify [`mode`](https://developer.apple.com/documentation/uikit/uitabbarcontroller/4434587-mode) Property**: Use [`UITabBarControllerMode`](https://developer.apple.com/documentation/uikit/uitabbarcontrollermode) for sidebar setup.
- **SwiftUI Equivalents**: Convert [`TabSections`](https://developer.apple.com/documentation/swiftui/tabsection) to [`UITabGroup`](https://developer.apple.com/documentation/uikit/uitabgroup?changes=_2) and [`sectionActions(content:)`](https://developer.apple.com/documentation/swiftui/tabcontent/sectionactions(content:)) to [`sidebarActions`](https://developer.apple.com/documentation/uikit/uitabgroup/4435061-sidebaractions).
- **Drag and Drop Handling**: Implement [`UITabBarControllerDelegate`](https://developer.apple.com/documentation/uikit/uitabbarcontrollerdelegate) for drag and drop functionality.

### Additional Properties

- **Properties**: Use [`allowsHiding`](https://developer.apple.com/documentation/uikit/uitab/4434562-allowshiding/), [`preferredPlacement`](https://developer.apple.com/documentation/uikit/uitab/4434570-preferredplacement), [`allowsReordering`](https://developer.apple.com/documentation/uikit/uitabgroup/4434600-allowsreordering/), and [`displayOrderIdentifiers`](https://developer.apple.com/documentation/uikit/uitabgroup/4434604-displayorderidentifiers) for enhanced control.

## Conclusion

The enhancements to the tab and sidebar experience in iPadOS and across all Apple platforms bring a new level of flexibility and functionality to app development. Whether using SwiftUI or UIKit, these updates streamline the creation of intuitive and user-friendly interfaces.