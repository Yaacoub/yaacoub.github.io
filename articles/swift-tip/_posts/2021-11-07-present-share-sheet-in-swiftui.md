---
has_repo: true
image: "articles/swift-tip/present-share-sheet-in-swiftui/hero.png"
layout: "article"
title: "Present share sheet in SwiftUI"
---

```swift
import SwiftUI

extension UIApplication {
	
	static let keyWindow = keyWindowScene?.windows.filter(\.isKeyWindow).first
	static let keyWindowScene = shared.connectedScenes.first { $0.activationState == .foregroundActive } as? UIWindowScene
	
}

extension View {
	
	func shareSheet(isPresented: Binding<Bool>, items: [Any]) -> some View {
		guard isPresented.wrappedValue else { return self }
		let activityViewController = UIActivityViewController(activityItems: items, applicationActivities: nil)
		let presentedViewController = UIApplication.keyWindow?.rootViewController?.presentedViewController ?? UIApplication.keyWindow?.rootViewController
		activityViewController.completionWithItemsHandler = { _, _, _, _ in isPresented.wrappedValue = false }
		presentedViewController?.present(activityViewController, animated: true)
		return self
	}
	
}

struct ContentView: View {
	
  @State private var isPresentingShareSheet = false
	
	var body: some View {
		Button("Present Share Sheet") { isPresentingShareSheet = true }
			.shareSheet(isPresented: $isPresentingShareSheet, items: ["Share me!"])
  }
	
}
```

## Why use this tip?

Most people like sharing what they do with others, so the share sheet is an essential part of modern applications. While satisfying the user's needs, it can also boost app exposure, creating a win-win situation for the developer and his user base. Besides, the system's built-in activity view controller is often a better and more homogenous overall user experience.
