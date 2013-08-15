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

I think there's enough installation material about all that on the web, so I won't make a how-to-install for this dependencies.

## installation
```shell
git clone https://github.com/renancouto/front-template
npm install
```

## usage
```shell
grunt {environment}
```
> use ***prod*** or ***dev*** as environments

## tasks
### [assemble](http://assemble.io/)
> Generate static HTML files using Handlebars as the template engine

```shell
grunt assemble:{environment}
```

### connect
> Creates the server

```shell
grunt connect
```
