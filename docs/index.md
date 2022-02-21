# markjs

- usage for the cli
- install

```sh
 npm install -g @otoniel19/markjs
```

# how to parse markdown

- the theme can be 'light' or 'dark'

```sh
 markjs parse <fileName.md> --theme dark --output <fileName>
```

# how to open markdown preview

```sh
 markjs open <fileName.md> --theme dark
```

- open the preview [server](http://localhost:5000) in browser

# how to watch markdown

- the watch mode watch markdown changes and write to a file

```sh
 markjs watch <fileName.md> -o <output> --theme dark
```

# how to lint markdown

```sh
 markjs lint <file.md>
```

# node.js usage

```js
const markjs = require("@otoniel19/markjs");
markjs(file, theme).then((res) => {
  console.log(res);
});
```

> thank you for using this
> <br> See you next time **:wave:**

## made by otoniel19 with **:hearts:**
