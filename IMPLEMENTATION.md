# Implementation Summary

react-native-misaki provides React Native bindings for [MisakiSwift](https://github.com/mlalma/MisakiSwift), a Swift G2P (grapheme-to-phoneme) library for converting English text to IPA phonemes.

## Requirements

- **iOS 18.0+** (required by MisakiSwift)
- **React Native 0.75+** (for SPM dependency support)
- **Dynamic frameworks** (`use_frameworks! :linkage => :dynamic` in Podfile)

## Architecture

### Project Structure

```
react-native-misaki/
├── src/
│   ├── specs/
│   │   └── RNMisaki.nitro.ts    # Nitro spec defining HybridObject interface
│   └── index.ts                  # TypeScript wrapper class
├── ios/
│   └── HybridRNMisaki.swift     # Swift implementation wrapping MisakiSwift
├── nitrogen/
│   └── generated/               # Auto-generated Nitro bridging code
├── nitro.json                   # Nitro configuration
└── RNMisaki.podspec             # iOS CocoaPods specification with SPM dependency
```

### API Design

```typescript
interface EnglishG2POptions {
  british?: boolean; // Use British English (default: false for American)
}

class EnglishG2P {
  constructor(options?: EnglishG2POptions);

  // Convert text to IPA phonemes synchronously
  phonemize(text: string): string;

  // Convert text to IPA phonemes asynchronously
  phonemizeAsync(text: string): Promise<string>;
}
```

### Usage Example

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

## Key Implementation Details

### SPM Dependency Integration

MisakiSwift is distributed as a Swift Package Manager (SPM) package. We use React Native's `spm_dependency` helper (available since RN 0.75) to integrate it with CocoaPods:

```ruby
# RNMisaki.podspec
spm_dependency(s,
  url: 'https://github.com/mlalma/MisakiSwift.git',
  requirement: {kind: 'upToNextMajorVersion', minimumVersion: '1.0.1'},
  products: ['MisakiSwift']
)
```

### Nitro Modules

The library uses [Nitro Modules](https://nitro.margelo.com) for zero-overhead JSI bindings between JavaScript and Swift:

- **HybridObject**: `RNMisaki` is defined as a Nitro HybridObject
- **Autolinking**: Nitrogen generates bridging code automatically
- **Type Safety**: Full type generation from TypeScript spec

### Swift Implementation

The Swift implementation (`HybridRNMisaki.swift`):

1. Lazily initializes MisakiSwift's `EnglishG2P` based on the `british` property
2. Re-creates the G2P instance if the `british` flag changes
3. Wraps synchronous calls in async dispatch for `phonemizeAsync`

```swift
class HybridRNMisaki: HybridRNMisakiSpec {
    var british: Bool = false {
        didSet {
            if oldValue != british {
                _g2p = nil  // Reset to use new dialect
            }
        }
    }

    private var g2p: EnglishG2P {
        if _g2p == nil {
            _g2p = EnglishG2P(british: british)
        }
        return _g2p!
    }

    func phonemize(text: String) throws -> String {
        let (phonemes, _) = g2p.phonemize(text: text)
        return phonemes
    }
}
```

## Installation

### For App Developers

1. Install the package:

   ```bash
   npm install react-native-misaki react-native-nitro-modules
   ```

2. Ensure your Podfile uses dynamic frameworks:

   ```ruby
   use_frameworks! :linkage => :dynamic
   ```

3. Install pods:
   ```bash
   cd ios && pod install
   ```

### For Expo Users

1. Install the package:

   ```bash
   npx expo install react-native-misaki react-native-nitro-modules
   ```

2. Prebuild:
   ```bash
   npx expo prebuild
   ```

## Known Issues

### Code Signing Error for Simulator Builds

MisakiSwift includes resource bundles (model weights, dictionaries) that Xcode tries to code sign. On simulator builds, this can fail with:

```
Command CodeSign failed with a nonzero exit code
bundle format unrecognized, invalid, or unsuitable
```

**Workaround**: Build with code signing disabled for simulator:

```bash
# Command line build
xcodebuild -workspace YourApp.xcworkspace \
  -scheme YourApp \
  -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  CODE_SIGNING_ALLOWED=NO \
  build
```

Or in Xcode:

1. Select the main app target
2. Go to Build Settings
3. Add `CODE_SIGNING_ALLOWED = NO` for Debug configuration with `[sdk=iphonesimulator*]` condition

This issue is specific to SPM packages with resource bundles and does not affect device builds.

## Limitations

1. **iOS Only**: Currently supports iOS 18.0+ only (MisakiSwift requirement)
2. **No Android Support**: MisakiSwift is a Swift/Apple-only library
3. **Dynamic Frameworks Required**: SPM integration requires dynamic linking

## Dependencies

- [MisakiSwift](https://github.com/mlalma/MisakiSwift) - Swift G2P library
- [react-native-nitro-modules](https://nitro.margelo.com) - Zero-overhead JSI bindings
- [MLX](https://github.com/ml-explore/mlx-swift) - Apple's ML framework (transitive via MisakiSwift)
