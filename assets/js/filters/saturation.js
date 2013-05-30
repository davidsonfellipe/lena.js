LenaJS.saturation = function(pixels, args) {

    var amount = 2.9;
    var RW = 0.3086;
    var RG = 0.6084;
    var RB = 0.0820;
    var RW0 = (1 - amount) * RW + amount;
    var RW1 = (1 - amount) * RW;
    var RW2 = (1 - amount) * RW;
    var RG0 = (1 - amount) * RG;
    var RG1 = (1 - amount) * RG + amount;
    var RG2 = (1 - amount) * RG;
    var RB0 = (1 - amount) * RB;
    var RB1 = (1 - amount) * RB;
    var RB2 = (1 - amount) * RB + amount;

    for (var i = 0; i < pixels.data.length; i += 4) {

       pixels.data[i]   = RW0*pixels.data[i] + RG0*pixels.data[i+1] + RB0*pixels.data[i+2];
       pixels.data[i+1] = RW1*pixels.data[i] + RG1*pixels.data[i+1] + RB1*pixels.data[i+2];
       pixels.data[i+2] = RW2*pixels.data[i] + RG2*pixels.data[i+1] + RB2*pixels.data[i+2];

    }

    return pixels;
};