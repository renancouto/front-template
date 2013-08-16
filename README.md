# front-template
> A basic template for front-end development using Node.js

## dependencies
Make sure you have installed the following:
* [node.js](http://nodejs.org/)
* [npm](http://nodejs.org/) (node.js package manager)
* [grunt](http://gruntjs.com/)
* [ruby](http://www.ruby-lang.org/)
* [gem](http://rubygems.org/) (ruby package manager)
* [sass](http://sass-lang.com/)

I think there's enough installation material about all that on the web, so I won't make a how-to-install for this dependencies. After you have all that set, you can carry on.

## installation
```shell
git clone https://github.com/renancouto/front-template
npm install
```

## usage

### main tasks
--------------

```shell
grunt {environment}
```
> use ***prod*** or ***dev*** as environments

### grouped tasks
-----------------

#### views (html)
```shell
grunt views:{environment}
```

#### scripts (js)
```shell
grunt scripts
```

#### styles (css)
```shell
grunt styles:{environment}
```

#### images (jpg,gif,png)
```shell
grunt images:{environment}
```

### all tasks
-------------

#### [assemble](http://assemble.io/)
> Generate static HTML files using Handlebars as the template engine

```shell
grunt assemble:{environment}
```

#### connect
> Creates the server

```shell
grunt connect
```

#### sass
> Generate the stylesheets using [SASS](http://sass-lang.com/) preprocessor

```shell
grunt sass:{environment}
```

#### autoprefixer
> Add vendor-prefixes for the generated CSS (postprocessor).

```shell
grunt autoprefixer
```

#### clean
> Cleans the DIST folder
```shell
grunt clean:all
```

> Only styles
```shell
grunt clean:styles
```

> Only scripts
```shell
grunt clean:scripts
```

> Only html files (views) no the root
```shell
grunt clean:views
```

> Only images
```shell
grunt clean:images
```

#### copy
> Copy files from SRC to DIST folder
```shell
grunt copy
```

#### prettify
> Prettifies html files on the DIST folder
```shell
grunt prettify
```

#### htmlmin
> Minifies html files on the DIST folder
```shell
grunt minify
```

#### verifylowercase
> Verifies file's extensions and throw errors on uppercases
```shell
grunt verifylowercase
```

#### imagemin
> Minify images
```shell
grunt imagemin:{environment}
```

### watch
> Watch for file changes and reload the page (livereload)
```shell
grunt watch
```
