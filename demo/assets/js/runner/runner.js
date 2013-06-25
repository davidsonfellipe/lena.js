var firstExecution = 0;

function renderCanvasDemo (filter){
    var img = document.getElementById("lena"),
        selectorCanvas = document.getElementById("canvas");

    if(filter) {

        if(!firstExecution) {
            LenaJS.filterImage(selectorCanvas, LenaJS[filter], img);
            firstExecution++;
        } else {
            LenaJS.redrawCanvas(selectorCanvas, LenaJS[filter]);
        }

        selectorCanvas.style.display = "block";
        var histogram = LenaJS.histogram(document.getElementById('canvas'));

        getChart("rgba(255,0,0,1)", histogram);

    } else {
        selectorCanvas.style.display = "none";
    }
}


window.onload = function() {

    $(".btn-filter").dragdrop({
        makeClone: true,
        sourceClass: "pendingDrop",
        dropClass: "highlight",
        container: $('#destination'),
        didDrop: function($src, $dst) {

            if ($dst.attr("id")!="destination"){
                $dst = $dst.parents("#destination");
            }

            $dst.append('<li class="btn">' + $src.text() + '</li>');

            renderCanvasDemo($('.pendingDrop').attr('data-filter'));
        }
    });

    $("#filter-reset").click(function(){

        var canvas = document.getElementById("canvas"),
            ctx = canvas.getContext("2d"),
            image = document.getElementById("lena");

        ctx.drawImage(image, 0, 0);

        $('#destination').find('.btn').remove();
    });
};