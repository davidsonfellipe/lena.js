window.onload = function() {

    document.getElementById("filter").addEventListener("change", function(){
        var img = document.getElementById("lena");
        var selectorCanvas = document.getElementById("canvas");

        LenaJS.filterImage(selectorCanvas, LenaJS[this.value], img);
    }, false);

};