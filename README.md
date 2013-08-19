[![Dependency Status](https://david-dm.org/davidsonfellipe/lena-js.png)](https://david-dm.org/davidsonfellipe/lena-js)

## Existing filters

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

## Developing new filters

Follow those steps to develop new filters.

| Steps | Description | Command |
| :----------- | :----------- | :-------------- |
| **01** | Install npm | `sudo npm install` |
| **02** | If you have installed Grunt globally in the past, you will need to remove it first | `npm uninstall -g grunt` |
| **03** | Install grunt-cli | `npm install -g grunt-cli` |
| **04** | Install grunt to current project | `npm install grunt --save-dev` |
| **05** | And finally run it with | `grunt watch` |

## License

[MIT License](http://davidsonfellipe.mit-license.org/)
