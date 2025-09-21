---
author: "Peter Yaacoub"
image: "articles/swift-tip/meet-desktop-class-ipad-wwdc-2022/hero.webp"
layout: "article"
title: "Meet desktop-class iPad - WWDC 2022"
---

## Introduction

The iPad was a desktop-class machine without desktop-class applications. However, the newest iPadOS 16 and UIKit changes bring a term to that contrast between hardware and software. I'll show you how to create your first desktop-class iPad app.

## Navigation Style

New in iOS, iPadOS, and macCatalyst 16, the [`style`](https://developer.apple.com/documentation/uikit/uinavigationitem/3987969-style) instance property on the view controller's navigation item lets you determine how the navigation bar lays out its content. The default is the `navigator` style for traditional navigation. Use the `browser` style if history and location matter in the app's current context. Use the `editor` style if you're focused on document editing and destination.

![Navigation styles](/-assets/images/articles/swift-tip/meet-desktop-class-ipad-wwdc-2022/navigation-style.webp)

## Center Items

Although the `UIBarButtonItemGroup` class was available since iOS 9, it is now more practical than ever with the introduction of three new type methods:
- [`fixedGroup`](https://developer.apple.com/documentation/uikit/uibarbuttonitemgroup/3990270-fixedgroup)
- [`movableGroup`](https://developer.apple.com/documentation/uikit/uibarbuttonitemgroup/3990271-movablegroup)
- [`optionalGroup`](https://developer.apple.com/documentation/uikit/uibarbuttonitemgroup/3990272-optionalgroup)

A fixed group is a group of bar button items that the user cannot move or remove from the navigation bar during layout customization. The movable group is one that the person can move but not remove. Finally, the optional group is one that the user can move, remove and add.

You can also create these groups using one of three `UIBarButtonItem` instance methods:
- [`creatingFixedGroup`](https://developer.apple.com/documentation/uikit/uibarbuttonitem/3987945-creatingfixedgroup)
- [`creatingMovableGroup`](https://developer.apple.com/documentation/uikit/uibarbuttonitem/3987946-creatingmovablegroup)
- [`creatingOptionalGroup`](https://developer.apple.com/documentation/uikit/uibarbuttonitem/3990269-creatingoptionalgroup)

After creating your item groups, you can add them to the navigation item's [`centerItemGroups`](https://developer.apple.com/documentation/uikit/uinavigationitem/3987967-centeritemgroups) instance property to show them in the middle of the navigation bar.

However, it's important to note that to support the customization of the navigation bar's layout, you have to set the navigation item's [`customizationIdentifier`](https://developer.apple.com/documentation/uikit/uinavigationitem/3987968-customizationidentifier) instance property. The app will then save and restore the user's custom layout across app launches.

![Center items](/-assets/images/articles/swift-tip/meet-desktop-class-ipad-wwdc-2022/center-items.webp)

## Title Menu & Document Properties

When the navigation style is `browser` or `editor`, the user can tap the navigation title to show document properties and actions; this is the title menu.

You can optionally assign a [`titleMenuProvider`](https://developer.apple.com/documentation/uikit/uinavigationitem/3967523-titlemenuprovider) to the navigation item. The latter is a closure in which you can add suggested `UIMenu` elements in addition to custom elements you wish to provide to your users. By default, it contains items to duplicate, move, rename, export and print your document.

The title menu shows the document properties in its header. You can assign a `UIDocumentProperties` item to the navigation item's [`documentProperties`](https://developer.apple.com/documentation/uikit/uinavigationitem/3967521-documentproperties) instance property. Initialize the document properties object with a URL to gather a document's metadata and set its [`dragItemsProvider`](https://developer.apple.com/documentation/uikit/uidocumentproperties/3967514-dragitemsprovider) and [`activityViewControllerProvider`](https://developer.apple.com/documentation/uikit/uidocumentproperties/3967513-activityviewcontrollerprovider) to provide drag-and-drop and sharing support, respectively.

![Title menu with document properties](/-assets/images/articles/swift-tip/meet-desktop-class-ipad-wwdc-2022/title-menu--document-properties.webp)

## Inline Rename

I may have lied about the default title menu elements. Indeed the rename action isn't available unless you assign a [`renameDelegate`](https://developer.apple.com/documentation/uikit/uinavigationitem/3967522-renamedelegate) to the navigation Item. You can customize the rename experience by calling `UIResponderStandardEditActions`'s [`rename(_:)`](https://developer.apple.com/documentation/uikit/uiresponderstandardeditactions/3967532-rename) instance method.

![Inline rename](/-assets/images/articles/swift-tip/meet-desktop-class-ipad-wwdc-2022/inline-rename.webp)

## Inline Search

Search bars are easy to implement and add to your navigation item: assign the latter's [`searchController`](https://developer.apple.com/documentation/uikit/uinavigationitem/2897305-searchcontroller) instance property with a search controller object you create. With the newest versions of iPadOS and macCatalyst, the navigation bar shows the search bar inline, next to other items. However, you can change its placement with the navigation item's [`searchBarPlacement`](https://developer.apple.com/documentation/uikit/uinavigationitem/3975871-searchbarplacement) instance property. Besides, when implementing the search controller, don't forget to set its [`searchResultsUpdater`](https://developer.apple.com/documentation/uikit/uisearchcontroller/1618661-searchresultsupdater) property to `self` for methods used to update your search results.

![Inline rename](/-assets/images/articles/swift-tip/meet-desktop-class-ipad-wwdc-2022/inline-search.webp)

## Conclusion

I'm still pondering if these new features are sufficient. Perhaps thinking about the question this way will help me: what, exactly, is a desktop-class app?

This article summarizes Apple's [WWDC22 session 10069: Meet desktop-class iPad](https://developer.apple.com/videos/play/wwdc2022/10069/).