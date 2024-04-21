---
author: "Peter Yaacoub"
has_repo: true
image: "articles/swift-tip/hello-swift-charts-wwdc-2022/hero.png"
layout: "article"
title: "Hello Swift Charts - WWDC 2022"
---

## Introduction

Swift Charts is Apple's newest Swift framework for building beautiful charts with declarative syntax. Read this article to find out how creating charts in your apps is now as easy as pie!

Swift Charts is built with accessibility in mind to describe charts for visually impaired users. Besides, you can effortlessly use them with animations, localization, and on all Apple platforms.

<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="youtube" frameborder="0" src="https://www.youtube-nocookie.com/embed/meswwcr1R0E" title="YouTube video player"></iframe>

## Bar Chart

```swift
import Charts
import SwiftUI

struct ChartView: View {

    private let data = [/* your data here */]

    var body: some View {
        Chart(data) { element in
            BarMark(
                x: .value("Name", element.name),
                y: .value("Points", element.points)
            )
        }
    }

}
```

![Bar chart](/-assets/images/articles/swift-tip/hello-swift-charts-wwdc-2022/bar-chart.png)

## Multi-Series Line Chart

```swift
import Charts
import SwiftUI

struct ChartView: View {

    private let serie1 = [/* your data here */]
    private let serie2 = [/* your data here */]

    var body: some View {
        Chart([serie1, serie2], id: \.self) { serie in
            ForEach(serie) { element in
                LineMark(
                    x: .value("Year", element.year),
                    y: .value("Points", element.points)
                )
                .foregroundStyle(by: .value("Name", element.name))
            }
        }
    }

}
```

![Multi-series line chart](/-assets/images/articles/swift-tip/hello-swift-charts-wwdc-2022/multi-series-line-chart.png)

## Other Charts

There are six types of marks that you can use individually or together to create complex charts:
- [AreaMark](https://developer.apple.com/documentation/charts/areamark)
- [LineMark](https://developer.apple.com/documentation/charts/linemark)
- [PointMark](https://developer.apple.com/documentation/charts/pointmark)
- [RectangleMark](https://developer.apple.com/documentation/charts/rectanglemark)
- [RuleMark](https://developer.apple.com/documentation/charts/rulemark)
- [BarMark](https://developer.apple.com/documentation/charts/barmark)

You can also customize their appearance with the `.foregroundStyle(by:)` and `.symbol(by:)` instance methods. Other methods also allow you to modify the symbol size and the line style.

![Other charts 1](/-assets/images/articles/swift-tip/hello-swift-charts-wwdc-2022/other-charts-1.png)

![Other charts 2](/-assets/images/articles/swift-tip/hello-swift-charts-wwdc-2022/other-charts-2.png)

## Conclusion

This article summarizes Apple's [WWDC22 session 10136: Hello Swift Charts](https://developer.apple.com/videos/play/wwdc2022/10136/), which I enjoyed watching. Apple engineers have done a great job by making it easy to express your ideas with charts!