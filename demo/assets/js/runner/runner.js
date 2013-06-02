window.onload = function() {

    document.getElementById("filter").addEventListener("change", function(){
        var img = document.getElementById("lena");
        var selectorCanvas = document.getElementById("canvas");

        if(this.value) {
            LenaJS.filterImage(selectorCanvas, LenaJS[this.value], img);
            selectorCanvas.style.display = "block";
        } else {
            selectorCanvas.style.display = "none";
        }

    }, false);

};