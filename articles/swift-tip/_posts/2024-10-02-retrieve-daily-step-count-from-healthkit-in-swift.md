---
author: "Peter Yaacoub"
layout: "article"
title: "Retrieve Daily Step Count from HealthKit in Swift"
---

## Introduction

In the world of health and fitness apps, accessing users' health data is crucial for providing valuable insights and tracking progress. This article demonstrates how to retrieve a user's daily step count from HealthKit using Swift. We'll walk through the necessary setup, permissions, and code implementation, using an extract from my app Catzumi as our example.

## Capabilities and Entitlements

To begin working with HealthKit, you need to enable the necessary capabilities and entitlements in your Xcode project:
1. Open your project file and select your target.
2. Navigate to the "Signing & Capabilities" tab.
3. Click the "+ Capability" button and add "HealthKit".

Alternatively, you can add the `com.apple.developer.healthkit` entitlement to your project's entitlements file and set its value to YES. Both methods achieve the same result.

## Info.plist Configuration

Next, you need to provide a usage description for accessing HealthKit data. Add the following key to your project's Info.plist file or target's Info properties: `NSHealthShareUsageDescription` (Privacy - Health Share Usage Description), and set its value to an appropriate description like:

> This app requires access to your step count to work.

## Code Implementation

Here's the Swift code to retrieve the daily step count from HealthKit:

```swift

import HealthKit
import SwiftUI

struct ContentView: View {
    
    
    
    // MARK: - Properties
    
    @State private var steps = 0
    
    
    
    // MARK: - Body
    
    var body: some View {
        Text("You walked \(steps) steps today!")
            .task {
                await requestHealthAuthorization()
                await calculateSteps()
            }
    }
    
    
    
    // MARK: - Methods (Private)
    
    func requestHealthAuthorization() async {

        guard HKHealthStore.isHealthDataAvailable() else { return }

        // Request authorization to read the user's step count from HealthKit
        try? await HKHealthStore().requestAuthorization(toShare: [], read: [HKQuantityType(.stepCount)])

    }
    
    private func calculateSteps() async {
        
        // To get the day's steps, start from midnight and end now
        let dateEnd = Date.now
        let dateStart = Calendar.current.startOfDay(for: .now)

        // To get daily steps data
        let dayComponent = DateComponents(day: 1)

        let predicate = HKQuery.predicateForSamples(withStart: dateStart, end: dateEnd, options: .strictStartDate)
        let samplePredicate = HKSamplePredicate.quantitySample(type: HKQuantityType(.stepCount), predicate: predicate)
        
        let descriptor = HKStatisticsCollectionQueryDescriptor(
            predicate: samplePredicate, options: .cumulativeSum, anchorDate: dateStart, intervalComponents: dayComponent
        )
        
        let result = try? await descriptor.result(for: HKHealthStore())
        
        // From the daily steps data, get today's step count samples
        result?.enumerateStatistics(from: dateStart, to: dateEnd) { statistics, stop in
            // Sum up all step samples for the day
            let steps = Int(statistics.sumQuantity()?.doubleValue(for: .count()) ?? 0)
            DispatchQueue.main.async {
                self.steps = steps
            }
        }
        
    }
    
}

```

## Conclusion

Integrating HealthKit into your Swift app allows you to access valuable health and fitness data, such as daily step counts. By following this guide, you've learned how to set up the necessary permissions, configure your project, and implement the code to retrieve step data. This knowledge can be extended to access other types of health information, enabling you to create more comprehensive and insightful fitness applications.

Remember to always respect user privacy and clearly communicate how their health data will be used within your app. With these tools at your disposal, you're well-equipped to develop innovative health and fitness solutions that can make a real difference in users' lives.

If you want to support me, you can check out Catzumi on the App Store.