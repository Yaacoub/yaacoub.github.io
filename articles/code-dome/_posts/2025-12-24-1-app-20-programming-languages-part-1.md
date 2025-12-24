---
author: "Peter Yaacoub"
has_repo: true
layout: "article"
title: "1 App, 20 Programming Languages (Part 1)"
---

## Introduction

Similar to my previous article ([One SwiftUI App, Six Architectures](https://yaacoub.github.io/articles/swift-tip/one-swiftui-app-six-architectures/)), this time I wanted to challenge myself in creating the same simple app in different programming languages.

To ensure this project is as fair as possible to all candidates and focuses solely on the code, rather than the result, I will turn to the console. Oh yes, that good old friend that rocked you or your parents at the dawn of the computer, just before any mainstream GUI ever hit homes and offices. Therefore, I won’t be using any UI frameworks and will try to resort to vanilla code only.

I’ll be skipping [markup](https://en.wikipedia.org/wiki/List_of_markup_languages) (e.g., HTML), [stylesheet](https://en.wikipedia.org/wiki/List_of_style_sheet_languages) (e.g., CSS), [query](https://en.wikipedia.org/wiki/Category:Query_languages) (e.g., SQL), and [esoteric](https://en.wikipedia.org/wiki/Esoteric_programming_language) languages (whatever this means). The following order of languages is from most to least popular, as given by Stack Overflow’s [2025 Developer Survey](https://survey.stackoverflow.co/2025/technology).

Okay, I think the introduction is long enough as it is, and I don’t want to waste any further time. So let’s get to make a calculator that handles simple arithmetic (+, -, *, /) with simple test cases. We’ll suppose that the user always writes valid operators and operands; why wouldn’t he? Remember, the focus of this article is not the final product, but the code. This is the polite way of saying that I couldn’t care less if the calculator wasn’t efficient or accurate, as long as it showcases each language’s core features. I do, however, implement and include unit tests in this article, although not extensively enough.

## JavaScript

JavaScript, or JS (not to be confused with [JScript](https://en.wikipedia.org/wiki/JScript)), is one of the three pillars of the web, and what a whopping [98.9%](https://w3techs.com/technologies/details/cp-javascript) of websites rely on, thanks to frameworks like React and Angular. If you’re not too familiar with the language (strange…), you might think that it is only useful for the web, and I think that you’re absolutely right. JavaScript cannot work without a host. Most often, this host is the browser DOM, but in our case, we’ll use Node.js. Don't be mistaken, JS, like many other languages, needs a host to run.

Fun fact! JavaScript is a: curly-bracket, embeddable, extension, impure functional, imperative, interactive-mode, interpreted, garbage-collected, application-macro, modular, multiparadigm, object-oriented, prototype-based, procedural, reflective query, scripting, and system language. Now that’s what I call an omnipotent language!

calculator.js:
```javascript
// IMPORTS
// =======

import { createInterface } from "readline";

// FUNCTIONS
// =========

function askQuestion() {
    const read = createInterface({ input: process.stdin, output: process.stdout });
    read.question("Your calculation: ", (calculation) => {
        const result = getResult(calculation);
        console.log(` = ${result}`);
        read.close();
    });
}

export function getResult(calculation) {
    calculation = sanitizeCalculation(calculation);
    let result = 0.0;
    
    for (const i of calculation.split("+")) {
        let subResult = 1.0;
        for (const j of i.split("*")) {
            if (j.startsWith("1/")) {
                let sanitizedJ = j.replace(/1\//g, "");
                if (parseFloat(sanitizedJ) === 0) return "Undefined";
                subResult /= parseFloat(sanitizedJ);
            } else {
                subResult *= parseFloat(j);
            }
        }
        result += subResult;
    }
    
    return `${result}`;
}

function sanitizeCalculation(calculation) {
    return calculation
        .replace(/\s+/g, "")                // Remove all spaces
        .replace(/\++/g, "+")               // ++ -> +
        .replace(/-+/g, "-")                // -- -> -
        .replace(/\*\+/g, "*")              // *+ -> *
        .replace(/\/\+/g, "/")              // /+ -> /
        .replace(/\+-/g, "-")               // +- -> -
        .replace(/(\d)-(\d)/g, "$1+-$2")    // a-b -> a+-b
        .replace(/\//g, "*1/");             // a/b -> a*1/b
}

// MAIN
// ====

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  askQuestion();
}
```

tests.js:
```javascript
// IMPORTS
// =======

import { getResult } from "./calculator.js";

// FUNCTIONS
// =========

function runTests() {
    console.log("Test 01: " + (getResult("2 + 3") === `${2 + 3}`));
    console.log("Test 02: " + (getResult("2 - 3") === `${2 - 3}`));
    console.log("Test 03: " + (getResult("2 * 3") === `${2 * 3}`));
    console.log("Test 04: " + (getResult("2 / 3") === `${2 / 3}`));
    console.log("Test 05: " + (getResult("2 / 0") === "Undefined"));
    console.log("Test 06: " + (getResult("  7 +   2 * 3 - 4 / -2 ") === `${  7 +   2 * 3 - 4 / -2 }`));
    console.log("Test 07: " + (getResult("  7 +   2 / 3 - 4 * +-2 ") === `${  7 +   2 / 3 - 4 * +-2 }`));
    console.log("Test 08: " + (getResult("2.0 + 3.0") === `${2.0 + 3.0}`));
}

// MAIN
// ====

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  runTests();
}
```

## Python

JavaScript and Python are what I would describe as old-newbies in the programming language scene. I say so because they are far from the first computer languages to ever be typed on a console, or even to be punched on cards. They are also not that old: both appeared in the late 80s and early 90s, a decade after the mythical C language and its precursor, [B](https://en.wikipedia.org/wiki/B_(programming_language)) (I kid you not).

Enough said about history. Although from the same generation, Python and JavaScript took different approaches. One small distinction is fewer implicit type coersion. Indeed, Python revealed itself to be stricter with me. Another particularly interesting aspect of Python is that the `float` type is actually a `double`, like double-precision. That makes it confusing to people coming from other programming languages that use both types distinctly.

calculator.py:
```python
# IMPORTS
# =======

import math
import re

# FUNCTIONS
# =========

def ask_question() -> None:
    calculation = input("Your calculation: ")
    result = get_result(calculation)
    print(f" = {result}")


def get_result(calculation: str) -> str:
    calculation = sanitize_calculation(calculation)
    result = 0.0
    
    for i in calculation.split("+"):
        sub_result = 1.0
        for j in i.split("*"):
            if j.startswith("1/"):
                sanitized_j = j.replace("1/", "")
                if float(sanitized_j) == 0:
                    return "Undefined"
                sub_result /= float(sanitized_j)
            else:
                sub_result *= float(j)
        result += sub_result

    if result.is_integer() and calculation.count("/") == 0 and calculation.count(".") == 0:
        return f"{int(result)}"
    return f"{result}"


def sanitize_calculation(calculation: str) -> str:
    sanitized = re.sub(r"\s+", "", calculation)             # Remove all spaces
    sanitized = re.sub(r"\++", "+", sanitized)              # ++ -> +
    sanitized = re.sub(r"-+", "-", sanitized)               # -- -> -
    sanitized = re.sub(r"\*\+", "*", sanitized)             # *+ -> *
    sanitized = re.sub(r"/\+", "/", sanitized)              # /+ -> /
    sanitized = re.sub(r"\+-", "-", sanitized)              # +- -> -
    sanitized = re.sub(r"(\d)-(\d)", r"\1+-\2", sanitized)  # a-b -> a+-b
    sanitized = re.sub(r"/", "*1/", sanitized)              # a/b -> a*1/b
    return sanitized

# MAIN
# ====

if __name__ == "__main__":
    ask_question()
```

tests.py:
```python
# IMPORTS
# =======

from calculator import get_result

# FUNCTIONS
# =========

def run_tests() -> None:
    print("Test 01: " + str(get_result("2 + 3") == f"{2 + 3}"))
    print("Test 02: " + str(get_result("2 - 3") == f"{2 - 3}"))
    print("Test 03: " + str(get_result("2 * 3") == f"{2 * 3}"))
    print("Test 04: " + str(get_result("2 / 3") == f"{2 / 3}"))
    print("Test 05: " + str(get_result("2 / 0") == "Undefined"))
    print("Test 06: " + str(get_result("  7 +   2 * 3 - 4 / -2 ") == f"{  7 +   2 * 3 - 4 / -2 }"))
    print("Test 07: " + str(get_result("  7 +   2 / 3 - 4 * +-2 ") == f"{  7 +   2 / 3 - 4 * +-2 }"))
    print("Test 08: " + str(get_result("2.0 + 3.0") == f"{2.0 + 3.0}"))

# MAIN
# ====

if __name__ == "__main__":
    run_tests()
```

## Bash/Shell

What’s the difference between Shell and Bash? Well, I know that Bash stands for Bourne Again SHell, but that doesn’t help. So I tried looking up the difference directly on my macOS terminal:

```sh
% sh --version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin25)
Copyright (C) 2007 Free Software Foundation, Inc.
```

```bash
% bash --version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin25)
Copyright (C) 2007 Free Software Foundation, Inc.
```

Here again, both are literally the same. That doesn’t help, but maybe it’s just that they’re genuinely the same. However, I persevered in my search for further clarification and found this [explanation](https://stackoverflow.com/a/5725402/8811661): `sh`'s a specification, `bash`'s an implementation. So, for a linguist, I guess this translates to: `sh`'s like Standard Arabic, and `bash`'s like the Lebanese/Levantine Dialect, amongst other [dialects](https://en.wikipedia.org/wiki/Varieties_of_Arabic). On my system, `sh` is therefore implemented as `bash`.

Although shell languages may seem old compared to typical programming languages, the Bash dialect was only published in 1989. Yet, like any Shell dialect, I find it painful to read and understand at a glance, especially due to the one-letter arguments and old methods of splitting text by setting a global variable, the IFS (Internal Field Separator).

On the bright side, shell languages use something called a Shebang (`#!/usr/bin/env bash`), and I love the name!

calculator.bash:
```bash
#!/usr/bin/env bash

# Enable strict mode for safer bash script execution
# set -e: Exit immediately if any command exits with a non-zero status
# set -u: Exit if an undefined variable is used
# set -o pipefail: Return the exit status of the last command in a pipeline that failed
set -euo pipefail

# FUNCTIONS
# =========

ask_question() {
    # -r : prevent backslash interpretation
    # -p : display the prompt text
	read -r -p "Your calculation: " calculation
	local result=$(get_result "$calculation")
	echo " = $result"
}

get_result() {
	local calculation=$(sanitize_calculation "$1")
	local result=0

	local IFS='+' # Internal Field Separator set to +
	for i in $calculation; do
		local sub_result=1
		local IFS='*' # Internal Field Separator set to *
		for j in $i; do
			if [[ $j == 1/* ]]; then
				local sanitized_j=${j#1/}
				if [[ $sanitized_j == 0 ]]; then
					echo "Undefined"
					return
				fi
				sub_result=$(echo "$sub_result/$sanitized_j" | bc -l)
			else
				sub_result=$(echo "$sub_result*$j" | bc -l)
			fi
		done
		result=$(echo "$result+$sub_result" | bc -l)
	done
    
	printf '%s\n' "$result"
}

sanitize_calculation() {
	local calculation="$1"
	calculation=$(printf '%s' "$calculation" | sed -E '
        s/[[:space:]]+//g;
        s/\++/+/g;
        s/-+/-/g;
        s/\*\+/*/g;
        s#/\+#/#g;
        s/\+-/-/g;
        s/([0-9])-([0-9])/\1+-\2/g;
        s#/#*1/#g
    ')
	printf '%s' "$calculation"
}

# MAIN
# ====

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
	ask_question
fi
```

tests.bash:
```bash
#!/usr/bin/env bash

# Enable strict mode for safer bash script execution
# set -e: Exit immediately if any command exits with a non-zero status
# set -u: Exit if an undefined variable is used
# set -o pipefail: Return the exit status of the last command in a pipeline that failed
set -euo pipefail

# IMPORTS
# =======

source ./calculator.bash

# FUNCTIONS
# =========

run_tests() {
	echo "Test 01: $( [[ $(get_result "2 + 3") == "$(printf "%s" "$(echo "2+3" | bc -l)")" ]] && echo true || echo false )"
	echo "Test 02: $( [[ $(get_result "2 - 3") == "$(printf "%s" "$(echo "2-3" | bc -l)")" ]] && echo true || echo false )"
	echo "Test 03: $( [[ $(get_result "2 * 3") == "$(printf "%s" "$(echo "2*3" | bc -l)")" ]] && echo true || echo false )"
	echo "Test 04: $( [[ $(get_result "2 / 3") == "$(printf "%s" "$(echo "2/3" | bc -l)")" ]] && echo true || echo false )"
	echo "Test 05: $( [[ $(get_result "2 / 0") == "Undefined" ]] && echo true || echo false )"
	echo "Test 06: $( [[ $(get_result "  7 +   2 * 3 - 4 / -2 ") == "$(printf "%s" "$(echo "  7 +   2 * 3 - 4 / -2 " | bc -l)")" ]] && echo true || echo false )"
	echo "Test 07: $( [[ $(get_result "  7 +   2 / 3 - 4 * +-2 ") == "$(printf "%s" "$(echo "  7 +   2 / 3 - 4 * -2 " | bc -l)")" ]] && echo true || echo false )"
	echo "Test 08: $( [[ $(get_result "2.0 + 3.0") == "$(printf "%s" "$(echo "2.0+3.0" | bc -l)")" ]] && echo true || echo false )"
}

# MAIN
# ====

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
	run_tests
fi
```

## TypeScript

TypeScript is a JS superset built with static types and safety in mind. Knowing that, I thought that I would have a nicer time writing and compiling the code, but I was surprisingly wrong. I stumbled on unclear errors that were due to the usage of CommonJS and ESM. These two are different JavaScript standards, with ESM being the newer, but not the default: why? Typescript is therefore the first language, and not the last, to necessitate a third file: tsconfig.json (though I think that it can be replaced by arguments in the `ts-node` command). I also had deprecation warnings that I couldn’t control, so I just shushed them.

calculator.ts:
```typescript
// IMPORTS
// =======

import { createInterface } from "readline";

// FUNCTIONS
// =========

function askQuestion(): void {
    const read = createInterface({ input: process.stdin, output: process.stdout });
    read.question("Your calculation: ", (calculation: string) => {
        const result = getResult(calculation);
        console.log(` = ${result}`);
        read.close();
    });
}

export function getResult(calculation: string): string {
    calculation = sanitizeCalculation(calculation);
    let result = 0.0;

    for (const i of calculation.split("+")) {
        let subResult = 1.0;
        for (const j of i.split("*")) {
            if (j.startsWith("1/")) {
                const sanitizedJ = j.replace(/1\//g, "");
                if (parseFloat(sanitizedJ) === 0) return "Undefined";
                subResult /= parseFloat(sanitizedJ);
            } else {
                subResult *= parseFloat(j);
            }
        }
        result += subResult;
    }

    return `${result}`;
}

function sanitizeCalculation(calculation: string): string {
    return calculation
        .replace(/\s+/g, "")                // Remove all spaces
        .replace(/\++/g, "+")               // ++ -> +
        .replace(/-+/g, "-")                // -- -> -
        .replace(/\*\+/g, "*")              // *+ -> *
        .replace(/\/\+/g, "/")              // /+ -> /
        .replace(/\+-/g, "-")               // +- -> -
        .replace(/(\d)-(\d)/g, "$1+-$2")    // a-b -> a+-b
        .replace(/\//g, "*1/");             // a/b -> a*1/b
}

// MAIN
// ====

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  askQuestion();
}
```

tests.ts:
```typescript
// IMPORTS
// =======

import { getResult } from "./calculator.ts";

// FUNCTIONS
// =========

function runTests() {
    console.log("Test 01: " + (getResult("2 + 3") === `${2 + 3}`));
    console.log("Test 02: " + (getResult("2 - 3") === `${2 - 3}`));
    console.log("Test 03: " + (getResult("2 * 3") === `${2 * 3}`));
    console.log("Test 04: " + (getResult("2 / 3") === `${2 / 3}`));
    console.log("Test 05: " + (getResult("2 / 0") === "Undefined"));
    console.log("Test 06: " + (getResult("  7 +   2 * 3 - 4 / -2 ") === `${  7 +   2 * 3 - 4 / -2 }`));
    console.log("Test 07: " + (getResult("  7 +   2 / 3 - 4 * +-2 ") === `${  7 +   2 / 3 - 4 * +-2 }`));
    console.log("Test 08: " + (getResult("2.0 + 3.0") === `${2.0 + 3.0}`));
}

// MAIN
// ====

if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  runTests();
}
```

tsconfig.json:
```json
{
  "ts-node": {
    "esm": true
  }
}
```

## Java

Java is surprisingly just a few months older than JavaScript.

I used to dislike using it because I had to install bulky software. Maybe it wasn’t that big of a deal, but that’s why I held C++ at a higher standard. However, the majority doesn’t seem to have the same opinion, so I’ll stop talking about my feelings. Before doing so, though, I’d like to clarify that my opinion has changed ever since I began using containerization.

Unlike the previous languages, Java is largely a pure object-oriented language. Essentially, most code is structured around classes. It also uses very similar code to JavaScript, even if "Java is to JavaScript as Car is to Carpet".

Calculator.java:
```java
// IMPORTS
// =======

import java.util.Scanner;

// CLASS
// =====

public class Calculator {

    // METHODS
    // =======
    
    public static void askQuestion() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Your calculation: ");
        String calculation = scanner.nextLine();
        String result = getResult(calculation);
        System.out.println(" = " + result);
        scanner.close();
    }

    public static String getResult(String calculation) {
        calculation = sanitizeCalculation(calculation);
        double result = 0.0;
        
        String[] addParts = calculation.split("\\+");
        for (String i : addParts) {
            double subResult = 1.0;
            String[] mulParts = i.split("\\*");
            for (String j : mulParts) {
                if (j.startsWith("1/")) {
                    String sanitizedJ = j.replaceAll("1/", "");
                    if (Double.parseDouble(sanitizedJ) == 0) return "Undefined";
                    subResult /= Double.parseDouble(sanitizedJ);
                } else {
                    subResult *= Double.parseDouble(j);
                }
            }
            result += subResult;
        }
        
        if (result == (int) result && !calculation.contains("/") && !calculation.contains(".")) {
            return String.valueOf((int) result);
        }
        return String.valueOf(result);
    }

    public static String sanitizeCalculation(String calculation) {
        return calculation
            .replaceAll("\\s+", "")              // Remove all spaces
            .replaceAll("\\++", "+")             // ++ -> +
            .replaceAll("-+", "-")               // -- -> -
            .replaceAll("\\*\\+", "*")           // *+ -> *
            .replaceAll("/\\+", "/")             // /+ -> /
            .replaceAll("\\+-", "-")             // +- -> -
            .replaceAll("(\\d)-(\\d)", "$1+-$2") // a-b -> a+-b
            .replaceAll("/", "*1/");             // a/b -> a*1/b
    }

    // MAIN
    // ====

    public static void main(String[] args) {
        askQuestion();
    }

}
```

Tests.java:
```java
// CLASS
// =====

public class CalculatorTest {

    // FUNCTIONS
    // =========
    
    public static void runTests() {
        System.out.println("Test 01: " + (Calculator.getResult("2 + 3").equals(String.valueOf(2 + 3))));
        System.out.println("Test 02: " + (Calculator.getResult("2 - 3").equals(String.valueOf(2 - 3))));
        System.out.println("Test 03: " + (Calculator.getResult("2 * 3").equals(String.valueOf(2 * 3))));
        System.out.println("Test 04: " + (Calculator.getResult("2 / 3").equals(String.valueOf(2.0 / 3.0))));
        System.out.println("Test 05: " + (Calculator.getResult("2 / 0").equals("Undefined")));
        System.out.println("Test 06: " + (Calculator.getResult("  7 +   2 * 3 - 4 / -2 ").equals(String.valueOf(7 + 2 * 3 - 4.0 / -2))));
        System.out.println("Test 07: " + (Calculator.getResult("  7 +   2 / 3 - 4 * +-2 ").equals(String.valueOf(7 + 2.0 / 3 - 4 * -2))));
        System.out.println("Test 08: " + (Calculator.getResult("2.0 + 3.0").equals(String.valueOf(2.0 + 3.0))));
    }

    // MAIN
    // ====

    public static void main(String[] args) {
        runTests();
    }

}
```

## C#

I believe that my only and earliest developer experiences were with C# on Unity and Visual Studio. I haven’t touched the language ever since.

One particularity that stands out to me is namespaces: containers that are used to organize classes and other related code. They're interesting, but I didn't find them useful for this example.

C# is also strict with classes, like Java. However, it does offer the possibility of top-level statements in one unique file. Behind the scenes, it still wraps the code in a class, though. I think C# has trust issues and needs counseling.

And like TypeScript, the setup was tedious, and I needed external files for my use case: Calculator.csproj and Tests.csproj.

Calculator.cs:
```csharp
// IMPORTS
// =======

using System;
using System.Text.RegularExpressions;

// CLASS
// =====

public class Calculator
{

    // FUNCTIONS
    // =========

    public static void AskQuestion()
    {
        Console.Write("Your calculation: ");
        string calculation = Console.ReadLine();
        string result = GetResult(calculation);
        Console.WriteLine(" = " + result);
    }

    public static string GetResult(string calculation)
    {
        calculation = SanitizeCalculation(calculation);
        double result = 0.0;
        
        foreach (string i in calculation.Split("+"))
        {
            double subResult = 1.0;
            foreach (string j in i.Split("*"))
            {
                if (j.StartsWith("1/"))
                {
                    string sanitizedJ = j.Replace("1/", "");
                    if (double.Parse(sanitizedJ) == 0) return "Undefined";
                    subResult /= double.Parse(sanitizedJ);
                }
                else
                {
                    subResult *= double.Parse(j);
                }
            }
            result += subResult;
        }
        
        return result.ToString();
    }

    static string SanitizeCalculation(string calculation)
    {
        string sanitized = Regex.Replace(calculation, @"\s+", "");
        sanitized = Regex.Replace(sanitized, @"\++", "+");
        sanitized = Regex.Replace(sanitized ,@"-+", "-");
        sanitized = Regex.Replace(sanitized, @"\*\+", "*");
        sanitized = Regex.Replace(sanitized, @"/\+", "/");
        sanitized = Regex.Replace(sanitized, @"\+-", "-");
        sanitized = Regex.Replace(sanitized, @"(\d)-(\d)", "$1+-$2");
        sanitized = Regex.Replace(sanitized, @"/", "*1/");
        return sanitized;
    }

    // MAIN
    // ====

    static void Main(string[] args)
    {
        Calculator.AskQuestion();
    }

}
```

Tests.cs:
```csharp
// IMPORTS
// =======

using System;

// CLASS
// =====

public class Tests
{

    // FUNCTIONS
    // =========

    static void RunTests()
    {
        Console.WriteLine("Test 01: " + (Calculator.GetResult("2 + 3") == (2 + 3).ToString()));
        Console.WriteLine("Test 02: " + (Calculator.GetResult("2 - 3") == (2 - 3).ToString()));
        Console.WriteLine("Test 03: " + (Calculator.GetResult("2 * 3") == (2 * 3).ToString()));
        Console.WriteLine("Test 04: " + (Calculator.GetResult("2 / 3") == (2.0 / 3.0).ToString()));
        Console.WriteLine("Test 05: " + (Calculator.GetResult("2 / 0") == "Undefined"));
        Console.WriteLine("Test 06: " + (Calculator.GetResult("  7 +   2 * 3 - 4 / -2 ") == (7 + 2 * 3 - 4.0 / -2).ToString()));
        Console.WriteLine("Test 07: " + (Calculator.GetResult("  7 +   2 / 3 - 4 * +-2 ") == (7 + 2.0 / 3 - 4 * -2).ToString()));
        Console.WriteLine("Test 08: " + (Calculator.GetResult("2.0 + 3.0") == (2.0 + 3.0).ToString()));
    }

    // MAIN
    // ====

    static void Main(string[] args)
    {
        RunTests();
    }

}
```

Calculator.csproj:
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <StartupObject>Calculator</StartupObject>
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
  </PropertyGroup>

  <ItemGroup>
    <Compile Include="Calculator.cs" />
  </ItemGroup>

</Project>
```

Tests.csproj:
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <StartupObject>Tests</StartupObject>
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
  </PropertyGroup>

  <ItemGroup>
    <Compile Include="Calculator.cs" />
    <Compile Include="Tests.cs" />
  </ItemGroup>

</Project>
```

## C++

In my mind, after binary, it goes like Assembly → C → C++, the holy trinity.

I didn’t go into this part with excitement, but I was miles away from being right. C++ was… easy. It has some simple yet powerful features that are still very useful, like the `ifdef`/`ifndef` macros. With great power comes great responsibility. Maybe I could’ve used them to simplify my C# code, but it’s too late; I already wasted my time.

I found that the code looks and works surprisingly similarly to Java. I copied and pasted a part from the latter to the former, made some minor syntax changes, and it worked like magic when I wasn’t expecting it.

calculator.cpp:
```cpp
// IMPORTS
// =======

#include <iostream>
#include <regex>
#include <sstream>
using namespace std;

// FUNCTIONS
// =========

string sanitizeCalculation(const string& calculation);
string getResult(const string& calculation);

void askQuestion() {
    string calculation;
    cout << "Your calculation: ";
    getline(cin, calculation);
    string result = getResult(calculation);
    cout << " = " << result << endl;
}

string getResult(const string& calculation) {
    string sanitized = sanitizeCalculation(calculation);
    double result = 0.0;
    
    stringstream ss(sanitized);
    string i;
    while (getline(ss, i, '+')) {
        double subResult = 1.0;
        stringstream ss2(i);
        string j;
        while (getline(ss2, j, '*')) {
            if (j.find("1/") == 0) {
                string sanitizedJ = j.substr(2);
                double divisor = stod(sanitizedJ);
                if (divisor == 0) return "Undefined";
                subResult /= divisor;
            } else if (!j.empty()) {
                subResult *= stod(j);
            }
        }
        result += subResult;
    }
    
    if (result == (int) result && !calculation.contains(".")) {
        return to_string((int) result);
    }
    return to_string(result);
}

string sanitizeCalculation(const string& calculation) {
    string result = calculation;
    result = regex_replace(result, regex("\\s+"), "");                // Remove all spaces
    result = regex_replace(result, regex("\\++"), "+");               // ++ -> +
    result = regex_replace(result, regex("-+"), "-");                 // -- -> -
    result = regex_replace(result, regex("\\*\\+"), "*");             // *+ -> *
    result = regex_replace(result, regex("/\\+"), "/");               // /+ -> /
    result = regex_replace(result, regex("\\+-"), "-");               // +- -> -
    result = regex_replace(result, regex("(\\d)-(\\d)"), "$1+-$2");   // a-b -> a+-b
    result = regex_replace(result, regex("/"), "*1/");                // a/b -> a*1/b
    return result;
}

// MAIN
// ====

#ifndef NO_MAIN
int main() {
    askQuestion();
    return 0;
}
#endif
```

tests.cpp:
```cpp
// IMPORTS
// =======

#include <iostream>
#include <string>
using namespace std;

// FUNCTIONS
// =========

string getResult(const string& calculation);

void runTests() {
    cout << "Test 01: " << (getResult("2 + 3") == to_string(2 + 3)) << endl;
    cout << "Test 02: " << (getResult("2 - 3") == to_string(2 - 3)) << endl;
    cout << "Test 03: " << (getResult("2 * 3") == to_string(2 * 3)) << endl;
    cout << "Test 04: " << (getResult("2 / 3") == to_string(2.0 / 3)) << endl;
    cout << "Test 05: " << (getResult("2 / 0") == "Undefined") << endl;
    cout << "Test 06: " << (getResult("  7 +   2 * 3 - 4 / -2 ") == to_string(  7 +   2 * 3 - 4 / -2 )) << endl;
    cout << "Test 07: " << (getResult("  7 +   2 / 3 - 4 * +-2 ") == to_string(7 + 2.0 / 3 - 4 * -2)) << endl;
    cout << "Test 08: " << (getResult("2.0 + 3.0") == to_string(2.0 + 3.0)) << endl;
}

// MAIN
// ====

int main() {
    runTests();
    return 0;
}
```

## PowerShell

The first language here to not require imports! Truthefully, this is not necessarily a good thing, but it’s definitely something to underline. Another interesting point to mention is that, unlike Bash and other shell dialects, this one doesn’t look so much like one.

It’s funny how Read-Host automatically adds the two dots after the input question. I genuinely feel stripped of my right to free speech.

calculator.ps1:
```powershell
# FUNCTIONS
# =========

function Ask-Question {
    $calculation = Read-Host "Your calculation"
    $result = Get-Result $calculation
    Write-Host " = $result"
}

function Get-Result {
    param([string]$calculation)
    
    $calculation = Sanitize-Calculation $calculation
    $result = 0.0
    
    foreach ($i in ($calculation -split '\+')) {
        $subResult = 1.0
        foreach ($j in ($i -split '\*')) {
            if ($j.StartsWith("1/")) {
                $sanitizedJ = $j -replace "1/", ""
                if ([double]$sanitizedJ -eq 0) { return "Undefined" }
                $subResult /= [double]$sanitizedJ
            } elseif ($j) {
                $subResult *= [double]$j
            }
        }
        $result += $subResult
    }
    
    # .NET General format specifier with 15 significant digits
    return $result.ToString("G15")
}

function Sanitize-Calculation {
    param([string]$calculation)

    $result = $calculation
    $result = $result -replace '\s+', ""                # Remove all spaces
    $result = $result -replace '\++', "+"               # ++ -> +
    $result = $result -replace '-+', "-"                # -- -> -
    $result = $result -replace '\*\+', "*"              # *+ -> *
    $result = $result -replace '/\+', "/"               # /+ -> /
    $result = $result -replace '\+-', "-"               # +- -> -
    $result = $result -replace '(\d)-(\d)', '$1+-$2'    # a-b -> a+-b
    $result = $result -replace '/', "*1/"               # a/b -> a*1/b
    return $result
}

# MAIN
# ====

if ((Get-PSCallStack).Count -eq 1) {
    Ask-Question
}
```

tests.ps1:
```powershell
# IMPORTS
# =======

. ./calculator.ps1

# FUNCTIONS
# =========

function Run-Tests {
    Write-Host ("Test 01: " + ($(Get-Result "2 + 3") -eq "$(2 + 3)"))
    Write-Host ("Test 02: " + ($(Get-Result "2 - 3") -eq "$(2 - 3)"))
    Write-Host ("Test 03: " + ($(Get-Result "2 * 3") -eq "$(2 * 3)"))
    Write-Host ("Test 04: " + ($(Get-Result "2 / 3") -eq "$(2 / 3)"))
    Write-Host ("Test 05: " + ($(Get-Result "2 / 0") -eq "Undefined"))
    Write-Host ("Test 06: " + ($(Get-Result "  7 +   2 * 3 - 4 / -2 ") -eq "$(  7 +   2 * 3 - 4 / -2 )"))
    Write-Host ("Test 07: " + ($(Get-Result "  7 +   2 / 3 - 4 * +-2 ") -eq "$(  7 +   2 / 3 - 4 * -2 )"))
    Write-Host ("Test 08: " + ($(Get-Result "2.0 + 3.0") -eq "$(2.0 + 3.0)"))
}

# MAIN
# ====

if ((Get-PSCallStack).Count -eq 1) {
    Run-Tests
}
```

## C

Coding in C++ was like a very pleasant ride in a Rolls-Royce Phantom III. Coding in C is like that same car on the country’s bumpiest road. Oh, and the car has no tires.

Reading C code is a pain. Writing it too. I did use some AI for other languages, but, for this one, I had to go all out and trust it with my soul. Not that I had any soul left after witnessing this eye-soaring code. Thankfully, I’m not doing Assembly any time soon, right? Right? (Spoiler: I am in part 2).

There’s also very strict float/int separation, and no implicit type casting. For instance, 2/3 is always 0, because what was an integer stays an integer. It’s the same for C++, so I had to adapt the tests accordingly.

calculator.c:
```c
// DEFINITIONS
// ===========

//  Expose the POSIX.1-2008 API set (for strtok_r)
#define _POSIX_C_SOURCE 200809L

// IMPORTS
// =======

#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// FUNCTIONS
// =========

static char *replace_all(const char *input, const char *pattern, const char *replacement);
static char *remove_spaces(const char *input);
static char *rewrite_digit_minus_digit(const char *input);
static char *sanitize_calculation(const char *calculation);
static char *format_double(double value);

static void ask_question(void);
char *get_result(const char *calculation);

static void ask_question(void) {
    char buffer[256];
    printf("Your calculation: ");
    if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        buffer[strcspn(buffer, "\n")] = '\0';
        char *result = get_result(buffer);
        printf(" = %s\n", result);
        free(result);
    }
}

char *get_result(const char *calculation) {
    char *sanitized = sanitize_calculation(calculation);
    if (!sanitized) return strdup("Undefined");

    double result = 0.0;
    char *save_i;
    for (char *i = strtok_r(sanitized, "+", &save_i); i; i = strtok_r(NULL, "+", &save_i)) {
        double sub_result = 1.0;
        char *save_j;
        for (char *j = strtok_r(i, "*", &save_j); j; j = strtok_r(NULL, "*", &save_j)) {
            if (strncmp(j, "1/", 2) == 0) {
                const char *sanitized_j = j + 2;
                double divisor = strtod(sanitized_j, NULL);
                if (divisor == 0.0) {
                    free(sanitized);
                    return strdup("Undefined");
                }
                sub_result /= divisor;
            } else if (j[0] != '\0') {
                sub_result *= strtod(j, NULL);
            }
        }
        result += sub_result;
    }

    free(sanitized);
    return format_double(result);
}

static char *sanitize_calculation(const char *calculation) {
    char *result = remove_spaces(calculation);
    if (!result) return NULL;

    char *tmp;

    tmp = replace_all(result, "++", "+");
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    tmp = replace_all(result, "-+", "-");
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    tmp = replace_all(result, "*+", "*");
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    tmp = replace_all(result, "/+", "/");
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    tmp = replace_all(result, "+-", "-");
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    tmp = rewrite_digit_minus_digit(result);
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    tmp = replace_all(result, "/", "*1/");
    free(result);
    if (!tmp) return NULL;
    result = tmp;

    return result;
}

static char *remove_spaces(const char *input) {
    size_t len = strlen(input);
    char *out = malloc(len + 1);
    if (!out) return NULL;

    size_t idx = 0;
    for (size_t i = 0; i < len; ++i) {
        if (!isspace((unsigned char)input[i])) {
            out[idx++] = input[i];
        }
    }
    out[idx] = '\0';
    return out;
}

static char *replace_all(const char *input, const char *pattern, const char *replacement) {
    size_t input_len = strlen(input);
    size_t pat_len = strlen(pattern);
    size_t rep_len = strlen(replacement);

    if (pat_len == 0) return strdup(input);

    size_t count = 0;
    const char *cursor = input;
    while ((cursor = strstr(cursor, pattern)) != NULL) {
        ++count;
        cursor += pat_len;
    }

    size_t new_len = input_len + count * (rep_len - pat_len);
    char *out = malloc(new_len + 1);
    if (!out) return NULL;

    const char *read_ptr = input;
    char *write_ptr = out;
    while ((cursor = strstr(read_ptr, pattern)) != NULL) {
        size_t segment_len = (size_t)(cursor - read_ptr);
        memcpy(write_ptr, read_ptr, segment_len);
        write_ptr += segment_len;
        memcpy(write_ptr, replacement, rep_len);
        write_ptr += rep_len;
        read_ptr = cursor + pat_len;
    }
    strcpy(write_ptr, read_ptr);

    return out;
}

static char *rewrite_digit_minus_digit(const char *input) {
    size_t len = strlen(input);
    char *out = malloc(len * 2 + 1);
    if (!out) return NULL;

    size_t idx = 0;
    for (size_t i = 0; i < len; ++i) {
        char c = input[i];
        if (c == '-' && i > 0 && i + 1 < len && isdigit((unsigned char)input[i - 1]) && isdigit((unsigned char)input[i + 1])) {
            out[idx++] = '+';
            out[idx++] = '-';
        } else {
            out[idx++] = c;
        }
    }
    out[idx] = '\0';
    return out;
}

static char *format_double(double value) {
    char buffer[64];
    snprintf(buffer, sizeof(buffer), "%.15g", value);
    return strdup(buffer);
}

// MAIN
// ====

#ifndef NO_MAIN
int main(void) {
    ask_question();
    return 0;
}
#endif
```

tests.c:
```c
// IMPORTS
// =======

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// FUNCTIONS
// =========

char *get_result(const char *calculation);
static char *format_double(double value);
static void run_tests(void);

static char *format_double(double value) {
    char buffer[64];
    snprintf(buffer, sizeof(buffer), "%.15g", value);
    return strdup(buffer);
}

static void run_tests(void) {
    char *expected;
    char *actual;

    expected = format_double(2 + 3);
    actual = get_result("2 + 3");
    printf("Test 01: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);

    expected = format_double(2 - 3);
    actual = get_result("2 - 3");
    printf("Test 02: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);

    expected = format_double(2 * 3);
    actual = get_result("2 * 3");
    printf("Test 03: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);

    expected = format_double(2.0 / 3);
    actual = get_result("2 / 3");
    printf("Test 04: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);

    actual = get_result("2 / 0");
    printf("Test 05: %d\n", strcmp(actual, "Undefined") == 0);
    free(actual);

    expected = format_double(  7 +   2 * 3 - 4 / -2 );
    actual = get_result("  7 +   2 * 3 - 4 / -2 ");
    printf("Test 06: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);

    expected = format_double(  7 +   2.0 / 3 - 4 * +-2 );
    actual = get_result("  7 +   2 / 3 - 4 * +-2 ");
    printf("Test 07: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);

    expected = format_double(2.0 + 3.0);
    actual = get_result("2.0 + 3.0");
    printf("Test 08: %d\n", strcmp(actual, expected) == 0);
    free(expected);
    free(actual);
}

// MAIN
// ====

int main(void) {
    run_tests();
    return 0;
}
```

## PHP

`<?php`, what a weird thing to put at the beginning of a file. That's the opening tag used to denote the beginning of PHP code. `?>` is the closing tag, but I didn't use it. All code outside these tags is typically regarded as HTML code in web servers.

I’m quite surprised that PHP is still as popular. In my mind, it was wrongfully like COBOL. I’m exaggerating, don’t take it too seriously. I could’ve compared it to even older: Fortran!

I like the function name for splitting a string: explode. Sounds a bit threatening though…

calculator.php:
```php
<?php

// FUNCTIONS
// =========

function askQuestion(): void {
    $calculation = readline("Your calculation: ");
    $result = getResult($calculation);
    echo " = $result\n";
}

function getResult(string $calculation): string {
    $calculation = sanitizeCalculation($calculation);
    $result = 0.0;

    foreach (explode('+', $calculation) as $i) {
        $subResult = 1.0;
        foreach (explode('*', $i) as $j) {
            if (strpos($j, '1/') === 0) {
                $sanitizedJ = substr($j, 2);
                if ((float)$sanitizedJ == 0.0) {
                    return "Undefined";
                }
                $subResult /= (float)$sanitizedJ;
            } elseif ($j !== '') {
                $subResult *= (float)$j;
            }
        }
        $result += $subResult;
    }

    return (string)$result;
}

function sanitizeCalculation(string $calculation): string {
    $result = $calculation;
    $result = preg_replace('/\s+/', '', $result);               // Remove all spaces
    $result = preg_replace('/\++/', '+', $result);              // ++ -> +
    $result = preg_replace('/-+/', '-', $result);               // -- -> -
    $result = preg_replace('/\*\+/', '*', $result);             // *+ -> *
    $result = preg_replace('/\/\+/', '/', $result);             // /+ -> /
    $result = preg_replace('/\+-/', '-', $result);              // +- -> -
    $result = preg_replace('/(\d)-(\d)/', '$1+-$2', $result);   // a-b -> a+-b
    $result = preg_replace('/\//', '*1/', $result);             // a/b -> a*1/b
    return $result;
}

// MAIN
// ====

if (__FILE__ === realpath($_SERVER['SCRIPT_FILENAME'])) {
    askQuestion();
}
```

tests.php:
```php
<?php

// IMPORTS
// =======

require_once __DIR__ . '/calculator.php';

// FUNCTIONS
// =========

function runTests(): void {
    echo "Test 01: " . (getResult("2 + 3") === (string)(2 + 3)) . "\n";
    echo "Test 02: " . (getResult("2 - 3") === (string)(2 - 3)) . "\n";
    echo "Test 03: " . (getResult("2 * 3") === (string)(2 * 3)) . "\n";
    echo "Test 04: " . (getResult("2 / 3") === (string)(2 / 3)) . "\n";
    echo "Test 05: " . (getResult("2 / 0") === "Undefined") . "\n";
    echo "Test 06: " . (getResult("  7 +   2 * 3 - 4 / -2 ") === (string)(  7 +   2 * 3 - 4 / -2 )) . "\n";
    echo "Test 07: " . (getResult("  7 +   2 / 3 - 4 * +-2 ") === (string)(  7 +   2 / 3 - 4 * +-2 )) . "\n";
    echo "Test 08: " . (getResult("2.0 + 3.0") === (string)(2.0 + 3.0)) . "\n";
}

// MAIN
// ====

if (__FILE__ === realpath($_SERVER['SCRIPT_FILENAME'])) {
    runTests();
}
```

## What's next?

Part 2, with the remaining most popular languages!