---
author: "Peter Yaacoub"
layout: "article"
title: "Create a custom data store with SwiftData - WWDC24"
---

## Introduction

These are some notes I took while watching the WWDC24 session: Create a Custom Data Store with SwiftData.

Starting with iOS 18 and all new equivalent Apple platforms, the [`DataStore`](https://developer.apple.com/documentation/swiftdata/datastore) protocol powers data stores, interfaces that enable SwiftData to read and write model data without knowledge of the underlying storage mechanism.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/_t2NflA8AcI?si=duLT7Z9vDP_iWtCQ" title="YouTube video player"></iframe>

## Architecture

The symbiosis between [SwiftUI](https://developer.apple.com/documentation/swiftui/) and [SwiftData](https://developer.apple.com/documentation/swiftdata) is very strong, and together, they form an architecture that is not hard to grasp: the view talks to the model, and the model talks to the store.

- **View**: Maintained and updated by SwiftUI.
- **Model**: Acts as the context, a temporary storage that tracks changes and updates the states.
- **Store**: Serves as the container, a permanent storage location. These last two are maintained and updated by SwiftData.

The communication between the context and the container is straightforward. The context sends [`DataStoreSaveChangesRequest`](https://developer.apple.com/documentation/swiftdata/datastoresavechangesrequest) and [`DataStoreFetchRequest`](https://developer.apple.com/documentation/swiftdata/datastorefetchrequest) instances to the container, which in turn returns [`DataStoreSaveChangesResult`](https://developer.apple.com/documentation/swiftdata/datastoresavechangesresult) and [`DataStoreFetchResult`](https://developer.apple.com/documentation/swiftdata/datastorefetchresult) instances.

## Custom Data Stores

With the new `DataStore` protocol comes the ability to create custom data stores that work with any persistence backend, such as documents, databases, or cloud storage.

For the best performance, the store should not be archival, meaning that the read and write functions should not load the entire file each time the model calls them. With potentially hundreds of thousands of lines in one file, this approach would inevitably result in a laggy or slow user experience.

For the custom implementation, you create instances conforming to the following protocols. The end result allows you to simply replace the `ModelConfiguration` instance with your custom implementation, such as `JSONModelConfiguration`.

| Custom Implementation    | Default Implementation   |
|--------------------------|--------------------------|
| `DataStoreConfiguration` | `ModelConfiguration`     |
| `DataStoreSnapshot`      | `DefaultSnapshot`        |
| `DataStore`              | `DefaultStore`           |

For a full example of how to create a custom data store, the WWDC session video and code snippets are very helpful.

## Conclusion

In addition to simplicity, SwiftData now provides even more customization, enticing a greater number of people to switch to it. From the already powerful `ModelConfiguration` to a brand-new custom [`DataStoreConfiguration`](https://developer.apple.com/documentation/swiftdata/datastoreconfiguration), switching between the two cannot be easier, promising a bright future for the one-year-old Apple framework.