---
author: "Peter Yaacoub"
has_repo: true
layout: "article"
title: "1 App, 20 Programming Languages (Part 2)"
---

## Introduction

If you haven’t read the first part of this challenge, go check it out! ([1 App, 20 Programming Languages (Part 1)](https://yaacoub.github.io/articles/code-dome/1-app-20-programming-languages-part-1/)).

## Go

Go, like Golang, and not to be confused with the Go game, is a relatively new programming language released in 2009. That’s the first programming language younger than me. It’s funny how the older languages have an oligopoly (a market dominated by a small number of actors), reminds me of real-world politics (oh, part 2 already punches hard!).

To focus back on the code, Go looks clean, like other modern languages, and the differentiation between a definition `:=`  and redefinition is interesting `=`. However, I found two major inconveniences. First, not unique to Go is the necessity to create other files. In this case, a mod file and an individual main file that would have the code common to both files. Second, Go is the only language in this challenge where I chose to abandon floating-point arithmetic because I would never get the same precision as Test 7’s result. So I had to come out with the big guns, and by that I mean the `math/big` library. Hence, coding took a little more time than I would’ve expected from that newer language.

calculator.go:
```go
package main

// IMPORTS
// =======

import (
    "math/big"
    "regexp"
    "strconv"
    "strings"
)

// FUNCTIONS
// =========

func GetResult(calculation string) string {
    calculation = sanitizeCalculation(calculation)
    result := new(big.Rat)
    result.SetInt64(0)

    for _, i := range strings.Split(calculation, "+") {
        subResult := big.NewRat(1, 1)
        for _, j := range strings.Split(i, "*") {
            if strings.HasPrefix(j, "1/") {
                sanitizedJ := strings.TrimPrefix(j, "1/")
				denom := new(big.Rat)
				denom.SetString(sanitizedJ)
                if denom.Sign() == 0 { return "Undefined" }
                subResult.Quo(subResult, denom)
            } else {
				factor := new(big.Rat)
				factor.SetString(j)
                subResult.Mul(subResult, factor)
            }
        }
        result.Add(result, subResult)
    }

    f, _ := result.Float64()
    return strconv.FormatFloat(f, 'f', -1, 64)
}

func sanitizeCalculation(calculation string) string {
    calc := regexp.MustCompile(`\s+`).ReplaceAllString(calculation, "")			// Remove all spaces
    calc = regexp.MustCompile(`\++`).ReplaceAllString(calc, "+")				// ++ -> +
    calc = regexp.MustCompile(`-+`).ReplaceAllString(calc, "-")					// -- -> -
    calc = regexp.MustCompile(`\*\+`).ReplaceAllString(calc, "*")				// *+ -> *
    calc = regexp.MustCompile(`/\+`).ReplaceAllString(calc, "/")				// /+ -> /
    calc = regexp.MustCompile(`\+-`).ReplaceAllString(calc, "-")				// +- -> -
    calc = regexp.MustCompile(`(\d)-(\d)`).ReplaceAllString(calc, "$1+-$2")		// a-b -> a+-b
    calc = strings.ReplaceAll(calc, "/", "*1/")									// a/b -> a*1/b
    return calc
}
```

main.go:
```go
//go:build !testmain
// +build !testmain

package main

// IMPORTS§
// =======

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

// FUNCTIONS
// =========

func askQuestion() {
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Your calculation: ")
    input, _ := reader.ReadString('\n')
    input = strings.TrimSpace(input)
    result := GetResult(input)
    fmt.Printf(" = %s\n", result)
}

// MAIN
// ====

func main() {
    askQuestion()
}
```

tests.go:
```go
//go:build testmain
// +build testmain

package main

// IMPORTS
// =======

import (
    "fmt"
    "strconv"
)

// FUNCTIONS
// =========

func runTests() {
    fmt.Printf("Test 01: %v\n", GetResult("2 + 3") == fmt.Sprint(2 + 3))
    fmt.Printf("Test 02: %v\n", GetResult("2 - 3") == fmt.Sprint(2 - 3))
    fmt.Printf("Test 03: %v\n", GetResult("2 * 3") == fmt.Sprint(2 * 3))
    fmt.Printf("Test 04: %v\n", GetResult("2 / 3") == fmt.Sprint(2.0 / 3.0))
    fmt.Printf("Test 05: %v\n", GetResult("2 / 0") == "Undefined")
    fmt.Printf("Test 06: %v\n", GetResult("  7 +   2 * 3 - 4 / -2 ") == fmt.Sprint(  7 +   2 * 3 - 4 / -2 ))
    fmt.Printf("Test 07: %v\n", GetResult("  7 +   2 / 3 - 4 * +-2 ") == strconv.FormatFloat(  7 +   2.0 / 3 - 4 * +-2 , 'f', -1, 64))
    fmt.Printf("Test 08: %v\n", GetResult("2.0 + 3.0") == fmt.Sprint(2.0 + 3.0))
}

// MAIN
// ====

func main() {
	runTests()
}
```

## Rust

I was wondering if Rust was much older than Go. Surprisingly, it’s even more recent! It first appeared in 2012, and I never would’ve thought. Then again, when doing the tests, it seemed intentionally strict about arithmetic between integer and floating-point types. Of course, this doesn’t mean anything on its own, but it tingled my spidey sense.

This time, I only had one new file to add, a Cargo.toml. Also, it was more conventional to use folders to separate the files, so I did so. Also-also, I used true tests this time instead of printing the results to the console, because why not? It was easy. One interesting discovery that relates to the mentioned arithmetic problem is the strict, and I mean very strict, difference between a string and a static string. In practice, this means that I should convert a string literal, which is static, to a string type in order to return it from a function that only returns string types and not static strings, which include string literals. Clear? In short, it seems to me that this is always the case: string ≠ static string.

Rust actually stems from performance and security issues with C and C++, and today it is heavily used in parts of Firefox and many other systems projects.

calculator.rs:
```rust
// IMPORTS
// =======

use regex::Regex;
use std::io::{self, Write};

// FUNCTIONS
// =========

#[allow(dead_code)]
fn ask_question() {
    print!("Your calculation: ");
    io::stdout().flush().ok();
    let mut input = String::new();
    if io::stdin().read_line(&mut input).is_ok() {
        let result = get_result(&input);
        println!(" = {}", result);
    }
}

pub fn get_result(calculation: &str) -> String {
    let calculation = sanitize_calculation(calculation);
    let mut result = 0.0f64;

    for i in calculation.split('+') {
        let mut sub_result = 1.0f64;
        for j in i.split('*') {
            if let Some(sanitized_j) = j.strip_prefix("1/") {
                if sanitized_j.parse().unwrap_or(f64::NAN) == 0.0 { return "Undefined".to_string(); }
                sub_result /= sanitized_j.parse().unwrap_or(f64::NAN);
            } else {
                sub_result *= j.parse().unwrap_or(f64::NAN);
            }
        }
        result += sub_result;
    }

    format!("{}", result)
}

fn sanitize_calculation(calculation: &str) -> String {
    let mut calc = Regex::new(r"\s+").unwrap().replace_all(calculation, "").into_owned();   // Remove all spaces
    calc = Regex::new(r"\++").unwrap().replace_all(&calc, "+").into_owned();                // ++ -> +
    calc = Regex::new(r"-+").unwrap().replace_all(&calc, "-").into_owned();                 // -- -> -
    calc = Regex::new(r"\*\+").unwrap().replace_all(&calc, "*").into_owned();               // *+ -> *
    calc = Regex::new(r"/\+").unwrap().replace_all(&calc, "/").into_owned();                // /+ -> /
    calc = Regex::new(r"\+-").unwrap().replace_all(&calc, "-").into_owned();                // +- -> -
    calc = Regex::new(r"(\d)-(\d)").unwrap().replace_all(&calc, "$1+-$2").into_owned();     // a-b -> a+-b
    calc = Regex::new(r"\/").unwrap().replace_all(&calc, "*1/").into_owned();               // a/b -> a*1/b
    calc
}

// MAIN
// ====

#[allow(dead_code)]
fn main() {
    ask_question();
}
```

tests.rs:
```rust
// IMPORTS
// =======

#[path = "../src/calculator.rs"]
mod calculator;

use calculator::get_result;

// FUNCTIONS
// =========

#[test]
fn run_tests() {
    assert_eq!(get_result("2 + 3"), format!("{}", 2 + 3));
    assert_eq!(get_result("2 - 3"), format!("{}", 2 - 3));
    assert_eq!(get_result("2 * 3"), format!("{}", 2 * 3));
    assert_eq!(get_result("2 / 3"), format!("{}", 2.0 / 3.0));
    assert_eq!(get_result("2 / 0"), "Undefined");
    assert_eq!(get_result("  7 +   2 * 3 - 4 / -2 "), format!("{}",   7.0 +   2.0 * 3.0 - 4.0 / -2.0 ));
    assert_eq!(get_result("  7 +   2 / 3 - 4 * +-2 "), format!("{}",   7.0 +   2.0 / 3.0 - 4.0 * -2.0 ));
    assert_eq!(get_result("2.0 + 3.0"), format!("{}", 2.0 + 3.0));
}

// MAIN
// ====

fn main() {
    run_tests();
}
```

## Kotlin

I seem to have joined the newbies club because Kotlin is a relatively recent language, first appearing in 2011. I’m an avid Swift developer, so as soon as I started using Kotlin, the similarities were screaming at me: optionals, types, syntax,… Besides, the containerization (which is another subject) and float formatting being tedious, everything else was as smooth as butter.

Oh, and why doesn’t my VS Code have built-in syntax highlighting for it? Am I missing something? I know the language is developed by JetBrains, whose IDEs rival VS Code, so does this explain it? So many questions, so few answers. Yet there seems to be change; JetBrains recently announced that they were working on a Kotlin Language Server and extension for VS Code.

calculator.kt:
```kotlin
// IMPORTS
// =======

import java.io.BufferedReader
import java.io.InputStreamReader

// FUNCTIONS
// =========

fun askQuestion() {
    print("Your calculation: ")
    val reader = BufferedReader(InputStreamReader(System.`in`))
    val calculation = reader.readLine()
    val result = getResult(calculation)
    println(" = $result")
}

fun getResult(raw: String?): String {
    val calculation = sanitizeCalculation(raw ?: "")
    var result = 0.0

    for (i in calculation.split("+")) {
        var subResult = 1.0
        for (j in i.split("*")) {
            if (j.startsWith("1/")) {
                val sanitizedJ = j.removePrefix("1/")
                val value = sanitizedJ.toDoubleOrNull() ?: Double.NaN
                if (value == 0.0) return "Undefined"
                subResult /= value
            } else {
                subResult *= j.toDoubleOrNull() ?: Double.NaN
            }
        }
        result += subResult
    }

    if ((result == result.toInt().toDouble()) && !calculation.contains(".")) {
        return result.toInt().toString()
    }
    return result.toString()
}

fun sanitizeCalculation(calculation: String): String {
    return calculation
        .replace("""\s+""".toRegex(), "")               // Remove all spaces
        .replace("""\++""".toRegex(), "+")              // ++ -> +
        .replace("""-+""".toRegex(), "-")               // -- -> -
        .replace("""\*\+""".toRegex(), "*")             // *+ -> *
        .replace("""/\+""".toRegex(), "/")              // /+ -> /
        .replace("""\+-""".toRegex(), "-")              // +- -> -
        .replace("""(\d)-(\d)""".toRegex(), "$1+-$2")   // a-b -> a+-b
        .replace("/", "*1/")                            // a/b -> a*1/b
}

// MAIN
// ====

fun main() {
    askQuestion()
}
```

tests.kt:
```kotlin
// FUNCTIONS
// =========

fun runTests() {
    println("Test 01: " + (getResult("2 + 3") == "${2 + 3}"))
    println("Test 02: " + (getResult("2 - 3") == "${2 - 3}"))
    println("Test 03: " + (getResult("2 * 3") == "${2 * 3}"))
    println("Test 04: " + (getResult("2 / 3") == "${2.0 / 3}"))
    println("Test 05: " + (getResult("2 / 0") == "Undefined"))
    println("Test 06: " + (getResult("  7 +   2 * 3 - 4 / -2 ") == "${  7 +   2 * 3 - 4 / -2 }"))
    println("Test 07: " + (getResult("  7 +   2 / 3 - 4 * +-2 ") == "${  7 +   2.0 / 3 - 4 * +-2 }"))
    println("Test 08: " + (getResult("2.0 + 3.0") == "${2.0 + 3.0}"))
}

// MAIN
// ====

fun main() {
    runTests()
}
```

## Lua

This, I think, is the first time I have ever heard or been exposed to the Lua programming language. I thought that it would also be part of the younger club, but I was totally wrong. It is actually closer to JavaScript, having been introduced in 1993.

In some ways, the language seems modern, like a blend of JavaScript and Python. In other ways, it has unique quirks. Lua doesn’t use regular expressions, but its own pattern-matching system, which is somewhat annoying. In fact, I lost half an hour to find out that `-` is also a special character that should be escaped, not using a backslash but a percentage symbol. It also stems from the rare breed that allows the execution of code outside of any block, essentially meaning that the entire file is the main function.

Also interesting how Lua uses the colon, like other languages use the dot for chaining. Makes me wonder why some like to have a unique syntax from “the norm”. What gives? Well, I looked up the answer, so let me explain. In Lua, the dot is the table-access operator, which allows us to write this: obj.func(obj, arg1, arg2); similarly to other languages. On the other hand, the column is syntactic sugar that passes the object as the first argument, making the code shorter: obj:func(arg1, arg2); where other languages would implicitly pass self to the function.

calculator.lua:
```lua
-- FUNCTIONS
-- =========

local function sanitizeCalculation(calculation)
    calculation = calculation:gsub("%s+", "")               -- Remove all spaces
    calculation = calculation:gsub("%++", "+")              -- ++ -> +
    calculation = calculation:gsub("%-+", "-")              -- -- -> -
    calculation = calculation:gsub("%*%+", "*")             -- *+ -> *
    calculation = calculation:gsub("/%+", "/")              -- /+ -> /
    calculation = calculation:gsub("%+%-", "-")             -- +- -> -
    calculation = calculation:gsub("(%d)-(%d)", "%1+-%2")   -- a-b -> a+-b
    calculation = calculation:gsub("/", "*1/")              -- a/b -> a*1/b
    return calculation
end

local function getResult(calculation)
    calculation = sanitizeCalculation(calculation or "")
    local result = 0.0

    for i in calculation:gmatch("([^%+]+)") do
        local subResult = 1.0
        for j in i:gmatch("([^%*]+)") do
            if j:sub(1, 2) == "1/" then
                local sanitizedJ = j:sub(3)
                if tonumber(sanitizedJ) == 0 then return "Undefined" end
                subResult = subResult / tonumber(sanitizedJ)
            else
                subResult = subResult * tonumber(j)
            end
        end
        result = result + subResult
    end

    if result == math.tointeger(result) and not calculation:find("/") and not calculation:find("%.") then
        return tostring(math.tointeger(result))
    end
    return tostring(result)
end

local function askQuestion()
    io.write("Your calculation: ")
    local calculation = io.read("*l") or ""
    local result = getResult(calculation)
    print(" = " .. result)
end

-- MAIN
-- ====

-- If required as a module, expose functions; otherwise run CLI
if pcall(debug.getlocal, 4, 1) then
    return { getResult = getResult }
else
    askQuestion()
end
```

tests.lua:
```lua
-- IMPORTS
-- =======

local calc = require("calculator")
local getResult = calc.getResult

-- FUNCTIONS
-- =========

local function runTests()
    print("Test 01: " .. tostring(getResult("2 + 3") == tostring(2 + 3)))
    print("Test 02: " .. tostring(getResult("2 - 3") == tostring(2 - 3)))
    print("Test 03: " .. tostring(getResult("2 * 3") == tostring(2 * 3)))
    print("Test 04: " .. tostring(getResult("2 / 3") == tostring(2 / 3)))
    print("Test 05: " .. tostring(getResult("2 / 0") == "Undefined"))
    print("Test 06: " .. tostring(getResult("  7 +   2 * 3 - 4 / -2 ") == tostring(  7 +   2 * 3 - 4 / -2 )))
    print("Test 07: " .. tostring(getResult("  7 +   2 / 3 - 4 * +-2 ") == tostring(  7 +   2 / 3 - 4 * -2 )))
    print("Test 08: " .. tostring(getResult("2.0 + 3.0") == tostring(2.0 + 3.0)))
end

-- MAIN
-- ====

runTests()
```

## Assembly

I tried, and I failed. I’ve been dreading this moment ever since I saw that Assembly was in the top 20, which meant that I had to work with it. I took courses working with Assembly or Assembly-like code on paper, but building anything with it requires not only a deep understanding of the language but also understanding the system on which the language is running. I know neither that well. After attempting with the x86-64 NASM syntax, I gave up.

The files I had were twice as long as others, the commands were less readable, and anything not remotely basic had to be recreated manually. With pure perseverance and more tutorials, maybe I could’ve done it, but I just didn’t want to go down that rabbit hole. Lots of developers didn’t want to, because we wouldn’t have created all those other programming languages that are easier to read, write, and collaborate with.

## Ruby

Ruby looks like Python and Lua, and was released in the same era: the mid-1990s. I know Ruby mainly from installing the gems that make my website codebase easier to maintain. That said, it’s a very pleasant language and works great as expected.

Now, I know that I’ve been bombarding you with rhetorical questions and answers here and there, so let me give you another one: what’s made Python more popular than Ruby and Lua, for instance? They look and feel the same, but I haven’t dived deep into the lore and the communities surrounding them to know more. Python excels in general-purpose domains, data science, and web development, and it has a wide range of libraries and community support. It also had a couple of years of head start and worked well with scientists and analysts, paving the way for a feedback loop: students learn Python, workforce demands for Python increase, and more projects utilize Python.

calculation.rb:
```ruby
# FUNCTIONS
# =========

def ask_question
    print 'Your calculation: '
    calculation = STDIN.gets
    return unless calculation
    result = get_result(calculation)
    puts " = #{result}"
end

def get_result(calculation)
    calculation = sanitize_calculation(calculation)
    result = 0.0

    calculation.split('+').each do |i|
        sub_result = 1.0
        i.split('*').each do |j|
            if j.start_with?('1/')
                sanitized_j = j.gsub(%r{1/}, '')
                return 'Undefined' if sanitized_j.to_f == 0.0
                sub_result /= sanitized_j.to_f
            else
                sub_result *= j.to_f
            end
        end
        result += sub_result
    end

    if result == result.to_i and !calculation.include?("/") and !calculation.include?(".") then
        return result.to_i.to_s
    end
    result.to_s
end

def sanitize_calculation(calculation)
    calculation
        .gsub(/\s+/, '')                # Remove all spaces
        .gsub(/\++/, '+')               # ++ -> +
        .gsub(/-+/, '-')                # -- -> -
        .gsub(/\*\+/, '*')              # *+ -> *
        .gsub(/\/\+/, '/')              # /+ -> /
        .gsub(/\+-/, '-')               # +- -> -
        .gsub(/(\d)-(\d)/, '\1+-\2')    # a-b -> a+-b
        .gsub(/\//, '*1/')              # a/b -> a*1/b
end

# MAIN
# ====

if __FILE__ == $PROGRAM_NAME
    ask_question
end
```

tests.rb:
```ruby
# IMPORTS
# =======

require_relative './calculator'

# FUNCTIONS
# =========

def run_tests
  puts "Test 01: #{get_result('2 + 3') == (2 + 3).to_s}"
  puts "Test 02: #{get_result('2 - 3') == (2 - 3).to_s}"
  puts "Test 03: #{get_result('2 * 3') == (2 * 3).to_s}"
  puts "Test 04: #{get_result('2 / 3') == (2 / 3.0).to_s}"
  puts "Test 05: #{get_result('2 / 0') == 'Undefined'}"
  puts "Test 06: #{get_result('  7 +   2 * 3 - 4 / -2 ') == (  7 +   2 * 3 - 4 / -2.0 ).to_s}"
  puts "Test 07: #{get_result('  7 +   2 / 3 - 4 * +-2 ') == (  7 +   2 / 3.0 - 4 * +-2 ).to_s}"
  puts "Test 08: #{get_result('2.0 + 3.0') == (2.0 + 3.0).to_s}"
end

# MAIN
# ====

if __FILE__ == $PROGRAM_NAME
  run_tests
end
```

## Dart

Dart feels like a modern language, very easy to use. Again, it feels like I’m back at home using Swift types and optionals. The only feature that’s not modern is the semicolons. Love them or hate them, I don’t love them (I wouldn’t say I hate them, but I can still live with them; however, they should retire already). Dart was released by Google in 2011. Why do I say that only now? Because it makes a perfect transition to the next language!

calculation.dart:
```dart
// IMPORTS
// =======

import 'dart:io';

// FUNCTIONS
// =========

void askQuestion() {
    stdout.write("Your calculation: ");
    final calculation = stdin.readLineSync();
    final result = getResult(calculation);
    stdout.writeln(" = $result");
}

String getResult(String calculation) {
    calculation = sanitizeCalculation(calculation);
    double result = 0.0;

    for (final i in calculation.split("+")) {
        double subResult = 1.0;
        for (final j in i.split("*")) {
            if (j.startsWith("1/")) {
                final sanitizedJ = j.replaceAll(RegExp(r"1/"), "");
                final value = double.tryParse(sanitizedJ) ?? double.nan;
                if (value == 0) return "Undefined";
                subResult /= value;
            } else {
                final value = double.tryParse(j) ?? double.nan;
                subResult *= value;
            }
        }
        result += subResult;
    }

    if (result == result.toInt() && !calculation.contains("/") && !calculation.contains(".")) {
        return result.toInt().toString();
    }
    return result.toString();
}

String sanitizeCalculation(String calculation) {
    return calculation
        .replaceAll(RegExp(r"\s+"), "")                                                 // Remove all spaces
        .replaceAll(RegExp(r"\++"), "+")                                                // ++ -> +
        .replaceAll(RegExp(r"-+"), "-")                                                 // -- -> -
        .replaceAll(RegExp(r"\*\+"), "*")                                               // *+ -> *
        .replaceAll(RegExp(r"/\+"), "/")                                                // /+ -> /
        .replaceAll(RegExp(r"\+-"), "-")                                                // +- -> -
        .replaceAllMapped(RegExp(r"(\d)-(\d)"), (match) => "${match[1]}+-${match[2]}")  // a-b -> a+-b
        .replaceAll("/", "*1/");                                                        // a/b -> a*1/b
}

// MAIN
// ====

void main(List<String> args) {
    askQuestion();
}
```

tests.dart:
```dart
// IMPORTS
// =======

import 'calculator.dart';

// FUNCTIONS
// =========

void runTests() {
    print('Test 01: ${getResult("2 + 3") == "${2 + 3}"}');
    print('Test 02: ${getResult("2 - 3") == "${2 - 3}"}');
    print('Test 03: ${getResult("2 * 3") == "${2 * 3}"}');
    print('Test 04: ${getResult("2 / 3") == "${2 / 3}"}');
    print('Test 05: ${getResult("2 / 0") == "Undefined"}');
    print('Test 06: ${getResult("  7 +   2 * 3 - 4 / -2 ") == "${  7 +   2 * 3 - 4 / -2 }"}');
    print('Test 07: ${getResult("  7 +   2 / 3 - 4 * +-2 ") == "${  7 +   2 / 3 - 4 * -2 }"}');
    print('Test 08: ${getResult("2.0 + 3.0") == "${2.0 + 3.0}"}');
}

// MAIN
// ====

void main(List<String> args) {
    runTests();
}
```

## Swift

Swift is a language released by Apple in 2014 to rival Taylor Swift’s music. I use it to develop my applications on Apple devices. Usually, I develop with Xcode and not the command line. I quickly realized that it was painful. Compilation times are always as long, but compiling multiple files at once is tedious (I used the cat command to combine my two files because it didn’t work otherwise).

Overall, this is not the best experience, so I understand why it’s not higher ranked in some popularity indexes. I really wish it were, though.

calculator.swift:
```swift
// IMPORTS
// =======

import Foundation

// FUNCTIONS
// =========

func askQuestion() {
    print("Your calculation: ", terminator: "")
    guard let calculation = readLine() else { return }
    let result = getResult(calculation)
    print(" = \(result)")
}

func getResult(_ calculation: String) -> String {
    let sanitized = sanitizeCalculation(calculation)
    var result = 0.0

    for i in sanitized.split(separator: "+") {
        var subResult = 1.0
        for j in i.split(separator: "*") {
            if j.hasPrefix("1/") {
                let sanitizedJ = j.replacingOccurrences(of: "1/", with: "")
                guard let value = Double(sanitizedJ) else { continue }
                if value == 0 { return "Undefined" }
                subResult /= value
            } else {
                guard let value = Double(j) else { continue }
                subResult *= value
            }
        }
        result += subResult
    }

    if result == Double(Int(result)) && !calculation.contains("/") && !calculation.contains(".") {
        return String(Int(result))
    }
    return String(result)
}

func sanitizeCalculation(_ calculation: String) -> String {
    return calculation
        .replacingOccurrences(of: "\\s+", with: "", options: .regularExpression)
        .replacingOccurrences(of: "\\++", with: "+", options: .regularExpression)
        .replacingOccurrences(of: "-+", with: "-", options: .regularExpression)
        .replacingOccurrences(of: "\\*\\+", with: "*", options: .regularExpression)
        .replacingOccurrences(of: "/\\+", with: "/", options: .regularExpression)
        .replacingOccurrences(of: "\\+-", with: "-", options: .regularExpression)
        .replacingOccurrences(of: "(\\d)-(\\d)", with: "$1+-$2", options: .regularExpression)
        .replacingOccurrences(of: "/", with: "*1/")
}

// MAIN
// ====

let file = URL(fileURLWithPath: #file).lastPathComponent
let isCalculator = CommandLine.arguments.first.map { URL(fileURLWithPath: $0).lastPathComponent == file } ?? false
let isRunningTests = CommandLine.arguments.contains(where: { $0.hasSuffix("tests.swift") })
if isCalculator && !isRunningTests {
    askQuestion()
}
```

tests.swift:
```swift
// IMPORTS
// =======

import Foundation

// FUNCTIONS
// =========

func runTests() {
    print("Test 01: \(getResult("2 + 3") == "\(2 + 3)")")
    print("Test 02: \(getResult("2 - 3") == "\(2 - 3)")")
    print("Test 03: \(getResult("2 * 3") == "\(2 * 3)")")
    print("Test 04: \(getResult("2 / 3") == "\(2.0 / 3.0)")")
    print("Test 05: \(getResult("2 / 0") == "Undefined")")
    print("Test 06: \(getResult("  7 +   2 * 3 - 4 / -2 ") == "\(  7 +   2.0 * 3 - 4 / -2 )")")
    print("Test 07: \(getResult("  7 +   2 / 3 - 4 * +-2 ") == "\(  7 +   2.0 / 3 - 4 * -2 )")")
    print("Test 08: \(getResult("2.0 + 3.0") == "\(2.0 + 3.0)")")
}

// MAIN
// ====

runTests()
```

## R

I had never fully understood the extent or power of R. I only learnt to use it for complex calculations, but the language is very capable outside of that.

One confusing thing I stumbled upon is the `readline()` function that only works reliably in interactive sessions. So I instead used `readLines` on `stdin`, which makes it very explicit.

There also seems to be something going on between R and Perl. In fact, the function used to split strings has a parameter called `perl`. This intrigued me, so I looked into it, and it turns out that the function uses PCRE, Perl-Compatible Regular Expression Engine.

I’d also like to shed light on the default file extension: an uppercase R. Some systems are case-sensitive, and usually all extensions are in lowercase, so it’s an interesting and weird choice there.

calculator.R:
```r
# FUNCTIONS
# =========

ask_question <- function() {
    cat("Your calculation: ")
    calculation <- readLines(con = "stdin", n = 1)
    result <- get_result(calculation)
    cat(" = ", result, "\n", sep = "")
}

get_result <- function(calculation) {
    calculation <- sanitize_calculation(calculation)
    result <- 0.0

    for (i in strsplit(calculation, "\\+", perl = TRUE)[[1]]) {
        sub_result <- 1.0
        for (j in strsplit(i, "\\*", perl = TRUE)[[1]]) {
            if (grepl("^1/", j)) {
                sanitized_j <- sub("^1/", "", j)
                value <- as.numeric(sanitized_j)
                if (as.numeric(sanitized_j) == 0) return("Undefined")
                sub_result <- sub_result / as.numeric(sanitized_j)
            } else {
                sub_result <- sub_result * as.numeric(j)
            }
        }
        result <- result + sub_result
    }

    as.character(result)
}

sanitize_calculation <- function(calculation) {
    calculation <- gsub("\\s+", "", calculation)                # Remove all spaces
    calculation <- gsub("\\++", "+", calculation)               # ++ -> +
    calculation <- gsub("-+", "-", calculation)                 # -- -> -
    calculation <- gsub("\\*\\+", "*", calculation)             # *+ -> *
    calculation <- gsub("/\\+", "/", calculation)               # /+ -> /
    calculation <- gsub("\\+-", "-", calculation)               # +- -> -
    calculation <- gsub("(\\d)-(\\d)", "\\1+-\\2", calculation) # a-b -> a+-b
    calculation <- gsub("/", "*1/", calculation)                # a/b -> a*1/b
    calculation
}

# MAIN
# ====

if (identical(sys.nframe(), 0L)) {
    ask_question()
}
```

tests.R:
```r
# IMPORTS
# =======

source("calculator.R")

# FUNCTIONS
# =========

run_tests <- function() {
  cat("Test 01: ", get_result("2 + 3") == as.character(2 + 3), "\n", sep = "")
  cat("Test 02: ", get_result("2 - 3") == as.character(2 - 3), "\n", sep = "")
  cat("Test 03: ", get_result("2 * 3") == as.character(2 * 3), "\n", sep = "")
  cat("Test 04: ", get_result("2 / 3") == as.character(2 / 3), "\n", sep = "")
  cat("Test 05: ", get_result("2 / 0") == "Undefined", "\n", sep = "")
  cat("Test 06: ", get_result("  7 +   2 * 3 - 4 / -2 ") == as.character(  7 +   2 * 3 - 4 / -2 ), "\n", sep = "")
  cat("Test 07: ", get_result("  7 +   2 / 3 - 4 * +-2 ") == as.character(  7 +   2 / 3 - 4 * +-2 ), "\n", sep = "")
  cat("Test 08: ", get_result("2.0 + 3.0") == as.character(2.0 + 3.0), "\n", sep = "")
}

# MAIN
# ====

if (identical(sys.nframe(), 0L)) {
  run_tests()
}
```

## Groovy

Let’s end with some grooooove! First time hearing about it, turns out that Groovy is a Java-syntax-compatible language (basically sugar-coated Java). It was immediately clear when I saw the use of `System.out`, typical in Java. And next to that, new functions like `print` and `println`. I also succeeded in using methods outside of a class, unlike with Java. All in all, it’s not the most modern of languages or syntaxes, but it definitely does the job.

If you’re wondering why it isn’t as much or more popular than Java, like TypeScript is with JavaScript, it’s somewhat due to Kotlin, another Java language. Other languages include Scala, and all this fraction dilutes the numbers for each language. Besides, Java is also a fast-evolving language, contrary to common belief, and modern Java incorporates some of the features that made Groovy compelling in the past.

calculator.groovy:
```groovy
// IMPORTS
// =======

import java.io.BufferedReader
import java.io.InputStreamReader

// FUNCTIONS
// =========

void askQuestion() {
    print "Your calculation: "
    System.out.flush()
    BufferedReader reader = System.in.newReader()
    String calculation = reader.readLine()
    String result = getResult(calculation)
    println " = ${result}"
}

String getResult(String calculation) {
    calculation = sanitizeCalculation(calculation)
    double result = 0.0d

    for (String i : calculation.split("\\+")) {
        double subResult = 1.0d
        for (String j : i.split("\\*")) {
            if (j.startsWith("1/")) {
                String sanitizedJ = j.replaceFirst("1/", "")
                if (!sanitizedJ.isNumber()) return "Undefined"
                if (sanitizedJ.toDouble() == 0.0d) return "Undefined"
                subResult /= sanitizedJ.toDouble()
            } else {
                subResult *= j.toDouble()
            }
        }
        result += subResult
    }

    if (result == result.toLong() && !calculation.contains(".")) {
        return "${result.toLong()}"
    }
    return "${result.round(10)}"
}

String sanitizeCalculation(String calculation) {
    calculation
        .replaceAll('\\s+', '')                 // Remove all spaces
        .replaceAll('\\++', '+')                // ++ -> +
        .replaceAll('-+', '-')                  // -- -> -
        .replaceAll('\\*\\+', '*')              // *+ -> *
        .replaceAll('/\\+', '/')                // /+ -> /
        .replaceAll('\\+-', '-')                // +- -> -
        .replaceAll('(\\d)-(\\d)', '$1+-$2')    // a-b -> a+-b
        .replaceAll('/', '*1/')                 // a/b -> a*1/b
}

// MAIN
// ====

if (this.class.name == 'calculator') {
    askQuestion()
}
```

tests.groovy:
```groovy
// IMPORTS
// =======

import groovy.transform.Field

// VARIABLES
// =========

@Field
def calc = new GroovyShell(this.class.classLoader).parse(new File("calculator.groovy"))

// FUNCTIONS
// =========

void runTests() {
    println "Test 01: ${calc.getResult("2 + 3") == "${2 + 3}"}"
    println "Test 02: ${calc.getResult("2 - 3") == "${2 - 3}"}"
    println "Test 03: ${calc.getResult("2 * 3") == "${2 * 3}"}"
    println "Test 04: ${calc.getResult("2 / 3") == "${2 / 3}"}"
    println "Test 05: ${calc.getResult("2 / 0") == "Undefined"}"
    println "Test 06: ${calc.getResult("  7 +   2 * 3 - 4 / -2 ") == "${  7 +   2 * 3 - 4 / -2 }"}"
    println "Test 07: ${calc.getResult("  7 +   2 / 3 - 4 * +-2 ") == "${  7 +   2 / 3 - 4 * +-2 }"}"
    println "Test 08: ${calc.getResult("2.0 + 3.0") == "${2.0 + 3.0}"}"
}

// MAIN
// ====

if (this.class.name == 'tests') {
    runTests()
}
```

## Conclusion

I don’t really have a conclusion. I just did the challenge for what it is. I did learn, though, that the most popular languages are the more established ones, and that newer languages are starting to take over the lower half of the top 20. The web is also at full force, and even if I skipped HTML and CSS, it is undeniable that the rise of technologies like PWAs, Electron, and React Native, each in different ways—are, are becoming powerhouses for big corporations.

All in all, choose the language that you want because it can probably do what you want it to do. If not, there’s a similar language that can probably do what you want it to do. If not, there’ll be a similar language that will do what you want it to do.