function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$("#sb").on("change", function (event, value) {
    $("#pb").attr("value", value);
});

async function pene() {
    for (i = 0; i <= 1000; i += 1) {
        $("lol-progressbar").attr("value", i / 1000);
        $("lol-progressbar").attr("hue", i + "deg");
        await sleep(1);
    }
}