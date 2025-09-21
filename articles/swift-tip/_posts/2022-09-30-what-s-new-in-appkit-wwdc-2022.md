---
author: "Peter Yaacoub"
image: "articles/swift-tip/what-s-new-in-appkit-wwdc-2022/hero.webp"
layout: "article"
title: "What's new in AppKit - WWDC 2022"
---

## Introduction

AppKit is the underlying framework for creating robust macOS apps. In this post, I'll focus on some of its new features.
If you are using AppKit in a Swift project and are curious about what changes have taken place since WWDC22, read on!

## Stage Manager

Stage Manager is Apple's most noteworthy feature revealed this year for iPadOS 16 and macOS 13. There are no changes to make to your codebase, but here I'll list some things you should note.

A window will not swap out for another window if it has floating panels, modal presentation, or a [toolbar style](https://developer.apple.com/documentation/appkit/nswindow/3608199-toolbarstyle) set to `.preference`. Besides, auxiliary windows are always on top of a primary window.

Many [collection behaviors](https://developer.apple.com/documentation/appkit/nswindow/collectionbehavior) won't displace the active window:
- `collectionBehavior = .auxiliary`
- `collectionBehavior = .moveToActiveSpace`
- `collectionBehavior = .stationary`
- `collectionBehavior = .transient`

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/stage-manager.webp)

## Preferences

Apple has renamed Preferences to Settings throughout their mac operating system. The most flagrant example is the System Preferences app which now becomes System Settings. As a consequence of this change, you'll have to replace all mentions of the old naming convention with the new one in your project's codebase.

If using SwiftUI, the setting's view preferred layout is a Form with its [form style](https://developer.apple.com/documentation/swiftui/form/formstyle(_:)) set to `.insetGrouped`.

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/preferences.webp)

## Controls

### NSComboButton

There are new and updated controls this year. The [NSComboButton](https://developer.apple.com/documentation/appkit/nscombobutton) is the combination of a button and a drop-down menu. When you set its [style](https://developer.apple.com/documentation/appkit/nscombobutton/3943292-style) to `.split`, it looks like a button with a drop-down arrow on its trailing side. With `.unified`, it behaves like a button but shows more options when the user clicks and holds.

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/nscombobutton.webp)

### NSColorWell

Another long-awaited change is concerning the [NSColorWell](https://developer.apple.com/documentation/appkit/nscolorwell). You can further customize its appearance with the [color well style](https://developer.apple.com/documentation/appkit/nscolorwell/3955203-colorwellstyle) property. It can either be set to `.default`, `.minimal` or `.expanded`. Either has a consistent look with their iOS and iPadOS counterparts. Besides, you can customize the color selection behavior with the [pulldown target](https://developer.apple.com/documentation/appkit/nscolorwell/3955207-pulldowntarget) and [action](https://developer.apple.com/documentation/appkit/nscolorwell/3955206-pulldownaction) instance properties.

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/nscolorwell.webp)

### NSToolbar

Yet another modification involves the [NSToolbar](https://developer.apple.com/documentation/appkit/nstoolbar). Its [delegate](https://developer.apple.com/documentation/appkit/nstoolbardelegate?changes=latest_major) now offers two new methods:
- `toolbarImmovableItemIdentifiers(_:)`
- `toolbar(_:itemIdentifier:canBeInsertedAt:)`

The former returns the identifier of items that should have a fixed position in the toolbar. The latter gives a boolean value indicating whether the user can insert the item at the specified position. Besides, the [NSToolbarItem](https://developer.apple.com/documentation/appkit/nstoolbaritem) object has a new property, `possibleLabels`, that contains all the labels the item might display depending on the available space. It also prevents unwanted shifting.

### NSAlert

[NSAlert](https://developer.apple.com/documentation/appkit/nsalert) comes with a new layout to complement the existing one. If the alert message is too long, the control switches from a compact appearance where the text is under the icon to an expanded appearance where it is on its trailing side.

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/nsalert.webp)

### NSTableView

Lastly, the [NSTableView](https://developer.apple.com/documentation/appkit/nstableview) has gotten a performance boost on AppKit and SwiftUI through the [List](https://developer.apple.com/documentation/swiftui/list/) view. Using the [delegate](https://developer.apple.com/documentation/appkit/nstableviewdelegate)'s `tableView(_:heightOfRow:)` method, the system improves its rendering predictions for the table.

## SF Symbols

There are four types of rendering modes for SF Symbols:
- Monochrome, one color.
- Hierarchical, one color, with multiple opacities.
- Palette, custom colors.
- Multicolor, multiple predefined colors.

Configure the symbols using [NSImage](https://developer.apple.com/documentation/appkit/nsimage)'s `withSymbolConfiguration(:_)` method. Then, you can choose the preferred rendering mode. Also, you can use the new variable ones directly with the NSImage initializers containing the `variableValue` parameter.

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/sf-symbols.webp)

## Sharing

The macOS Ventura share sheet presents richer information than ever, in the same fashion as iOS and iPadOS. It automatically generates the metadata, but you can set it up yourself if using an [NSPreviewRepresentingActivityItem](https://developer.apple.com/documentation/appkit/nspreviewrepresentingactivityitem). In whatever context, using an [NSSharingServicePicker](https://developer.apple.com/documentation/appkit/nssharingservicepicker) or not, the share sheet now shows up as a popover view.

![Stage Manager](/-assets/images/articles/swift-tip/what-s-new-in-appkit-wwdc-2022/sharing.webp)

## Conclusion

I've rarely used AppKit for my projects, but it's refreshing news to hear that it's still getting some significant improvements. Learn about AppKit by checking out the [WWDC22 session 10074: What's new in AppKit](https://developer.apple.com/videos/play/wwdc2022/10074/).