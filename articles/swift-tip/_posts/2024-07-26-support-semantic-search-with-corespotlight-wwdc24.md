---
author: "Peter Yaacoub"
layout: "article"
title: "Support Semantic Search with CoreSpotlight - WWDC24"
---

## Introduction

At WWDC24, Apple introduced significant enhancements to CoreSpotlight, focusing on semantic search capabilities. This article will guide you through the process of adding your app's content to Spotlight indexes, enabling a more intelligent and relevant search experience for users.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/9KTzWhg8GP8?si=yD--5j6utx0E-IhU" title="YouTube video player"></iframe>

## Semantic Search

CoreSpotlight is an Apple framework that allows you to donate content to Spotlight search. The latest update introduces semantic search, which enhances the relevance of search results, particularly for text, image, and video content.

## Understanding the Difference

Here's a comparison between regular search (left) and semantic search (right):

| **Windsurfing Carmet**    | **Windsurfing Carmet**     |
|---------------------------|----------------------------|
| The best windsurfing      | Sailboarding lessons       |
| Carmel Country            | The best windsurfing       |
| Windsurfing lessons       | Carmel Country             |
|                           | Windsurfing lessons        |

With semantic search, related terms and synonyms are considered, making search results more intuitive and user-friendly.

## Creating Searchable Items

To donate content to Spotlight, you need to create searchable items using [`CSSearchableItem`](https://developer.apple.com/documentation/corespotlight/cssearchableitem) and [`CSSearchableItemAttributeSet`](https://developer.apple.com/documentation/corespotlight/cssearchableitemattributeset). Depending on the content type, you’ll need to define specific properties:

- **Text Content:** Set the [`title`](https://developer.apple.com/documentation/corespotlight/cssearchableitemattributeset/title) and [`textContent`](https://developer.apple.com/documentation/corespotlight/cssearchableitemattributeset/textcontent).
- **Images:** Use the [`contentURL`](https://developer.apple.com/documentation/corespotlight/cssearchableitemattributeset/contenturl).
- **Attachments and Web Content:** Define the [`relatedUniqueIdentifier`](https://developer.apple.com/documentation/corespotlight/cssearchableitemattributeset/relateduniqueidentifier).

```swift
let attributeSet = CSSearchableItemAttributeSet(itemContentType: kUTTypeText as String)
attributeSet.title = "Windsurfing Lessons"
attributeSet.textContent = "Join the best windsurfing lessons at Carmel Beach."

let item = CSSearchableItem(uniqueIdentifier: "com.example.windsurfing", domainIdentifier: "windsurfing", attributeSet: attributeSet)
let searchableIndex = CSSearchableIndex.default()

searchableIndex.indexSearchableItems([item]) { error in
    if let error = error {
        print("Indexing error: \(error.localizedDescription)")
    } else {
        print("Search item successfully indexed!")
    }
}
```

## Indexing Content

Once your searchable items are ready, use the [`CSSearchableIndex`](https://developer.apple.com/documentation/corespotlight/cssearchableindex) class and [`CSSearchableIndexDelegate`](https://developer.apple.com/documentation/corespotlight/cssearchableindexdelegate) protocol to index them. The [`beginBatch()`](https://developer.apple.com/documentation/corespotlight/cssearchableindex/beginbatch()) and [`endBatch(withClientState:completionHandler:)`](https://developer.apple.com/documentation/corespotlight/cssearchableindex/endbatch(withclientstate:completionhandler:)) methods allow you to batch update the index, ensuring efficient and effective content indexing.

```swift
searchableIndex.beginBatch()
searchableIndex.indexSearchableItems([item]) { error in
    if let error = error {
        print("Batch indexing error: \(error.localizedDescription)")
    } else {
        print("Batch indexing successful!")
    }
}
searchableIndex.endBatch(withClientState: nil, completionHandler: nil)
```

## Efficiency Tips

- **Expiration Date:** Set the [`expirationDate`](https://developer.apple.com/documentation/corespotlight/cssearchableitem/expirationdate) property to ensure that outdated content is automatically removed from the index.
- **Update Flag:** Use the [`isUpdate`](https://developer.apple.com/documentation/corespotlight/cssearchableitem/isupdate) property to indicate when an item is being updated, rather than newly added.

## CoreSpotlight Delegate

To handle interactions between the on-device index and your app, create a CoreSpotlight Delegate target. This delegate will manage indexing operations and ensure seamless integration. Testing and debugging can be done using the `mdutil` Terminal command.

## Conclusion

Implementing semantic search with CoreSpotlight can significantly enhance the user experience by providing more relevant and intuitive search results. By following the steps outlined above, you can effectively donate your app's content to Spotlight, leveraging the power of semantic search.