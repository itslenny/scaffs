# Change Log

## 0.5.0 - BREAKING CHANGE

* Remove `header` (singular) from scaffs-config
* Add `headers` to scaffs-config to allow different headers based on glob matchers
* Minor version bump because no one is using this package yet

## 0.4.0

* Automatic discovery of registry scaffs (@scaffs)
* Made .scaffs-config.json optional
* Added markdown server for docs when developing

## 0.3.x

* 0.3.2
    * only allow directories as scaffs (aka package.json is not a scaff)
* 0.3.1
    * fix publishing without the js files
    * add pre-publish hook
* 0.3.0
    * Enable `indention` field in scaffs-config (override template's indention)
    * Move CLI to seprate repo / package

## 0.2.0
    * Code refactor to decouple cli and library

## 0.1.0
    * Enable `header` field in scaffs-config (text prepended to every file)

## 0.0.2 - 0.0.7

* Minor bug fixes

## 0.0.1

* Initial release