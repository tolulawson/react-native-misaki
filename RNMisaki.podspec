require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNMisaki"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => '18.0' }
  s.source       = { :git => "https://github.com/tolulawson/react-native-misaki.git", :tag => "#{s.version}" }

  s.source_files = [
    "ios/**/*.{swift}",
    "ios/**/*.{m,mm}",
    "cpp/**/*.{hpp,cpp}",
  ]

  s.dependency 'React-jsi'
  s.dependency 'React-callinvoker'

  # Add MisakiSwift SPM dependency
  spm_dependency(s,
    url: 'https://github.com/mlalma/MisakiSwift.git',
    requirement: {kind: 'upToNextMajorVersion', minimumVersion: '1.0.1'},
    products: ['MisakiSwift']
  )

  load 'nitrogen/generated/ios/RNMisaki+autolinking.rb'
  add_nitrogen_files(s)

  install_modules_dependencies(s)
end
