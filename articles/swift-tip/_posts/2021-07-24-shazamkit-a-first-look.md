---
has_repo: true
image: "articles/swift-tip/shazamkit-a-first-look/hero.png"
layout: "article"
title: "ShazamKit: A first look"
---

To accompany your learning journey, I highly suggest that you take a look at the [WWDC21 session 10044: Explore ShazamKit](https://developer.apple.com/wwdc21/10044/), and [WWDC21 session 10045: Create Custom Audio Experiences with ShazamKit](https://developer.apple.com/wwdc21/10045/).

## Introduction

When implemented in your app, [ShazamKit](https://developer.apple.com/documentation/shazamkit/) can recognize audio from exact matches in the Shazam Music catalog. As soon as it identifies a song, it returns song to the app metadata like the title, artist, and album art. The app will, in turn, display it to the user.

You can also proceed with the audio matching with arbitrary audio from a custom catalog you create yourself. This custom catalog recognition performs on-device matching.

Unlike [Sound Analysis](https://developer.apple.com/documentation/soundanalysis/) which classifies and categorizes sounds like speech, humming, applause and laughter, ShazamKit only matches audio with a preexisting catalog and can somewhat manage the Shazam library.

## Use cases

You might ask yourself why you would implement this framework in a new or preexisting app.

One use case might be that you want to customize the app content based on the currently playing music. For instance, you can modify a social media app to show distinct image filters or different post recommendations depending on the playing song or artist.

Another use case can be more focused on education. Indeed, the app could sync with external audio lessons so that kids or students can always follow along, never behind or ahead in the app.

## Terminology

**Signature**: A lossy representation of the audio sent from the device to the server. To preserve customer privacy, the reconstruction of the original audio is impossible. Besides, the signature sent to the network also uses less data.

**Reference signature**: A signature constructed from the full audio of a tune and associated with metadata that references the original song.

**Query signature**: A signature compared against a reference signature. It stems from the part of the recorded audio that includes the song most often.

**Catalog**: A collection of signatures.

**Shazam Music catalog**: A collection of reference signatures comprising much of the music in the world. The catalog is hosted in the cloud, maintained, and regularly updated by Apple.

**Custom catalog**: A collection of signatures generated from arbitrary audio with custom associated metadata. It lives in the app and can be accessed offline.

## Recognising songs

Before accessing the Shazam Music catalog, you should enable the ShazamKit app service for the app identifier.
To do so, open the [identifiers list](https://developer.apple.com/account/resources/identifiers/list/) through your developer portal and choose your preexisting app identifier or create a new one. Then, click the App Services tab below the Description field, select ShazamKit, and save your changes.

Access to the Shazam Music catalog does not work on the simulator but only on a physical device running iOS 15 or later.

Now let's jump to code!

For simplicity and brevity, I will use the MVVM design pattern in SwiftUI. You can do the same with UIKit or AppKit and in other ways. I won't touch on the user interface in this article, but you can find a complete demo project linked at the end of the article for more details.

First, let's make a `SongMatch` model with all the needed properties. As you'll see later, you can get a lot more metadata, but the below properties are the ones that I'll focus on for now.

```swift
import Foundation

struct SongMatch {
	let appleMusicURL: URL?
	let artist: String?
	let artworkURL: URL?
	let title: String?
}
```

Having made the model, we can now focus on the view model. It conforms to the [`ObservableObject`](https://developer.apple.com/documentation/combine/observableobject/) protocol to allow the view presenting the interface to listen to changes from [`@Published`](https://developer.apple.com/documentation/combine/published/) properties. It's also a subclass of the [`NSObject`](https://developer.apple.com/documentation/objectivec/nsobject/) class to make it capable of conforming to delegates.

```swift
import ShazamKit

class ContentViewModel: NSObject, ObservableObject { }
```

The session object [`SHSession`](https://developer.apple.com/documentation/shazamkit/shsession/) is the focal point. It takes as input either an audio or a signature and communicates results via its [`delegate`](https://developer.apple.com/documentation/shazamkit/shsession/3747203-delegate/). I initialize it with the default initializer to create a session object for matching songs in the Shazam Music catalog.

Speaking of initialization, I override the view model's `init` method to set up the `delegate` property and get notified of any found matches later.

```swift
@Published private(set) var songMatch: SongMatch? = nil
private let session = SHSession()

override init() {
	super.init()
	session.delegate = self
}
```

Now, depending on the scenario, you have one of two options to get a match.

If you already have access to the complete audio, you should create a [`SHSignatureGenerator`](https://developer.apple.com/documentation/shazamkit/shsignaturegenerator/) and pass an instance of [`AVAudioPCMBuffer`](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer/) through its [`append(_:at:)`](https://developer.apple.com/documentation/shazamkit/shsignaturegenerator/3747218-append/) method. To stay within the authorized signature range by ShazamKit, you'll fill the PCM buffer with 3 to 12 seconds of audio.

Below's the method to get the buffer from an audio file and output format.

```swift
private func buffer(audioFile: AVAudioFile, outputFormat: AVAudioFormat) -> AVAudioPCMBuffer? {

	let frameCount = AVAudioFrameCount((1024 * 64) / (audioFile.processingFormat.streamDescription.pointee.mBytesPerFrame))
	let outputFrameCapacity = AVAudioFrameCount(12 * audioFile.fileFormat.sampleRate)

	guard let inputBuffer = AVAudioPCMBuffer(pcmFormat: audioFile.processingFormat, frameCapacity: frameCount),
	let outputBuffer = AVAudioPCMBuffer(pcmFormat: outputFormat, frameCapacity: outputFrameCapacity),
	let converter = AVAudioConverter(from: audioFile.processingFormat, to: outputFormat) else { return nil }

	while true {
		let status = converter.convert(to: outputBuffer, error: nil) { inNumPackets, outStatus in
			do {
				try audioFile.read(into: inputBuffer)
				outStatus.pointee = .haveData
				return inputBuffer
			} catch {
				if audioFile.framePosition >= audioFile.length {
					outStatus.pointee = .endOfStream
					return nil
				} else {
					outStatus.pointee = .noDataNow
					return nil
				}
			}
		}
		switch status {
		case .endOfStream, .error: return nil
		default: return outputBuffer
		}
	}

}
```

Working with audio buffers is no easy task. If you want to better understand the above code, you can refer to the Apple Developer article [Compressing and Decompressing Data with Input and Output Filters](https://developer.apple.com/documentation/accelerate/compressing_and_decompressing_data_with_input_and_output_filters/).

Afterward, you have to generate the signature and search for a match in the catalog using the [`signature()`](https://developer.apple.com/documentation/shazamkit/shsignaturegenerator/3747219-signature/) and [`match(_:)`](https://developer.apple.com/documentation/shazamkit/shsession/3747207-match/) instance methods on the signature generator and the session object respectively.
Here are the other methods in the view model to get the signature and search for a match.

```swift
private let audioFileURL = Bundle.main.url(forResource: "Audio", withExtension: "mp3")

private func signature() -> SHSignature? {

	// Create the buffer from the audio file.
	guard let audioFileURL = audioFileURL,
	let audioFile = try? AVAudioFile(forReading: audioFileURL),
	let audioFormat = AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 1),
	let buffer = buffer(audioFile: audioFile, outputFormat: audioFormat) else { return nil }

	// Initialise the generator and append the buffer to it.
	let signatureGenerator = SHSignatureGenerator()
	try? signatureGenerator.append(buffer, at: nil)

	// Return the generated signature.
	return signatureGenerator.signature()

}
```
```swift
@Published private(set) var isMatching = false

func startMatching() {

	// Verify if the signature is not nil,
	// and if the session is not already searching for a match.
	guard let signature = signature(), isMatching == false else { return }
	isMatching = true

	// Search for a match.
	session.match(signature)

}
```

However, if you are matching against a continuous stream of audio, from a microphone, for example, you should use the [`matchStreamingBuffer(_:at:)`](https://developer.apple.com/documentation/shazamkit/shsession/3747208-matchstreamingbuffer/) instance method optimized for that situation.

```swift
session.matchStreamingBuffer(buffer, at: nil)
```

I will not detail this specific method, but I'm sure others have already touched on it.
Nonetheless, whenever you use the microphone, stop recording as soon as you have the result needed to avoid consuming unnecessary resources or launching the microphone for longer than customers intend.

Both the `match(_:)` and `matchStreamingBuffer(_:at:)` call the delegate’s [`session(_:didFind:)`](https://developer.apple.com/documentation/shazamkit/shsessiondelegate/3747210-session/) instance method when a match is found.
In the case a match isn't found, they call the delegate's [`session(_:didNotFindMatchFor:error:)`](https://developer.apple.com/documentation/shazamkit/shsessiondelegate/3747211-session/) instance method instead.

```swift
extension ContentViewModel: SHSessionDelegate {
 
	func session(_ session: SHSession, didFind match: SHMatch) {

		// Get the matched media item if it exists.
		guard let matchedMediaItem = match.mediaItems.first else { return }

		// Set isMatching to false,
		// and set the songMatch property with the matched media's metadata.
		DispatchQueue.main.async { [weak self] in
 			self?.isMatching = false
			self?.songMatch = SongMatch(appleMusicURL: matchedMediaItem.appleMusicURL,
										artist: matchedMediaItem.artist,
										artworkURL: matchedMediaItem.artworkURL,
										title: matchedMediaItem.title)

		}
	}

}
```

The `matchedMediaItem` is of type [`SHMatchedMediaItem`](https://developer.apple.com/documentation/shazamkit/shmatchedmediaitem/), a subclass of [`SHMediaItem`](https://developer.apple.com/documentation/shazamkit/shmediaitem/).

The latter type provides properties to get general metadata such as the title, artist, artwork, and genres. More properties are also available, specific to Apple Music and the Shazam Music catalog.

In addition, the former type provides more properties such as whereabouts in the audio the match occurred via the [`matchOffset`](https://developer.apple.com/documentation/shazamkit/shmatchedmediaitem/3747163-matchoffset/) instance property and any difference in frequency between the matched and original audio via the [`frequencySkew`](https://developer.apple.com/documentation/shazamkit/shmatchedmediaitem/3747162-frequencyskew) property.

When the song matched is available in Apple Music, and its details are displayed, you need to give attribution as mentioned in the [Apple Music Identity Guidelines](https://www.apple.com/itunes/marketing-on-music/identity-guidelines.html). You can add a button that launches the Apple Music URL returned by the media item through the [`appleMusicURL`](https://developer.apple.com/documentation/shazamkit/shmediaitem/3747171-applemusicurl/) instance property.

Finally, you may also allow the customer to save the matched audio to their Shazam library, if it has a valid [`shazamID`](https://developer.apple.com/documentation/shazamkit/shmediaitem/3747180-shazamid/).

The library is accessible from the Shazam app or Control Center and syncs across all devices. It attributes every song to the app that added it.

```swift
SHMediaLibrary.default.add([matchedMediaItem]) { error in 
	guard error != nil else { return }
	// Error handling here.
}
```

Here, I call the code in the `session(_:didFind:)` delegate method.

The [`SHMediaLibrary`](https://developer.apple.com/documentation/shazamkit/shmedialibrary/) offers a [`default`](https://developer.apple.com/documentation/shazamkit/shmedialibrary/3747200-default/) instance that corresponds to the user's Shazam library.

Make the user aware of the song's addition to the library. They should be able to opt in or out.

## Conclusion

We discovered what ShazamKit is and why it would be a good idea to implement it in your app. We also learned some new terminology before looking into the code to match audio with songs in the Shazam Music catalog.

![A diagram that briefly resumes the article.](/-assets/images/articles/{{ page.categories | last }}/{{ page.title | slugify }}/diagram.svg)