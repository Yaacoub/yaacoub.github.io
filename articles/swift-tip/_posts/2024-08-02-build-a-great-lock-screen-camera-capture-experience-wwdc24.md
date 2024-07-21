---
author: "Peter Yaacoub"
layout: "article"
title: "Build a great Lock Screen camera capture experience - WWDC24"
---

## Introduction

A capture extension enhances the user experience by providing quick access to the camera through various interfaces such as the Control Center, the Action Button, and the Lock Screen. This article delves into creating a capture extension using the LockedCameraCapture framework and the best practices for a seamless capture experience, based on insights from the WWDC24 session.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube.com/embed/l1beJxAYli0?si=90PQo75mTRi22p2R" title="YouTube video player"></iframe>

## Tools

### Key Components

- **[`LockedCameraCapture`](https://developer.apple.com/documentation/lockedcameracapture) Framework**: Facilitates the capture process.
- **Locked Camera Capture Extension**: Implements the capture functionality.

## Experience

Creating a smooth capture experience involves several key elements.

### Quick and Easy Access

- **Launch Directly to Viewfinder**: Ensure the capture extension opens the camera viewfinder immediately.

### Hardware Button Integration

- **[`AVCaptureEventInteraction`](https://developer.apple.com/documentation/avkit/avcaptureeventinteraction)**: Utilize hardware buttons for capturing photos or videos.

### Privacy Considerations

- **[`PhotoKit`](https://developer.apple.com/documentation/photokit)**: Use PhotoKit to interact with the user’s photo library.
- **Content URL**: Utilize the capture session’s content URL to handle captured content within your app.

```swift
import PhotoKit

func saveCapturedContent(contentURL: URL) {
    PHPhotoLibrary.shared().performChanges {
        PHAssetChangeRequest.creationRequestForAssetFromImage(atFileURL: contentURL)
    } completionHandler: { success, error in
        if success {
            print("Content saved to photo library.")
        } else if let error = error {
            print("Error saving content: \(error)")
        }
    }
}
```

### Transition to App

- **[`openApplication(for:)`](https://developer.apple.com/documentation/lockedcameracapture/lockedcameracapturesession/openapplication(for:))**: Transition from the capture extension to the main app for further actions.
- **[`LockedCameraCaptureManager`](https://developer.apple.com/documentation/lockedcameracapture/lockedcameracapturemanager)**: Manage the capture session effectively.

### Integration with App

- **[`CameraCaptureIntent`](https://developer.apple.com/documentation/appintents/cameracaptureintent)**: Implement this intent across your widget extension, capture extension, and app to handle direct launches.

## Restrictions

### Communication Limitations

The use of app contexts and session content URLs is no coincidence. In fact, they are the only way that your extension can communicate with the app since it does not have access to shared preferences or group containers. Besides, your extension does not have access to the devices network, so anything beyond offline interactions would require full access to the app.

### Privacy Usage Description

Ensure your app’s Info.plist file includes a privacy usage description for camera access.

```xml
<key>NSCameraUsageDescription</key>
<string>This app requires access to the camera to capture photos and videos.</string>
```

## Conclusion

Creating a capture extension involves leveraging the LockedCameraCapture framework, ensuring quick and easy access to the camera, respecting user privacy, and managing transitions between the extension and the app. By following these guidelines, you can develop a seamless and efficient capture experience for your users.