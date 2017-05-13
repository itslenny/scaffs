# Creating .scaffs-config.json

Creating a `.scaffs-config.json` in the root of your project allows you to define various settings that the scaffs-cli and scaffs vs code plugin will use.

## Scaffs location

Scaff locations can be specified in two ways

### scaffsPaths

This is used to specify a folder containing multiple scaffs. You can specify multiple paths and all sub-folders will be listed.

```
{
    ...

    "scaffsPaths": [
        "./some/path/to/my/scaffolds",
        "./path/to/some/additional/scaffolds"
    ]

    ...
}
```

> Sub-folders starting with a `.` are ignored.

### scaffs

This is used to add specific paths. It can be used for adding a single scaff or for creating an alias for a scaff that is already loaded via `scaffsPaths` or `scaffs`.

```
{
    ...

    "scaffs": {
        "ExampleAlias": "./some/path/to/my/scaffolds/a scaffold",
        "Example Single Scaffold": "~/some/path/My Scaffold"
    }

    ,,,
}
```

## Adding file headers

If you create your own scaffs it's advisable to add the headers directly in the templates. If you're using a 3rd party scaff (including those from @scaffs registry) scaffs can add a header to the generated files.


```
{
    ...
    
    "headers": {
        "*.html": "<!-- Copyright blah, blah blah -->\n<!-- Blah blah reserved -->\n\n",
        "*.{ts,js,scss}": "\/\/ Copyright blah, blah blah\n\/\/ Blah blah reserved\n\n"
    }

    ...
}
```

> The object key is a file glob so you can specify different headers for different file types.

## Override indention

Tabs suck!! 4 space 4 lyfe!! 2 space or die!!

To make it easier to use 3rd party scaffs you can override the indention of any scaff. Simply specify the indention characters you want, and if a scaff is using a different indention it will be changed to your preferred style

**Spaces**

```
{
    ...


    "indention": "    "

    ...
}
```

**Tabs**

```
{
    ...


    "indention": "\t"

    ...
}
```

> This will only work if the scaff is using consistent spacing. Scaffs will auto-detect the template's indention and simply replace the indention characters with whatever you specify.

## Additional resources

* [Scaffs library / programmatic usage](https://github.com/itslenny/scaffs) | [npm](https://www.npmjs.com/package/scaffs)
* [Scaffs cli / command line usage](https://github.com/itslenny/scaffs-cli) | [npm](https://www.npmjs.com/package/scaffs-cli)
* [Scaffs vs code plugin](https://github.com/itslenny/scaffs-vscode) | [vs code install]
* [@scaffs registry](https://github.com/itslenny/scaffs-registry) | [npm](https://www.npmjs.com/~scaffs)
* [Using scaffs config](https://github.com/itslenny/scaffs/tree/master/docs/config.md)
* [Creating scaffs](https://github.com/itslenny/scaffs/tree/master/docs/create.md)
