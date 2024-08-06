---
author: "Peter Yaacoub"
layout: "article"
title: "SwiftData’s new Index and Unique macros"
---

## Introduction

These are notes taken during the WWDC24 session: What’s new in SwiftData.

Alongside the existing [`Attribute`](https://developer.apple.com/documentation/swiftdata/attribute(_:originalname:hashmodifier:)), [`Relationship`](https://developer.apple.com/documentation/swiftdata/relationship(_:deleterule:minimummodelcount:maximummodelcount:originalname:inverse:hashmodifier:)), and [`Transient`](https://developer.apple.com/documentation/swiftdata/transient()) macros, new [`Index`](https://developer.apple.com/documentation/swiftdata/index(_:)-74ia2) and [`Unique`](https://developer.apple.com/documentation/swiftdata/unique(_:)) macros are now available in [SwiftData](https://developer.apple.com/documentation/swiftdata) starting with iOS 18.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/-IMOuvRQilc?si=X0JaGWttEOqPi-kd" title="YouTube video player"></iframe>

## Index

The `Index` macro specifies model properties that are frequently filtered and sorted to enhance the efficiency of these operations.

In my app, [Huh? Dictionary](/apps/huh-dictionary/), when users search for a word in the search bar, previously searched entries appear below it, sorted by recency and filtered by relevance. Therefore, the `word` property of `SearchEntry` is an ideal candidate for the `Index` macro.

```swift
import Foundation
import SwiftData

@Model
final class SearchEntry {
    
    // MARK: - Macros
    
    #Index<SearchEntry>([\.word])
    
    // MARK: - Init
    
    init(word: String) {
        self.word = word
    }
    
    // MARK: - Properties
    
    @Attribute(.unique) var word: String
    var date: Date = Date.now
    
}
```

Similar to the `Unique` macro below, properties can be grouped together in an array. This is useful when filtering or sorting requires them in the same boolean expression. For example, if users can enter a date range before submitting a search query, the indices for my `Index` macro would differ to optimize efficiency.

```swift
#Index<SearchEntry>([\.word], [\.word, \.date])
```

## Unique

The `Unique` macro extends the Attribute's [`unique`](https://developer.apple.com/documentation/swiftdata/schema/attribute/option/unique) [`Option`](https://developer.apple.com/documentation/swiftdata/schema/attribute/option) by ensuring a model entity is unique based on combinations of multiple properties. For instance, if a `Person` entity has `id`, `givenName`, and `familyName`, uniqueness can be defined based on `id` alone or `givenName` and `familyName` together.

```swift
import Foundation
import SwiftData

@Model
final class Person {
    
    // MARK: - Macros
    
    #Unique<Person>([\.id], [\.givenName, \.familyName])
    
    // MARK: - Init
    
    init(id: UUID, givenName: String, familyName: String) {
        self.id = id
        self.givenName = givenName
        self.familyName = familyName
    }
    
    // MARK: - Properties
    
    var id: UUID
    var givenName: String
    var familyName: String
    
}
```

## Conclusion

The `Index` and `Unique` macros introduce significant improvements to `SwiftData`, enhancing efficiency, storage, and speed. Despite being only a year old, this framework promises simplicity and power, achieving what [`CoreData`](https://developer.apple.com/documentation/coredata/) had not previously accomplished.