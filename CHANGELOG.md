# [1.0.0](https://github.com/tolulawson/react-native-misaki/compare/v0.4.0...v1.0.0) (2025-12-31)


### Features

* switch to static MisakiSwift fork for simpler installation ([b4e3aa0](https://github.com/tolulawson/react-native-misaki/commit/b4e3aa0755572f2d99aa713c003b14e8f4bcffa9))


### BREAKING CHANGES

* Now uses tolulawson/MisakiSwift fork with static library support

Changes:
- Use forked MisakiSwift with static library type (no dynamic frameworks required)
- Remove use_frameworks! :linkage => :dynamic requirement from Podfile
- Update README with simplified installation instructions
- Update example app to use static linking

This eliminates the need for consuming apps to add use_frameworks! :linkage => :dynamic
to their Podfile, making installation much simpler and avoiding potential conflicts with
other pods that don't support dynamic frameworks.



# [0.4.0](https://github.com/tolulawson/react-native-misaki/compare/v0.2.0...v0.4.0) (2025-12-31)


### Bug Fixes

* ensure npm publish uses correct version with OIDC provenance ([4622dbd](https://github.com/tolulawson/react-native-misaki/commit/4622dbdd922de94012567f72b0cd3c5faedac0bd))
* install npm 11+ for OIDC trusted publishing ([ab8c073](https://github.com/tolulawson/react-native-misaki/commit/ab8c073dad68478281cd4588d7c1194a5063f440))
* make release atomic with rollback on npm publish failure ([2318c57](https://github.com/tolulawson/react-native-misaki/commit/2318c575391809ce21b79ce0685ed206ef47a3cc))
* reorder release workflow to publish npm before GitHub release ([676b023](https://github.com/tolulawson/react-native-misaki/commit/676b02379c2d80b19238760a954715d85a59fbab))
* use npm version and conventional-changelog for version bump ([57592ca](https://github.com/tolulawson/react-native-misaki/commit/57592cace89892dfd197237861e2d0338048c43b))


### Features

* update RNMisaki to version 0.2.0 with enhanced phonemization features ([987cd29](https://github.com/tolulawson/react-native-misaki/commit/987cd29dbf356d524361f406719ddfd36126be3f))



# Changelog

## [0.3.1](https://github.com/tolulawson/react-native-misaki/compare/v0.3.0...v0.3.1) (2025-12-31)


### Bug Fixes

* ensure npm publish uses correct version with OIDC provenance ([4622dbd](https://github.com/tolulawson/react-native-misaki/commit/4622dbdd922de94012567f72b0cd3c5faedac0bd))

# [0.3.0](https://github.com/tolulawson/react-native-misaki/compare/v0.2.0...v0.3.0) (2025-12-31)


### Features

* update RNMisaki to version 0.2.0 with enhanced phonemization features ([987cd29](https://github.com/tolulawson/react-native-misaki/commit/987cd29dbf356d524361f406719ddfd36126be3f))

# 0.2.0 (2025-12-30)


### Features

* add MisakiSwift bindings for English G2P with sync/async phonemization and British support ([833e7f9](https://github.com/tolulawson/react-native-misaki/commit/833e7f96b253a3ca75912b31d50021411b176bfe))
