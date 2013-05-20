window.onload = function() {

    document.getElementById('filter').addEventListener("change", function(){
        var img = document.getElementById("lena");

        var idata = LenaJS.filterImage(LenaJS[this.value], img);

        var c = document.getElementById("canvas");
        c.width = idata.width;
        c.height = idata.height;
        var ctx = c.getContext('2d');
        ctx.putImageData(idata, 0, 0);
    }, false);

};