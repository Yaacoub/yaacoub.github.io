---
has_repo: true
image: "articles/swift-tip/blur-uiviewcontroller-background/hero.png"
layout: "article"
title: "Blur UIViewController background"
---

```swift
class ViewController1: UIViewController {

	/* … */

	private func presentVC2() {
		let viewController = ViewController2()
		viewController.modalPresentationStyle = .automatic
		present(viewController, animated: true)
	}

}

class ViewController2: UIViewController {

	/* … */

	override func viewDidLoad() {
		super.viewDidLoad()
		let blurEffect = UIBlurEffect(style: .regular)
		let blurEffectView = UIVisualEffectView(effect: blurEffect)
		view = blurEffectView
	}

}
```

## Why use this tip?

Blurring the background of a view controller can spice things up and make the app feel less dull. However, I advise you to use this effect moderately. The contrast between the blurred background and the controller's content shouldn't bother visually impaired people.
