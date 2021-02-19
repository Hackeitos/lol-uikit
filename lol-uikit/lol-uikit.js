import './lib/jquery.js';
window.$ = window.jQuery = jQuery;

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




function attrToClass(element, attr) {
    let value = element.attr(attr);
    if (value) {
        element.addClass(value);
        element.removeAttr(attr);
    }
}




// WRAPPERS FOR ALREADY EXISTING CONTROLS: ///////////////////////////////////////////////////////////////////




$("lol-yellow-button").each(function () {
    $(this).html(`<button>${$(this).html()}</button>`);
    copyAttrs($(this), $(this).find("button"));
    $(this).find("button").click(() => { if (!$(this).hasClass("disabled")) $(this).trigger("click") });
});




$("lol-transparent-button").each(function () {
    $(this).html(`<button>${$(this).html()}</button>`);
    copyAttrs($(this), $(this).find("button"));
    $(this).find("button").click(() => { if (!$(this).hasClass("disabled")) $(this).trigger("click") });
});




$("lol-textbox").each(function () {
    $(this).html(`<input type="text" placeholder="${$(this).html()}"></input>`);
    copyAttrs($(this), $(this).find("input"));
});




// FULL CUSTOM CONTROLS: //////////////////////////////////////////////////////////////////////////////////




$("lol-dropdown").each(function () {
    let dropdown = $(this);

    attrToClass(dropdown, "disabled");

    dropdown.find("div").each(function () { attrToClass($(this), "disabled") });

    if (!dropdown.attr("tabindex")) dropdown.attr("tabindex", "0");

    let value = dropdown.attr("value");

    dropdown.html(`
<div class="row">
    <div class="col">${value ? value : ""}</div>
    <div class="col d-flex flex-row-reverse align-items-center">
        <img class="align-middle" src="">
    </div>
</div>

<lol-dropdown-option-container>
    ${dropdown.html()}
</lol-dropdown-option-container>`);

    $(this).find("lol-dropdown-option-container").find("div").click(function () {
        if ($(this).hasClass("disabled")) return;

        dropdown.attr("value", $(this).attr("value"));
        dropdown.find("div").first().find("div").first().html($(this).html());
        dropdown.trigger("select");
        dropdown.removeClass("open");
    });

    dropdown.focusout(() => dropdown.removeClass("open"));

    dropdown.find("div").first().click(() => { if (!dropdown.hasClass("disabled")) dropdown.toggleClass("open"); });
});




$("lol-checkbox").each(function () {
    let checkbox = $(this);

    attrToClass(checkbox, "disabled");
    attrToClass(checkbox, "checked");

    checkbox.html(`
<div>
    <img src="">
</div>
<span class="align-middle">${checkbox.html()}</span>`);

    checkbox.click(function () {
        if (checkbox.hasClass("disabled")) return;

        checkbox.toggleClass("checked");
        checkbox.trigger("change");
    });
});




$("lol-radiobuttons").each(function () {
    let radiocontainer = $(this);
    let value = $(this).attr("value");

    radiocontainer.find("div").each(function () {
        attrToClass($(this), "disabled");

        if (value && $(this).attr("value") == value) $(this).addClass("checked");

        $(this).addClass("lol-radio-button");

        $(this).html(`
<div>
    <img src="">
</div>
<span class="align-middle">${$(this).html()}</span>`);

        $(this).click(function () {
            if ($(this).hasClass("disabled")) return;

            radiocontainer.find("div").each(function () { $(this).removeClass("checked"); });
            $(this).addClass("checked");
            radiocontainer.attr("value", $(this).attr("value"));
            radiocontainer.trigger("change");
        });
    });

});

