# lol-uikit
Very basic/limited League of Legends-like UI theme for HTML implementation.

# How to implement
Copy the `lol-uikit` folder into your project. Now go to your HTML and make sure you:
* Add to the body tag an attribute called `lol-uikit` which value is the relative path from the HTML file to the lol-uikit *folder*.
* Add to `<head>`:
  *  `<link rel="stylesheet" href="<Bootstrap.min.css>">` (Tested with v5.0).
* Add near the end of `<body>` in this order:
  * `<script src="<jquery.min.js>"></script>` (Tested with v3.5.1).
  * `<script src="<path to lol-uikit.js>"></script>`.

#The controls

## Label
Usage: `<lol-label>TEXT-HERE</lol-label>`.

## Yellow button
Usage: `<lol-yellow-button onclick="" disabled>TEXT-HERE</lol-yellow-button>`

## Icon button
Usage: `<lol-transparent-button onclick="" disabled>TEXT-HERE</lol-transparent-button>`

You should be able to put font awesome icons and similar stuff inside both buttons. Not tested.

## Textbox
Usage: `<lol-textbox onchange="" onkeydown="" onkeypress="" onkeyup="" value="" placeholder="" disabled>PLACEHOLDER-HERE</lol-textbox>`

You can specify the placeholder either in the attribute or in the HTML body. Attribute has priority.

## Dropdown
Usage: 
`<lol-dropdown value="LITERAL-INITIAL-VALUE" onchange="" disabled>
  <option value="1" disabled>TEXT-HERE</option>
</lol-dropdown>`

Dropdown will initialize with the text specified in the `value` attribute. Once the user chooses an option the `value` attribute will be equal to the `value` attribute of the selected element and the onchange event will be called.

## Checkbox
Usage: `<lol-checkbox onchange="" checked disabled>TEXT-HERE</lol-checkbox>`
