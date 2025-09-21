---
author: "Peter Yaacoub"
has_repo: true
image: "articles/swift/animate-uicollectionviewcell-highlight/hero.webp"
layout: "article"
title: "Animate UICollectionViewCell highlight"
---

```swift
class CollectionViewController: UICollectionViewController {

	/* … */

	override func viewDidLoad() {
		super.viewDidLoad()
		collectionView.delaysContentTouches = false
	}
	
	override func collectionView(_ collectionView: UICollectionView, didHighlightItemAt indexPath: IndexPath) {
		let cell = collectionView.cellForItem(at: indexPath)
		UIView.animate(withDuration: 0.5, delay: 0, options: .beginFromCurrentState, animations: {
			cell?.transform = CGAffineTransform(scaleX: 0.90, y: 0.90)
		})
	}
	
	override func collectionView(_ collectionView: UICollectionView, didUnhighlightItemAt indexPath: IndexPath) {
		let cell = collectionView.cellForItem(at: indexPath)
		UIView.animate(withDuration: 0.5, delay: 0, options: .beginFromCurrentState, animations: {
			cell?.transform = .identity
		})
	}

}
```

## Why use this tip?

Animating the highlight and unhighlight of a collection view cell can provide great feedback for your users on whether they are selecting it or not. As long as you don't overdo the animations, they can make the app and user experience feel more polished.
