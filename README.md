# md-parser

# contents

- [cli](#cli)
- [out of cli](#out-of-cli)

> md-parser is a cli for easy markdown to html conversion

# cli

- install
- install latest versions

```sh
 yarn global add github://otoniel19/md-parser
```

- usage
- parse markdown to html

```sh
 md-parser parse <inputFile> -o <outputFile>
```

- this command parse and preview markdown without output to a file

```sh
 md-parser open <file>
```

- the watch mode
- this mode watch md file and write to file

```sh
 md-parser watch fileName.md -o outfile
 # choose the theme
 # and then choose the mode
```

# out of cli

- install
- lastest versions

```sh
 yarn add github://otoniel19/md-parser
```

- usage

```js
const mdParser = require("@otoniel19/md-parser");
console.log(mdParser("./file.md", "dark")); // theme should be "dark" or "light"
```

### thank you for using this!

### **Made By otoniel19 with :hearts:**
