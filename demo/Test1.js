var test;

window.onload = function() {
        var canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d"),
            image = document.getElementById("lena");

        ctx.drawImage(image, 0, 0);
        test = ctx.getImageData(0,0,canvas.width, canvas.height);
};
