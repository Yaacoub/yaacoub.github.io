#!/bin/bash

parent_path=$(dirname "${BASH_SOURCE[0]}")

cd $parent_path/../../-assets/images

for file in $(find . -name "*.png")
do "$parent_path/../../-executables/cwebp" "$file" -metadata all -o "${file%.png}.webp"
done