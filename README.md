# Lena.js 

Tiny library for image processing.

[![Codeclimate](https://codeclimate.com/github/davidsonfellipe/lena.js/badges/gpa.svg?style=flat)](https://codeclimate.com/github/davidsonfellipe/lena.js)
[![MIT license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat)](https://davidsonfellipe.mit-license.org/)
[![NPM](https://badgen.net/npm/v/lena.js)](https://www.npmjs.com/package/lena.js)


## Demo

[https://fellipe.com/demos/lena-js/](https://fellipe.com/demos/lena-js/)

![Demo](https://user-images.githubusercontent.com/381179/32207948-b2dfcff8-bdd5-11e7-8c83-08b86a7616be.gif)

## Current filters

* gaussian
* grayscale
* highpass
* invert
* laplacian
* prewitt
* rgb
* roberts
* saturation
* sepia
* sharpen
* sobel
* thresholding
* lowpass 3x3
* lowpass 5x5

## Install via NPM

`npm i lena.js`

## Developing new filters

Follow those steps to develop new filters.

| Steps  | Description                              | Command                        |
| :----- | :--------------------------------------- | :----------------------------- |
| **01** | Install npm                              | `npm install`             |
| **02** | If you have installed Grunt globally in the past, you will need to remove it first | `npm uninstall -g grunt`       |
| **03** | Install grunt-cli                        | `npm install -g grunt-cli`     |
| **04** | Install grunt to current project         | `npm install grunt --save-dev` |
| **05** | And finally run it with                  | `grunt watch`                  |



## Author

[![Davidson Fellipe](http://gravatar.com/avatar/054c583ad5dc09a861874e14dcb43e4c?s=70)](https://github.com/davidsonfellipe)
<br>
[Davidson Fellipe](https://github.com/davidsonfellipe)



## Tutorials

-  [How to add image filters (photo effects) to images in the browser with JavaScript using Lena.js](https://ourcodeworld.com/articles/read/515/how-to-add-image-filters-photo-effects-to-images-in-the-browser-with-javascript-using-lena-js)



## Contribute

Anyone and everyone is welcome to contribute. See some [developers](https://github.com/davidsonfellipe/lena.js/graphs/contributors) that helped.


## License

Code is under [MIT](http://davidsonfellipe.mit-license.org) license
