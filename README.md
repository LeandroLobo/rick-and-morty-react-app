# Rick and Morty Wiki

Mobile app built with Expo, React Native, Expo Router, and TypeScript.

The project is focused on exploring the Rick and Morty universe through a clean mobile experience while also serving as a learning project and a portfolio piece.

## Goals

- Keep improving mobile development skills with Expo and React Native
- Build a solid, publishable app from end to end
- Use the project as part of a personal portfolio
- Prepare the app for future monetization experiments, including Google ads

## Stack

- Expo
- React Native
- Expo Router
- TypeScript
- NativeWind
- Jest

## Current Status

- Version: `1.0.0`
- Android package: `com.lobodev.rickandmortywiki`
- Android `versionCode`: `1`
- EAS Build configured for APK preview builds and production AAB builds

## Features

- Character browsing
- Character detail view
- Tab-based navigation
- Mobile-first Expo app structure

## Getting Started

### Requirements

- Node.js
- npm
- Android Studio and Android SDK for local Android runs
- Expo-compatible device or emulator

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm start
```

### Run on Android locally

```bash
npm run android
```

### Run on web

```bash
npm run web
```

## Build and Release

### Login to EAS

```bash
npx eas-cli login
```

### Generate an installable Android APK

```bash
npm run build:android:apk
```

### Generate a production Android AAB for Google Play

```bash
npm run build:android:production
```

### Save a downloaded APK with versioned naming

```bash
npm run save:apk -- "C:\path\to\downloaded.apk"
```

This copies the file into the local private workspace folder:

- `.workspace/apks`

With the naming convention:

- `rickandmortywiki_v_<version>.apk`

## Quality Scripts

### Run tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Project Notes

This repository includes a local private workspace folder, `.workspace/`, used to keep:

- project context
- personal notes
- APK files
- references and work-in-progress material

That folder is ignored by Git and is not intended to be part of the app itself.

## Roadmap Direction

Planned and exploratory directions include:

- UI and visual polish
- new app features
- richer user interactions
- authentication
- possible future community features
- eventual Play Store publication

## Disclaimer

This is a fan project inspired by Rick and Morty and is intended for learning, experimentation, and portfolio development.

