#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"
cd ../../

images=$(find "./-assets/images" -name "*.png")

for image in $images
do "./-executables/cwebp" "$image" -metadata all -o "${image%.png}.webp"
done

ls * -r