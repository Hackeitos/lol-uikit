import "./lib/jquery.js";
import "./lib/attrchange.js";
window.$ = window.jQuery = jQuery;

// INITIALIZATION AT THE END. GO CHECK OUT THE LAST LINE

// SOME USEFUL FUNCTIONS: ////////////////////////////////////////////////////////////////////////////////////


function copyAttrs(source, dest) {
    source.each(function () {
        $.each(this.attributes, function () {
            if (this.specified) {
                dest.attr(this.name, this.value);
                source.removeAttr(this.name);
            }
        });
    });
}

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


//TODO: Detect attribute changes


export default class LolUiKit {

    static init() {

        // WRAPPERS FOR ALREADY EXISTING CONTROLS: ///////////////////////////////////////////////////////////////////




        $("lol-textbox").each(function () {
            $(this).html(`<input type="text" placeholder="${$(this).html()}"></input>`);
            copyAttrs($(this), $(this).find("input"));
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

            dropdown.children("option").each(function () {
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
                    let newHTML = optionsContainer.children(`option[value=${value}]`).html();
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
                    if (option.hasClass("disabled")) return;

                    radiocontainer.children("li").removeClass("checked");
                    option.addClass("checked");
                    radiocontainer.attr("value", option.attr("value"));
                    radiocontainer.trigger("change");
                });
            });

            bindAttrs(radiocontainer, {
                "disabled": (value) => {
                    if (value)
                        radiocontainer.children("radio-button").addClass("disabled");
                    else
                        radiocontainer.children("radio-button").removeClass("disabled");
                },

                "value": (value) => {
                    radiocontainer.children("radio-button").removeClass("checked");
                    radiocontainer.children(`radio-button[value=${value}]`).addClass("checked");
                }
            });
        });


    }

}

LolUiKit.init(); // YOU CAN COMMENT THIS LINE TO MANUALLY INITIALIZE ALL lol-* ITEMS BY YOURSELF