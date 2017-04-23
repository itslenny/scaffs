# Scaffs

[![Npm Version](https://img.shields.io/npm/v/scaffs.svg?style=flat)](https://www.npmjs.com/package/scaffs)
[![Npm Downloads](https://img.shields.io/npm/dm/scaffs.svg?style=flat)](https://www.npmjs.com/package/scaffs)
[![Build Status](https://travis-ci.org/itslenny/scaffs.svg?branch=master)](https://travis-ci.org/itslenny/scaffs)
[![Build status](https://ci.appveyor.com/api/projects/status/olwnfccy11bt7a0i?svg=true)](https://ci.appveyor.com/project/itslenny/scaffs)


There will be more docs soon iPromise™

## Install

```
npm i -g scaffs
```

## Command line usage

### Help screen

```
scaffs help
```

### Scaffold - basic

Simply running the new command with a scaffold name will prompt you for any variables defined by the scaffold (e.g name, target path, etc) then it will generate files based on the scaffold

```
scaffs new ScaffoldName
```

### Scaffold - providing data with flags

You can bypass the prompts by simply providing all the needed data in flags.

* `--target` = the path where you want to place the generated files
* `--data.name` = by convention this is the name of the component
* `--data.otherValue` = other value(s) you need to pass into the template

```
scaffs new ScaffoldName --target /create/at/this/path --data.name my thing --data.someNumbers=[1,3,5,7,9]
```

### Scaffold - by absolute path

You can load scaffolds by name (explained above) or by providing a relative path to the scaffold with the `--source` flag.

```
scaffs new --source ./my/scaffold/lives/here
```

> This can be used in conjunction with any of the flags explained above


## Project config (.scaffs-config.json)

To load scaffolds by name (see basic usage above) you need to tell scaffs where to find the scaffold. This is achieved by creating a `.scaffs-config.json` in the root of your project (where you plan to run the `scaffs` command).

The scaffs config currently has to fields:

* `scaffsPaths` (array) - list of folders to search for scaffolds. It is assumed that this folder contains a folder for each scaffold you want access to. The folder name is the scaffold name (`scaffs new FolderName`)
* `scaffs` (object/map) - allows including individual scaffolds. The key of the object is used as the scaffold name so you can also use this to create package aliases

**Config Example**

```json
{
    "scaffsPaths": [
        "./my/scaffolds/live/here",
        "node_modules/@scaffs/someScaffold"
    ],
    "scaffs": {
        "ExampleAlias": "./scaffolds/Example"
    }
}
```

## Programmatic usage

docs comming...

## Creating Scaffolds

...yeah, this will come at some point.

## Plugins

* soon!

## Contributing

* [Contributing to Scaffs](CONTRIBUTING.md)
* Contributing a Scaff

## TODO

* Add list comment (list available scaffolds)
* Add comments
* Add more tests
* Break up documentation into separate pages
* Add more examples / animated gifs
* Create scaff scaff
* Create test-project scaff
* Split scaffs-cli / scaffs (lib)
* Refactor to Async/Await