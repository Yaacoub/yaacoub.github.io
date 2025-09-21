---
author: "Peter Yaacoub"
has_repo: true
image: "articles/swift-tip/present-mfmailcomposeviewcontroller/hero.webp"
layout: "article"
title: "Present MFMailComposeViewController"
---

```swift
class ViewController: UIViewController {

	/* … */

	private func presentMailComposer() {
		guard MFMailComposeViewController.canSendMail() else { return }
		let composer = MFMailComposeViewController()
		composer.mailComposeDelegate = self
		composer.setMessageBody("Hello!", isHTML: false)
		composer.setSubject("Hello!")
		composer.setToRecipients(["address@example.com"])
		present(composer, animated: true)
	}

}

extension ViewController: MFMailComposeViewControllerDelegate {
	
	func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
		controller.dismiss(animated: true)
	}
	
}
```

## Why use this tip?

Providing an option for users to send you an email can make it easier for you to receive user feedback, praise, and criticism. Besides, exchanging messages between the developer and the user can create mutual respect. The developer can learn what the users need, and the users can learn to appreciate the developer's hard work.
