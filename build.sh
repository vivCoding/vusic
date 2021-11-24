#!/usr/bin/env bash
mkdir build
cd vusic
npm run public_build
cd ..
rsync -a --exclude 'node_modules' --exclude 'public' --exclude '.gitignore' --exclude '.env*' backend/ build/
cp Procfile build/