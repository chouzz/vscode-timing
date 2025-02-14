# Changelog
All notable changes to the "timing" extension will be documented in this file. This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.7.1...master)

## 2022-04-11 - [v2.7.1](https://github.com/HaaLeo/vscode-timing/tree/v2.7.1)

### Security
* Updated the extension's dependencies.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.7.0...v2.7.1)

## 2021-12-17 - [v2.7.0](https://github.com/HaaLeo/vscode-timing/tree/v2.7.0)

### Added
* Support for negative timestamps ([#59](https://github.com/HaaLeo/vscode-timing/issues/59)).

### Fixed
* A bug which caused wrong time conversion in the timestamp hover provider ([#60](https://github.com/HaaLeo/vscode-timing/issues/60)).

### Security
* Updated the extension's dependencies.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.6.0...v2.7.0)

## 2021-05-14 - [v2.6.0](https://github.com/HaaLeo/vscode-timing/tree/v2.6.0)
### Added
* A new command `timing.epochToGps` to convert an unix epoch timestamp to [GPS epoch](https://gis.stackexchange.com/questions/281223/what-is-gps-epoch). Thx [@osechet](https://github.com/osechet) for your contribution.

### Security
* Updated the extension's dependencies.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.5.1...v2.6.0)

## 2020-06-16 - [v2.5.1](https://github.com/HaaLeo/vscode-timing/tree/v2.5.1)
### Added
* the extension to the [Open VSX Registry](https://open-vsx.org/extension/HaaLeo/timing).

### Security
* Updated the extension's dependencies.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.5.0...v2.5.1)

## 2020-04-21 - [v2.5.0](https://github.com/HaaLeo/vscode-timing/tree/v2.5.0)

### Added
* support for microsecond conversion ([#43](https://github.com/HaaLeo/vscode-timing/issues/43)).  
  However, if you prefer to stick with the old conversion behavior, just add the following to your `settings.json`:  
  ```json
  {
      "timing.epochConversionBoundaries": {
          "seconds": {
              "min": 1,
              "max": 11
          },
          "milliseconds": {
              "min": 12,
              "max": 14
          },
          "nanoseconds": {
              "min": 15,
              "max": 21
          },
          "microseconds": {
              "min": 0,
              "max": 0
          }
      }
  }
  ```
* the `timing.epochConversionBoundaries` setting to distinguish when to consider an epoch timestamp's unit as "seconds", "milliseconds", "microseconds" or "nanoseconds".

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.4.1...v2.5.0)

## 2020-04-21 - [v2.4.1](https://github.com/HaaLeo/vscode-timing/tree/v2.4.1)

### Fixed
* a bug that marked the `timing.hiddenCommands` settings invalid when the `timing.epochToCustomTimezone` command was added.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.4.0...v2.4.1)

## 2020-04-20 - [v2.4.0](https://github.com/HaaLeo/vscode-timing/tree/v2.4.0)
### DEPRECATED
* the `localize` option for advanced `timing.hoverTimestamp.targetFormat`s. Use the new `timezone` option instead.

### Added
* `timezone` option for advanced `timing.hoverTimestamp.targetFormat`s to enable custom timezone support ([#41](https://github.com/HaaLeo/vscode-timing/issues/41)).
* `timing.epochToIsoTimezone` command to enable ISO time conversion including a custom timezone.
* `timing.epochToCustomTimezone` command to enable custom time conversion including a custom timezone.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.3.1...v2.4.0)

## 2020-03-23 - [v2.3.1](https://github.com/HaaLeo/vscode-timing/tree/v2.3.1)

### Fixed
* a bug that caused the `timing.nowAsIsoUtc` command to be never shown in the command palette.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.3.0...v2.3.1)

## 2019-12-22 - [v2.3.0](https://github.com/HaaLeo/vscode-timing/tree/v2.3.0)
### DEPRECATED
* the string type of the `timing.hiddenCommands`.

### Changed
* the `timing.hiddenCommands` setting. It now accepts an array of command IDs.
* insert icon to the corresponding [microsoft/vscode-icons](https://github.com/microsoft/vscode-icons) icon.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.2.0...v2.3.0)

## 2019-05-16 - [v2.2.0](https://github.com/HaaLeo/vscode-timing/tree/v2.2.0)
### Added
* support for [remote development](https://code.visualstudio.com/docs/remote/remote-overview) by explicitly forcing the extension to be a UI extension.
* test results. Test results are now published to azure pipelines.

### Changed
* code coverage. Coverage reports are now published to azure pipelines.

### Fixed
* a bug in the `timing.epochToIsoUtc` that treated its input, no matter how long it was, as milliseconds. This caused the extension to fail when inserting nanoseconds.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.1.0...v2.2.0)

## 2019-04-22 - [v2.1.0](https://github.com/HaaLeo/vscode-timing/tree/v2.1.0)
### Changed
* `timing.hoverTimestamp.targetFormat` setting. It now supports an array of multiple formats, too.  
  In the array you can additionally express custom formats as objects for advanced configuration. ([#30](https://github.com/HaaLeo/vscode-timing/issues/30))
* CI/CD provider. Moved the project to azure pipelines.
### Added
* webpack for bundling the extension. Now the extension ships with 11 files instead of 383 and will load much faster.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v2.0.0...v2.1.0)

## 2019-03-16 - [v2.0.0](https://github.com/HaaLeo/vscode-timing/tree/v2.0.0)
### BREAKING CHANGES
* The extension now requires minimum VS Code version **1.30.0**
* Removed setting `timing.hoverTargetFormat`

### Added
* setting `timing.clipboard.readingEnabled` to indicate whether the extension should try to get the input time from the clipboard instead of asking the user for input.
* setting `timing.clipboard.writingEnabled` to indicate whether the result of the conversion is written to the clipboard. When enabled, no result view is shown.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.4.1...v2.0.0)

## 2019-03-08 - [v1.4.1](https://github.com/HaaLeo/vscode-timing/tree/v1.4.1)
### Security
* Updated dependencies to fix security vulnerability in `extend`.

### Fixed
* a bug that prevented long epoch times (nanoseconds) being accepted as input for commands.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.4.0...v1.4.1)

## 2019-02-05 - [v1.4.0](https://github.com/HaaLeo/vscode-timing/tree/v1.4.0)
### Added
* `timing.customToCustom` command to convert a custom time to another custom format ([#20](https://github.com/HaaLeo/vscode-timing/issues/20)).
* _optional arguments_ to reduce the required insertions during a conversion ([#21](https://github.com/HaaLeo/vscode-timing/issues/21)). Speeds up command usage if parameter do not change often.
* setting `timing.hiddenCommands` to indicate which commands shall be hidden from the command palette ([#23](https://github.com/HaaLeo/vscode-timing/issues/23)).

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.3.0...v1.4.0)

### Changed
* behavior of the result view: The result view is only shown when the converted time was _not inserted_ automatically ([#22](https://github.com/HaaLeo/vscode-timing/issues/22)).

## 2019-01-28 - [v1.3.0](https://github.com/HaaLeo/vscode-timing/tree/v1.3.0)
### Added
* _weeks_ to the readable duration conversion.
* `timing.isoDurationToEpoch` command to convert an ISO 8601 duration to an epoch timestamp.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.2.1...v1.3.0)

## 2019-01-22 - [v1.2.1](https://github.com/HaaLeo/vscode-timing/tree/v1.2.1)
### Fixed
* links in readme for vscode marketplace.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.2.0...v1.2.1)

## 2019-01-22 - [v1.2.0](https://github.com/HaaLeo/vscode-timing/tree/v1.2.0)
### DEPRECATED
* the `timing.hoverTargetFormat` setting. Use the `timing.hoverTimestamp.*` settings instead.

### Added
* Settings:
  * `timing.hoverTimestamp.targetFormat`: Indicates the target format of the hover preview. It can be either "utc", "local" or a custom format.
  * `timing.hoverTimestamp.enabled`: Controls whether the timestamp hover is enabled or disabled.
  * `timing.hoverDuration.sourceUnit`: Indicates the source epoch unit for the duration hover preview. It can be either "s", "ms" or "ns".
  * `timing.hoverDuration.enabled`: Controls whether the duration hover is enabled or disabled.
  * `timing.hoverDuration.useISOTargetFormat`: Indicates whether the ISO 8601 duration definition is used as target format.
* Commands:
  * `timing.epochToIsoDuration`: Convert an epoch time to an ISO 8601 duration.
  * `timing.epochToReadableDuration`: Convert an epoch time to an human readable duration.
* Hover Provider:
  * Shows the duration, when the mouse is hovered over an epoch time.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.1.2...v1.2.0)

## 2018-11-08 - [v1.1.2](https://github.com/HaaLeo/vscode-timing/tree/v1.1.2)
### Fixed
* changelog

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.1.1...v1.1.2)

## 2018-11-08 - [v1.1.1](https://github.com/HaaLeo/vscode-timing/tree/v1.1.1)
### Fixed
* [#16](https://github.com/HaaLeo/vscode-timing/issues/16): The custom format options of the quick pick step were not updated, after the command was invoked once.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.1.0...v1.1.1)

## 2018-09-13 - [v1.1.0](https://github.com/HaaLeo/vscode-timing/tree/v1.1.0)
### Added
* setting `timing.hoverTargetFormat` that indicates the target format of the hover preview ([#14](https://github.com/HaaLeo/vscode-timing/issues/14)). Possible values are:
  * `utc`: Show the hover preview in ISO 8601 UTC time. This is the default value.
  * `local`: Show the hover preview in ISO 8601 Local time.
  * `disable`: No hover preview is shown.
  * A custom [momentjs format](https://momentjs.com/docs/#/displaying/format/): For instance `LLLL`.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v1.0.0...v1.1.0)

## 2018-09-06 - [v1.0.0](https://github.com/HaaLeo/vscode-timing/tree/v1.0.0)
### BREAKING CHANGES
* The extension now requires minimum VS Code version **1.26.0**
* Removed command `timing.convertTime`

### Added
* a feature that allows to navigate back during a command. Either press the back button located in the top left corner of a step or press the hotkey <kbd>Alt</kbd> + <kbd>&larr;</kbd>
* a title bar that shows permanently which command was invoked, the current step's number and the total step count.
* setting `timing.ignoreFocusOut` (default: `true`) that indicates whether the input box should remain visible when it loses focus.
* setting `timing.hideResultViewOnEnter` (default: `true`) that indicates whether the result view should be hidden when <kbd>Enter</kbd> was pressed or whether the command shall restart again.
* a button to the result view that replaces the current selection in the editor with the result when it is clicked.

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.5.0...v1.0.0)

## 2018-07-11 - [v0.5.0](https://github.com/HaaLeo/vscode-timing/tree/v0.5.0)
### Added
* setting `timing.insertConvertedTime` that indicates whether the current selection is replaced with the converted time
* command `timing.toggleInsertConvertedTimeUserLevel` to toggle the `timing.insertConvertedTime` setting on user level

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.4.2...v0.5.0)

## 2018-06-23 - [v0.4.2](https://github.com/HaaLeo/vscode-timing/tree/v0.4.2)
### Fixed
* layout of Readme for vscode's extension explorer ([Microsoft/vscode#51859](https://github.com/Microsoft/vscode/issues/51859)).

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.4.1...v0.4.2)

## 2018-06-13 - [v0.4.1](https://github.com/HaaLeo/vscode-timing/tree/v0.4.1)
### Fixed
* layout of the Readme and Changelog

### Added
* support for [code coverage](https://codecov.io/gh/HaaLeo/vscode-timing)

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.4.0...v0.4.1)

## 2018-06-12 - [v0.4.0](https://github.com/HaaLeo/vscode-timing/tree/v0.4.0)
### Added
* commands that enable conversion from/to custom formats:
  * `timing.epochToCustom`: Converts an epoch time to a custom format
  * `timing.isoRfcToCustom`: Converts an ISO 8601 or RFC 2283 to a custom format
  * `timing.nowAsCustom`: Gets the current time in a custom format
  * `timing.customToEpoch`: Converts a custom time to epoch format (s, ms, ns)
  * `timing.customToIsoLocal`: Converts a custom time to ISO 8601 local format
  * `timing.customToIsoUtc`: Converts a custom time to ISO 8601 UTC format
* settings `timing.customFormats` to specify custom formats in the `settings.json`
### Changed
* command description: Simplified the command description
* display name on the marketplace from *Timing* to *Time Converter*

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.3.0...v0.4.0)

## 2018-06-05 - [v0.3.0](https://github.com/HaaLeo/vscode-timing/tree/v0.3.0)
### Added
* command `timing.nowAsIsoUtc` to get current time as ISO 8601 UTC format
* command `timing.nowAsIsoLocal` to get current time as ISO 8601 Local format
* command `timing.nowAsEpoch` to get current time as epoch format

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.2.1...v0.3.0)

## 2018-06-04 - [v0.2.1](https://github.com/HaaLeo/vscode-timing/tree/v0.2.1)
### Fixed
* a bug that prevented the `timing.epochToIso*` commands from accepting nanoseconds for conversion

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.2.0...v0.2.1)

## 2018-06-04 - [v0.2.0](https://github.com/HaaLeo/vscode-timing/tree/v0.2.0)
### DEPRECATED
* command `timing.convertTime` in favor for the `timing.epochToIsoUtc` command

### Added
* command `timing.epochToIsoUtc` to convert an epoch time to ISO 8601 *utc* format
* command `timing.epochToIsoLocal` to convert an epoch time to ISO 8601 *local* format
* command `timing.isoRfcToEpoch` to convert an ISO 8601 or RFC2282 formatted time to an epoch time. Further the user can select the target unit of the epoch time: **seconds**, **milliseconds** or **nanoseconds**

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.1.2...v0.2.0)

## 2018-05-29 - [v0.1.2](https://github.com/HaaLeo/vscode-timing/tree/v0.1.2)
### Fixed
* a bug that prevented the extension of running on linux systems

### Added
* Travis CI build stage

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.1.1...v0.1.2)

## 2018-05-28 - [v0.1.1](https://github.com/HaaLeo/vscode-timing/tree/v0.1.1)
### Fixed
* layout of table in the readme

### Changed
* gif animations

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.1.0...v0.1.1)

## 2018-05-28 - [v0.1.0](https://github.com/HaaLeo/vscode-timing/tree/v0.1.0)
### Added
* a feature that shows the converted time, when the mouse hovers over a number
* a feature that the time conversion is directly applied if the user selected a number earlier

### Changed
* the extension's icon

[All Changes](https://github.com/HaaLeo/vscode-timing/compare/v0.0.1...v0.1.0)

## 2018-05-27 - [v0.0.1](https://github.com/HaaLeo/vscode-timing/tree/v0.0.1)

**Initial Release**

### Added
* a feature that enables time epoch to UTC conversion using the command palette
