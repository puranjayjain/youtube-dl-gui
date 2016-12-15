# Youtube-dl-gui  ![Logo](https://github.com/puranjayjain/youtube-dl-gui/raw/master/src/images/favicon-32x32.png)

# Discussions
Using github issues for now.

A Cross Platform GUI Client for [youtube-dl](http://rg3.github.io/youtube-dl/) written in nwjs + polymer + IndexedDB + awesome sauce

#Requirements
Supports Windows and Linux, not sure for Mac though. 

Need collaborators and testers for all platforms (Building and Testing).

#Installation
Released Developer build please test it.
  ##Steps:
  1. Make sure you have the latest version of node.js(7.xx), npm (4.xx), bower and python (2.xx)
  2. Now clone the repository or download the latest release
  3. Download a copy of nwjs (sdk build) from [https://nwjs.io/](https://nwjs.io/)
  4. Extract it in a directory and set that folder into your environment path
  5. In the src folder of the repository, run `npm i` then run `bower i`
  6. Use the `run nw app.bat`
  7. Happy Testing!

Or use chocolatey:
```
Coming soon
```

# Features
 - [x] Drag and Drop valid urls/links to start downloading
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
- [x] referrer
- [x] add-header

### Our options (these are app exclusive)
- [x] Dark theme support
- [x] Full contrast mode

# Dependencies

* On Windows platform youtube-dl requires [Microsoft Visual C++ 2010 Redistributable Package (x86)](https://www.microsoft.com/en-US/download/details.aspx?id=5555) installed see 

* On linux platform(s) youtube-dl requires python installed see

See link to know more: [here](http://rg3.github.io/youtube-dl/download.html)

# Faqs

1. What all websites does it support?

  > See [https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md](https://github.com/rg3/youtube-dl/blob/master/docs/supportedsites.md)

2. Motive behind it

  > To learn React, Event Emitters, Material UI, Electron, Nwjs, Polymer, Nodejs, IndexedDB and grandma's secret sauce.

## Versioning

For transparency into our release cycle and in striving to maintain backward
compatibility, the project is maintained under
[the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up,
but we'll adhere to those rules whenever possible.

# License
The Project is Licensed under the [MIT License](https://github.com/puranjayjain/Youtube-dl-gui/blob/master/LICENSE)

All other License(s) are found in the Third Party Licenses Folder
