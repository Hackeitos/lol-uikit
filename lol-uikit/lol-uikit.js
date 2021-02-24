import "./lib/attrchange.js";
window.$ = window.jQuery = jQuery;

let splitPath = $("#lol-script").first().attr("src").split("/");
splitPath.pop();
let root = ""; //Needed to know where the lol-uikit folder is relative to the HTML
splitPath.forEach(element => { root += element + "/" });


// INITIALIZATION AT THE END. GO CHECK OUT THE LAST LINE

/*$("html").css("--seekbar", "url(\"" + "img/seekbar.png\")");
$("html").css("--seekbar-hover", "url(\"" + "img/seekbar-hover.png\")");
$("html").css("--seekbar-click", "url(\"" + "img/seekbar-click.png\")");
$("html").css("--seekbar-disabled", "url(\"" + "img/seekbar-disabled.png\")");*/

// SOME USEFUL FUNCTIONS: ////////////////////////////////////////////////////////////////////////////////////

function forceTabIndex(element) {
    if (!element.attr("tabindex")) element.attr("tabIndex", "0");
}

function bindAttrs(element, callbacks) {
    for (const [key, value] of Object.entries(callbacks))
        if (element.attr(key)) value(element.attr(key));

    element.attrchange({
        trackValues: true,
        //event.attributeName - Name of the attribute modified
        //event.oldValue      - Previous value of the modified attribute
        //event.newValue      - New value of the modified attribute
        callback: function (event) {
            let attrCallback = callbacks[event.attributeName];
            if (attrCallback) attrCallback(event.newValue);
        }
    });
}


export default class LolUiKit {

    static init() {

        console.log(root);
        // WRAPPERS FOR ALREADY EXISTING CONTROLS: ///////////////////////////////////////////////////////////////////




        /*$(".lol-textbox>input").each(function() {
            
        });*/




        $("lol-seekbar").each(function () {
            let seekbar = $(this);
            let img = seekbar.children("div.thumb");

            forceTabIndex(seekbar);

            let initialX;

            

            let mouseMove = (event) => {
                event.stopImmediatePropagation();
                let max = seekbar.width() - 32;
                let newPos = parseInt(img.css("margin-left")) - initialX + event.offsetX;
                if (newPos < 0) newPos = 0;
                if (newPos > max) newPos = max;
                img.css("margin-left", newPos + "px");
                seekbar.trigger("change", newPos / max);
            };

            img.on("mousedown", (event) => {
                initialX = event.clientX - parseInt(img.css("margin-left"));
                img.on("mousemove", mouseMove);
            });

            img.on("mouseup", () => img.off("mousemove"));
            seekbar.on("mouseleave", () => img.off("mousemove"));
        });




        // FULL CUSTOM CONTROLS: //////////////////////////////////////////////////////////////////////////////////




        $("lol-button, lol-transparent-button").each(function () {
            let button = $(this);
            forceTabIndex(button);
            button.on("click", (e) => { if (button.hasClass("disabled")) e.stopImmediatePropagation(); });
        });




        $("lol-dropdown").each(function () {
            let dropdown = $(this);

            forceTabIndex(dropdown);

            let textSpan = $(document.createElement("span"));
            textSpan.html("&ZeroWidthSpace;");
            dropdown.append(textSpan);

            let img = $(document.createElement("img"));
            dropdown.append(img);

            let optionsContainer = $(document.createElement("options-container"));
            optionsContainer.addClass("lol-scrollbar");
            dropdown.append(optionsContainer);

            dropdown.children("li").each(function () {
                let option = $(this);

                option.on("click", function (event) {
                    event.stopImmediatePropagation();
                    dropdown.removeClass("open");
                    dropdown.attr("value", option.attr("value"));
                });

                optionsContainer.append(option);
            });

            dropdown.on("click", function () {
                if (!dropdown.hasClass("disabled")) dropdown.toggleClass("open");
            });

            dropdown.on("focusout", function () {
                dropdown.removeClass("open");
            });

            bindAttrs(dropdown, {
                "text": (value) => {
                    textSpan.html(value ? value : "&ZeroWidthSpace;");
                    dropdown.removeAttr("value");
                },

                "value": (value) => {
                    let newHTML = optionsContainer.children(`li[value=${value}]`).html();
                    if (newHTML) textSpan.html(newHTML);
                },

                "max-height": (value) => {
                    optionsContainer.css("max-height", value);
                }
            });
        });




        $("lol-checkbox").each(function () {
            let checkbox = $(this);

            checkbox.html(`<img><span>${checkbox.html()}</span>`);

            checkbox.on("click", function () {
                if (checkbox.hasClass("disabled")) return;

                checkbox.toggleClass("checked");
                checkbox.trigger("change", checkbox.hasClass("checked"));
            });
        });




        $("lol-radiobuttons").each(function () {
            let radiocontainer = $(this);

            radiocontainer.children("li").each(function () {
                let option = $(this);
                option.html(`<img><span>${$(this).html()}</span>`);

                option.on("click", function () {
                    if (option.hasClass("disabled") || radiocontainer.hasClass("disabled")) return;

                    radiocontainer.children("li").removeClass("checked");
                    option.addClass("checked");
                    radiocontainer.attr("value", option.attr("value"));
                    radiocontainer.trigger("change");
                });
            });

            bindAttrs(radiocontainer, {
                "value": (value) => {
                    radiocontainer.children("radio-button").removeClass("checked");
                    radiocontainer.children(`radio-button[value=${value}]`).addClass("checked");
                }
            });
        });


        $("lol-progressbar").each(function () {
            let progressbar = $(this);
            progressbar.empty();

            let videoTip = $(document.createElement("video"));
            let videoBack = $(document.createElement("video"));
            let spanPercentage = $(document.createElement("span"));
            progressbar.append(videoTip, videoBack, spanPercentage);

            videoTip.addClass("tip");
            videoTip.attr("src", root + "media/pb-tip.webm");
            videoTip.prop("autoplay", true);
            videoTip.prop("muted", true);
            videoTip.prop("loop", true);

            videoBack.addClass("back");
            videoBack.prop("autoplay", true);
            videoBack.prop("muted", true);
            videoBack.prop("loop", true);

            spanPercentage.html("&ZeroWidthSpace;");
            spanPercentage.css("margin-top", ((progressbar.height() - spanPercentage.height()) / 2));



            let updateProgressBar = async function (percentage = null) {
                percentage = percentage || progressbar.attr("value");
                if (!percentage || isNaN(percentage) || percentage < 0 || percentage > 1) percentage = 0;

                spanPercentage.html(parseInt(percentage * 100) + "%");
                spanPercentage.css("margin-left", ((progressbar.width() - spanPercentage.width()) / 2));

                videoTip.css("left", (progressbar.width() * percentage - videoTip.width() * 0.81) + "px");
                videoBack.css("margin-left", (progressbar.width() * percentage - videoBack.width()) + "px");
            };


            bindAttrs(progressbar, {
                "style": (value) => updateProgressBar(),
                "value": (value) => updateProgressBar(value),
                "hue": (value) => progressbar.css("--hue", value),
                "saturation": (value) => progressbar.css("--saturation", value)
            });

            videoBack.attr("src", root + "media/pb-back.webm");
            videoBack.on("loadeddata", () => updateProgressBar());
        });

    }

}

LolUiKit.init(); // YOU CAN COMMENT THIS LINE TO MANUALLY INITIALIZE ALL lol-* ITEMS BY YOURSELF