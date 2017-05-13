# Creating scaffs

Using 3rd party scaffs is awesome, and @scaffs is even more awesomer, but the most awesomest way to use scaffs is to create your own scaffs.

## Base folder

Each scaff have it's own folder. You can put many scaffs in the same folder and set which folder contains your scaffs in your `.scaffs-config.json`.

The base folder of the scaffs should contain a `.scaffold.json` file and templates for all of the files / folders you want to create.

## Creating a .scaffs-config.json

The `.scaffs-config` is used to specify the meta data for your scaffold. Currently it is just used to specify the template variables. The user will be prompted for all variables specified.

### Template variables

**Simple**

You can simply add the string of the variable name in the variables array. The user will see the variable name as the prompt and you can access the value in your templates using the same name.

```
{
    "variables": [
        "name",
        "rank",
        "serialNumber"
    ]
}
```

**Advanced**

If you want more control over the variable input you can also add objects to the variables array.

```
{
    "variables": [
        "aSimpleOne",
        {
            "prompt": "Enter a value the advanced one (string)",
            "name": "anAdvancedOne",
            "optional": true
        }
    ]
}
```

## Folders

If you want your template to contain a folder. Create a folder inside of the base folder. Scaffs will traverse your entire folder structure so you can nest as many folders as you want.

**Static**

Simply name the folder and a folder by that same name will be generated for the user.

```
MyScaffold
-- FolderToCreate
---- SubFolderToCreate
```

**Dynamic**

You can also use templating in your folder names using two underscores (`__`) as a delimiter.

```
__variableOne__-__variableTwo__.something
```

Assuming `variableOne="hello"` and `variableTwo="world"` this would create a folder named `hello-world.something`

The folder name also supports the entire [templating api](#templating-api).

## Files

You can name your files whatever you would like exactly like you do for folders

**Static**

Simply name the file and a file by that same name will be generated for the user.

```
MyScaffold
-- FolderToCreate
---- FileToCreate.js
```

**Dynamic**

You can also use templating in your folder names using two underscores (`__`) as a delimiter.

```
__variableOne__-__variableTwo__.something.js
```

Assuming `variableOne="hello"` and `variableTwo="world"` this would create a file named `hello-world.something.js`

The file names also support the entire [templating api](#templating-api).

## Templating API

Inside of the template files scaffs is powered by [lodash.template](https://lodash.com/docs/4.17.4#template) which uses `<% %>` as delimiters. If you want to insert a value use an equal like this: `<%= value %>` 

All variables specified in the `.scaffold.json` ([explained above](Template variables)) are available in the template.

### String manipulation

The strings in the lodash are just like any other javascript string so you can use all of the standard [string prototype functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype).

Additionally, scaffs extends the string prototype to include these useful utilities:

| method | usage | example input | example output |
|---|---|---|
toCamelCase | variable.toCamelCase() | some value here | someValueHere |
toProperCase | variable.toProperCase() | some value here | SomeValueHere |
toPascalCase | variable.toPascalCase() | some value here | SomeValueHere |
toKebabCase | variable.toKebabCase() | some value here | some-value-here |
toSnakeCase | variable.toSnakeCase() | some value here | some\_value\_here |

### Objects

Scaffs will also try to parse variables input as json. The user can input any valid json object (`{ ... }`) or array (`[ ... ]`). If the input is "json-like" scaffs will try to parse the input. If it fails it will simply pass the string value.

**Prompt**

```
> enter some numbers: [2,4,6,7]
(variable=numbers)
```

**Template**

```
<%= a.filter(n => !(n % 2)).join('-') %>
(outputs: "2-4-6")
```

### Lodash

The full lodash library is also available in the templates.

```
> enter some numbers: [2,4,6,7,2,2,4,4,6]
(variable=numbers)
```

**Template**

```
<%= _.uniq(numbers).join('-') %>
```

(outputs: `"2-4-6-7"`)

### File names

File names are generated using the same templating API described above. You simply replace the `<%= %>` delimiters with `__ __`.

```
> enter some numbers: [2,4,6,7,2,2,4,4,6]
(variable=numbers)
```

**Simple**

```
__name.toKebabCase()__.component.ts
```

(input: `"my file name here"` ... output: `my-file-name-here.component.ts`)

**Advanced**



```
___.uniq(numbers).join('-')__.component.ts
```

(input: `[2,4,6,7,2,2,4,4,6]` ... output `2-4-6-7.component.ts`)

> Note the triple underscore (`___`) at the start. This is because lodash is accessed via `_` inside of the standard file name delimiters `__ ... __` resulting in the starting triple underscore.


## Additional resources

* [Scaffs library / programmatic usage](https://github.com/itslenny/scaffs) | [npm](https://www.npmjs.com/package/scaffs)
* [Scaffs cli / command line usage](https://github.com/itslenny/scaffs-cli) | [npm](https://www.npmjs.com/package/scaffs-cli)
* [Scaffs vs code plugin](https://github.com/itslenny/scaffs-vscode) | [vs code marketplace](https://marketplace.visualstudio.com/items?itemName=itslennysfault.scaffs-vscode)
* [@scaffs registry](https://github.com/itslenny/scaffs-registry) | [npm](https://www.npmjs.com/~scaffs)
* [Using scaffs config](https://github.com/itslenny/scaffs/tree/master/docs/md/config.md)
* [Creating scaffs](https://github.com/itslenny/scaffs/tree/master/docs/md/create.md)
