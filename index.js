function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function pene() {
    for (i = 0; i <= 1000; i += 1) {
        $("lol-progressbar").attr("value", i / 1000);
        $("lol-progressbar").attr("hue", i + "deg");
        await sleep(1);
    }
}

$(document).on("input", "#penesote", function() {
    console.log(this.value / (this.max || 100));
    $("#pb").attr("value", this.value / (this.max || 100));
});