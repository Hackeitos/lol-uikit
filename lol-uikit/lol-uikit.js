import "./lib/attrchange.js";

let splitPath = $("#lol-script").first().attr("src").split("/");
splitPath.pop();
let root = ""; // Path to the lol-uikit folder relative to the HTML
splitPath.forEach(element => { root += element + "/" });

// INITIALIZATION AT THE END. GO CHECK OUT THE LAST LINE

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


// THE CLASS: ////////////////////////////////////////////////////////////////////////////////////////////////


export default class LolUiKit {

    static init() {




        $(".lol-bg-animated").each(function () {
            let element = $(this);
            let content = element.html();
            let container = $(document.createElement("div"));
            let video = $(document.createElement("video"));
            video.attr("src", root + "media/background-ambient.webm");
            video.prop("autoplay", true);
            video.prop("muted", true);
            video.prop("loop", true);

            container.html(content);

            element.empty();
            element.prepend(video, container);
        });




        $("lol-button, lol-transparent-button, lol-round-button").each(function () {
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
                    else if (value != "") dropdown.attr("value", "");
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
            progressbar.append(videoBack, videoTip, spanPercentage);

            videoTip.addClass("tip");
            videoTip.attr("src", root + "media/pb-long-tip.webm");
            videoTip.prop("autoplay", true);
            videoTip.prop("muted", true);
            videoTip.prop("loop", true);

            videoBack.addClass("back");
            videoBack.prop("autoplay", true);
            videoBack.prop("muted", true);
            videoBack.prop("loop", true);

            spanPercentage.html("&ZeroWidthSpace;");

            let updateProgressBar = async function (percentage = null) {
                percentage = percentage || progressbar.attr("value");
                percentage = percentage * 100;
                if (!percentage || isNaN(percentage) || percentage < 0 || percentage > 100) percentage = 0;

                spanPercentage.html(parseInt(percentage) + "%");
                videoTip.css("left", percentage + "%");
                videoBack.css("clip-path", `inset(0px ${100 - percentage}% 0px 0px)`);
            };


            bindAttrs(progressbar, {
                "value": (value) => updateProgressBar(value),
                "hue": (value) => progressbar.css("--hue", value),
                "saturation": (value) => progressbar.css("--saturation", value)
            });

            videoBack.attr("src", root + "media/pb-back.webm");
            videoBack.on("loadeddata", () => updateProgressBar());
        });
    }
}

LolUiKit.init() // YOU CAN COMMENT THIS LINE TO MANUALLY INITIALIZE LATER ALL lol-* ITEMS BY YOURSELF