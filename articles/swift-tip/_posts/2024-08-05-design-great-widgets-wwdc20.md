---
author: "Peter Yaacoub"
layout: "article"
title: "Design Great Widgets - WWDC20"
---

## Introduction

Widgets are an essential way to surface your app's most important content directly on the user's home screen. This article will guide you through designing effective and engaging widgets based on insights from the [WWDC20 session](https://developer.apple.com/videos/play/wwdc2020/10103/).

## Content

Widgets should present your app’s most critical content in a clear, concise manner. Ideally, a widget should encompass personal, informational, and contextual content to maximize its utility.

## Design

There are three standard widget sizes: small, medium, and large. Each size should be thoughtfully designed to suit its purpose and provide a consistent user experience.

### Small Widgets

Small widgets have a single tap target and can display up to four pieces of information.

### Medium Widgets

Medium widgets can utilize a cell-style layout, providing more room for detailed content.

### Large Widgets

Large widgets can feature a content-style layout, ideal for rich, comprehensive information. Avoid merely scaling up the small widget design; tailor the content for each size.

## Guidelines

### Consistent Patterns

Most widgets follow a similar pattern. Adhering to these common design principles ensures a cohesive look and feel across different widgets.

### Margins and Layout

Use 16pt margins or 11pt for more condensed content. Ensure concentric corners for shapes near the widget’s edge.

### Fonts

- Use primarily SF Pro and its variants to ensure readability and consistency.
- Ensure widgets look good in both light and dark modes.
- Redact placeholder content to give users an idea of what the widget will display.

### App Names and Icons

Avoid including app names or icons within the widget itself. Add a logo in the top right corner only if the app is a content aggregator.

### Communication

Prioritize graphical communication over textual information. Avoid using phrases like “last updated” or “last checked” to keep the content concise and relevant.

## Conclusion

Creating great widgets involves careful consideration of content, design, and guidelines. By following these best practices, you can develop widgets that are not only visually appealing but also provide significant value to your users.