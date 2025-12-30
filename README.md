# react-native-misaki

React Native bindings for [MisakiSwift](https://github.com/mlalma/MisakiSwift), a Swift G2P (grapheme-to-phoneme) library for converting English text to IPA phonemes. Perfect for text-to-speech applications like [Kokoro TTS](https://github.com/hexgrad/kokoro).

## Requirements

| Requirement | Details |
| ----------- | ------- |
| **Platform** | iOS only (physical device required) |
| **iOS Version** | 18.0+ |
| **React Native** | 0.75+ |
| **Frameworks** | Dynamic frameworks enabled |

> ⚠️ **Simulator not supported**: This library uses MLX under the hood, which does not run on iOS Simulator. You must test on a physical device.

## Installation

```sh
npm install react-native-misaki react-native-nitro-modules
```

> `react-native-nitro-modules` is required as this library uses [Nitro Modules](https://nitro.margelo.com/) for zero-overhead native bindings.

### iOS Setup

**1. Set minimum deployment target to iOS 18.0**

In your `ios/Podfile`, add or update:

```ruby
platform :ios, '18.0'
```

**2. Enable dynamic frameworks**

Required for Swift Package Manager dependencies:

```ruby
use_frameworks! :linkage => :dynamic
```

**3. Install pods**

```sh
cd ios && pod install
```

### Expo Setup

This library requires a [development build](https://docs.expo.dev/develop/development-builds/introduction/) — it does not work with Expo Go.

**1. Install dependencies**

```sh
npx expo install react-native-misaki react-native-nitro-modules expo-build-properties
```

**2. Configure `app.json`**

Add the config plugin to set iOS 18.0 deployment target and enable dynamic frameworks:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "18.0",
            "useFrameworks": "dynamic"
          }
        }
      ]
    ]
  }
}
```

**3. Generate native project and build**

```sh
# Generate the ios folder
npx expo prebuild --platform ios --clean

# Build and run on physical device
npx expo run:ios --device
```

> ⚠️ You must use `--device` to run on a physical device. The iOS Simulator is not supported due to MLX limitations.

## Usage

```typescript
import { EnglishG2P } from 'react-native-misaki';

// American English (default)
const g2p = new EnglishG2P();
const phonemes = g2p.phonemize('Hello world!');
// Output: "həlˈO wˈɜɹld!"

// British English
const g2pBritish = new EnglishG2P({ british: true });
const phonemesBritish = g2pBritish.phonemize('Hello world!');

// Async version (runs on background thread)
const phonemesAsync = await g2p.phonemizeAsync('Hello world!');
```

## API

### `EnglishG2P`

#### Constructor

```typescript
new EnglishG2P(options?: EnglishG2POptions)
```

| Option    | Type      | Default | Description                       |
| --------- | --------- | ------- | --------------------------------- |
| `british` | `boolean` | `false` | Use British English pronunciation |

#### Methods

| Method                         | Returns           | Description                                 |
| ------------------------------ | ----------------- | ------------------------------------------- |
| `phonemize(text: string)`      | `string`          | Convert text to IPA phonemes synchronously  |
| `phonemizeAsync(text: string)` | `Promise<string>` | Convert text to IPA phonemes asynchronously |

## Limitations

| Constraint | Reason |
| ---------- | ------ |
| **iOS 18.0+ only** | MisakiSwift requires iOS 18 APIs |
| **Physical device only** | MLX framework does not run on iOS Simulator |
| **No Android support** | MisakiSwift is a Swift-only library with no Android equivalent |

## Troubleshooting

### App crashes on simulator

This library does not support the iOS Simulator. MLX, which powers MisakiSwift, requires Apple Silicon and does not run in the simulated environment. You must use a physical iOS device.

### Build fails with deployment target error

**Bare React Native:**

Ensure your `Podfile` specifies iOS 18.0:

```ruby
platform :ios, '18.0'
```

Then run `pod install` again.

**Expo:**

Ensure `expo-build-properties` is configured in your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "18.0",
            "useFrameworks": "dynamic"
          }
        }
      ]
    ]
  }
}
```

Then regenerate the native project:

```sh
npx expo prebuild --platform ios --clean
```

### "Expo Go" is not supported

This library includes native code and requires a development build. Expo Go cannot load native modules. Use:

```sh
npx expo run:ios --device
```

### Code signing error

If you encounter code signing issues during development:

```bash
# Bare React Native
npx react-native run-ios -- CODE_SIGNING_ALLOWED=NO

# Expo
npx expo run:ios --device -- CODE_SIGNING_ALLOWED=NO
```

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for more details.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
