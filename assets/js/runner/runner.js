

window.onload = function() {

    // document.getElementById('filter').addEventListener("change", function(){
        var img = document.getElementById("lena");
        // var Filter = new LenaJS;

        var c = document.getElementById("grayscale");

        var idata = LenaJS.filterImage(LenaJS.sepia, img);
        c.width = idata.width;
        c.height = idata.height;
        var ctx = c.getContext('2d');
        ctx.putImageData(idata, 0, 0);
        // runFilter('grayscale', LenaJS.grayscale);
        // LenaJS.filterImage(LenaJS.grayscale, img);
    // }, false);

};