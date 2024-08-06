---
author: "Peter Yaacoub"
layout: "article"
title: "Track model changes with SwiftData history - WWDC24"
---

## Introduction

These are some notes I took while watching the WWDC24 session: Track Model Changes with SwiftData History.

Besides [SwiftData](https://developer.apple.com/xcode/swiftdata/)’s new features involving efficiency and customization, its new history feature provides great ways for syncing offline changes, discovering out-of-process changes, and reloading data efficiently. Starting with iOS 18 and all equivalent Apple platforms, you won’t be limited to querying only from the data store’s most recent state.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/K2FzpebEL_4?si=RgTSFYExGTgRNz9E" title="YouTube video player"></iframe>

## How it Works

The SwiftData history is composed of transactions, conforming to [`HistoryTransaction`](https://developer.apple.com/documentation/swiftdata/historytransaction), that group changes, conforming to [`HistoryChange`](https://developer.apple.com/documentation/swiftdata/historychange), which can be [`HistoryDelete`](https://developer.apple.com/documentation/swiftdata/historydelete), [`HistoryInsert`](https://developer.apple.com/documentation/swiftdata/historyinsert), or [`HistoryUpdate`](https://developer.apple.com/documentation/swiftdata/historyupdate). All transactions and changes are sorted by the time of occurrence.

When using the default data store, all the mentioned protocols use their default counterparts, which are the protocols to which they conform.

## Preserving Values

To preserve values in the history, or the “tombstone” as Apple calls it, you add the [`Attribute`](https://developer.apple.com/documentation/swiftdata/attribute(_:originalname:hashmodifier:)) macro with the [`preserveValueOnDeletion`](https://developer.apple.com/documentation/swiftdata/schema/attribute/option/preservevalueondeletion) [`Option`](https://developer.apple.com/documentation/swiftdata/schema/attribute/option) to the concerned model’s properties.

For instance, I would add this attribute option in my app, Huh? Dictionary, if I believed that I’d need to preserve my `SearchEntry`'s `word` property.

```swift
import Foundation
import SwiftData

@Model
final class SearchEntry {
    
    // MARK: - Init
    
    init(word: String) {
        self.word = word
    }
    
    // MARK: - Properties
    
    @Attribute(.unique, .preserveValueOnDeletion) var word: String
    var date: Date = Date.now

}
```

Note also that you can delete the history for a certain model at any time if you deem the information not useful anymore.

## Fetching from History

Fetching information from the history consists of finding the transactions and processing the transactions.

In the first step, you use a [`HistoryDescriptor`](https://developer.apple.com/documentation/swiftdata/historydescriptor), while in the second, you use a [`FetchDescriptor`](https://developer.apple.com/documentation/swiftdata/fetchdescriptor) for each transaction change to match the [`persistentModelId`](https://developer.apple.com/documentation/swiftdata/persistentmodel/persistentmodelid) with the [`changedPersistentIdentifier`](https://developer.apple.com/documentation/swiftdata/historychange/changedpersistentidentifier).

## Conclusion

If I could go back in time and have an influence on the new SwiftData changes, I wouldn’t change anything because I wouldn’t be qualified and because I find the history to be a very welcome improvement in democratizing Apple’s one-year-old framework.