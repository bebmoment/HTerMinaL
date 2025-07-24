#!/bin/sh

gcc -o public/hack hack.c check.c -fno-stack-protector -m32 -no-pie
