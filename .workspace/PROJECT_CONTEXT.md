# Rick and Morty Wiki - Project Context

## Purpose

This workspace folder is a private, local-only memory area for the project.
It is ignored by Git and not intended to be shipped in app builds.

Use this file as the first place to read when resuming work in a new chat.

## Project Snapshot

- App name: Rick and Morty Wiki
- Slug: `rick-and-morty-wiki`
- Package name: `com.lobodev.rickandmortywiki`
- Current public version: `1.0.0`
- Current Android `versionCode`: `1`
- Stack: Expo + React Native + Expo Router + TypeScript + NativeWind
- Main goal right now: stabilize release flow and keep a reusable memory for future work

## Important Paths

- App config: [app.json](../app.json)
- Package scripts: [package.json](../package.json)
- EAS config: [eas.json](../eas.json)
- APK save script: [scripts/save-release-apk.ps1](../scripts/save-release-apk.ps1)
- Private APK folder: [apks](./apks)
- Private reference folder: [references](./references)
- Private notes folder: [notes](./notes)
- Task list: [TODO.md](./TODO.md)
- Ideas backlog: [IDEAS.md](./IDEAS.md)

## Current Build and Release Setup

### EAS

EAS is configured and linked to the Expo account used in this project.

- `eas.json` has:
  - `preview` profile for Android `apk`
  - `production` profile for Android `app-bundle`
  - `cli.appVersionSource = "remote"`

### Commands

- Login to Expo/EAS:
  - `npx eas-cli login`
- Build installable APK:
  - `npm run build:android:apk`
- Build Play Store bundle:
  - `npm run build:android:production`
- Save a downloaded APK with versioned naming:
  - `npm run save:apk -- "C:\path\to\downloaded.apk"`

### APK Naming Convention

Downloaded APKs should be copied into `.workspace/apks` with this pattern:

- `rickandmortywiki_v_<version>.apk`

Example:

- `rickandmortywiki_v_1.0.0.apk`

This naming is handled automatically by `scripts/save-release-apk.ps1`, which reads the version from `app.json`.

## What Has Already Been Done

- Created `.workspace/` as a private local workspace
- Added `.workspace/` to `.gitignore`
- Added Android `versionCode` to `app.json`
- Added `eas.json`
- Added helper script to save APKs into `.workspace/apks`
- Updated package scripts to use `npx eas-cli`
- Successfully logged into EAS
- Successfully created and linked the EAS project
- Successfully generated Android credentials remotely on Expo
- Successfully generated a keystore on Expo's side
- Successfully built an Android APK with the `preview` profile
- Successfully installed and launched the app on an Android emulator from the EAS build link

## Important Clarifications

- Running the app in Expo Go is not the same as installing the final standalone app.
- The EAS `preview` build flow produces a real APK that can be installed directly.
- The EAS `production` build flow is for Play Store delivery and generates an AAB.
- EAS builds happen remotely, so the build output is downloaded after completion.
- The local script only organizes the APK once it has already been downloaded.

## Recommended Versioning Workflow

When preparing a new app release:

1. Update `expo.version` in `app.json`
2. If needed, update Android `versionCode`
3. Build a preview APK for testing
4. Save the APK into `.workspace/apks`
5. After validation, build the production AAB

Suggested semantic versioning:

- `1.0.1` for bug fixes
- `1.1.0` for improvements and new non-breaking features
- `2.0.0` for major changes or breaking redesigns

## Publishing Notes

For Google Play, the app will still need:

- Play Console developer account
- Store listing
- App icon and screenshots
- Description and metadata
- Policy/privacy requirements as applicable
- Production AAB upload

EAS helps with build/signing, but publication is completed in Google Play Console.

## Suggested Working Strategy For Future Chats

Use this split:

- Core project memory lives in this file
- Actionable pending work lives in `TODO.md`
- Product ideas and future concepts live in `IDEAS.md`
- Release-specific details can go into `.workspace/notes/release-notes.md`
- UI and product ideas can go into `.workspace/notes/product-notes.md`
- External docs, screenshots, APKs, and references stay in their dedicated folders

If a new chat starts without context, ask the agent to read:

- `.workspace/PROJECT_CONTEXT.md`
- `.workspace/TODO.md` when you want execution-ready pending tasks
- `.workspace/IDEAS.md` when you want product or feature brainstorming

That should be the default handoff point before continuing work.

## Current Priorities

- Continue improving the app itself in a new chat
- Keep release and publishing context preserved here
- Later review UI polish, app-store readiness, and production publication steps

## Next Likely Work Areas

- Visual polish and stronger identity
- UX improvements and navigation details
- New features inside the app
- Store-ready assets and screenshots
- Final Play Store release process
