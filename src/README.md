# Youtube-dl-gui  ![Logo](https://raw.githubusercontent.com/puranjayjain/youtube-dl-gui/master/src/assets/icon36.png)

[![Join the chat at https://gitter.im/puranjayjain/Youtube-dl-gui](https://badges.gitter.im/puranjayjain/Youtube-dl-gui.svg)](https://gitter.im/puranjayjain/Youtube-dl-gui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Cross Platform GUI Client for [youtube-dl](http://rg3.github.io/youtube-dl/) written in react, electron and material ui.

#Requirements
Currently supports Windows only. Need collaborators for other platforms (Building and Testing).

#Installation
Released Developer build please test it.
  ##Steps:
  1. Make sure you have the latest version of node.js(6.xx), python (2.xx)
  2. Now clone the repository or download the latest release
  3. From the root of the repository, run `npm i`
  4. Use the `run nw app.bat`
  5. Start Testing!

# Features
 - [x] Drop links to start downloading
 - [x] Supports all sites that youtube-dl does [see](https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md)

## Configurable
Most of these features match the ones found [here](https://github.com/rg3/youtube-dl/blob/master/README.md#options)

If you think a feature is missing or needs improvement please file a new issue or +1 an existing one [here](https://github.com/puranjayjain/Youtube-dl-gui/issues)

### Download Options:
- [ ] rate-limit
- [ ] retries

### Filesystem Options:
- [x] default download directory

### Authentication Options:
- [x] username
- [x] password

### Workarounds:
- [x] encoding
- [x] no-check-certificate
- [x] prefer-insecure
- [x] user-agent
- [x] referer
- [x] add-header

### Our options (these are found in our app exclusively)
- [x] Dark theme support

# Dependencies

None, All dependencies will auto install with the app now as far as possible.

# Faqs

1. What all websites does it support?

  > See [https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md](https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md)

2. Motive behind it

  > To learn React, Event Emitters, Material UI and Electron

## Versioning

For transparency into our release cycle and in striving to maintain backward
compatibility, the project is maintained under
[the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up,
but we'll adhere to those rules whenever possible.

# License
The Project is Licensed under the [MIT License](https://github.com/puranjayjain/Youtube-dl-gui/blob/master/LICENSE)

All other Licensed are found in the Third Party Licenses Folder
