# md-parser

- usage for the cli
- install

```sh
 yarn global add github://otoniel19/md-parser
```

# how to parse markdown

- the theme can be 'light' or 'dark'

```sh
 md-parser parse <fileName.md> --theme dark --output <fileName>
```

# how to open markdown preview

```sh
 md-parser open <fileName.md> --theme dark
```

- open the preview [server](http://localhost:5000) in browser

# how to watch markdown

- the watch mode watch markdown changes and write to a file

```sh
 md-parser watch <fileName.md> -o <output> --theme dark
```

# how to lint markdown

> :warning: this requires yarn

```sh
 md-parser lint <file.md>
```

# node.js usage

```js
const mdParser = require("@otoniel19/md- parser");
mdParser(file, theme).then((res) => {
  console.log(res);
});
```

> thank you for using this
> <br> See you next time **:wave:**

## made by otoniel19 with **:hearts:**
