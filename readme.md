# lol-uikit
Very basic/limited League of Legends-like UI theme for HTML implementation using Bootstrap and Jquery.

# How to implement
Copy the `lol-uikit` folder into your project. Now go to your HTML and make sure you:
* Add `lol-uikit.js` script to `<body>` with `type="module"`.
* Add `lol-uikit.css` stylesheet to `<head>`.

# Body

* You can add class `lol-body` to stylize the background.

# Wrappers

All these are wrappers to another already existing HTML control, so any attribute specified in the `lol-` tag will be passed to the actual control. This only happens at load time so if you want to modify an attribute later, make sure you edit the actual control. 

## Label

```HTML
<lol-label>TEXT-HERE</lol-label>
```

Just displays some text.

## Yellow button

```HTML 
<lol-yellow-button>TEXT-HERE</lol-yellow-button>
```

## Icon button

```HTML
<lol-transparent-button>TEXT-HERE</lol-transparent-button>
```

## Textbox

```HTML
<lol-textbox>PLACEHOLDER-HERE</lol-textbox>
```

You can specify the placeholder either in the attribute or in the HTML body. Attribute has priority.

# Custom controls

All these are controls I made from scratch, so there is no actual HTML control doing the functionality, therefore it is limited.

* These controls can be disabled either by adding a `disabled` class or by specifying a `disabled` attribute which when the page loads gets converted to the class.
    * This means that if you want to set any property after the page has loaded you must use the class method.

## Dropdown

```HTML
<lol-dropdown value="LITERAL-INITIAL-VALUE">
  <div value="1">TEXT-HERE</div>
  <div value="1">TEXT-HERE</div>
</lol-dropdown>
```

* Each div is an option.
* Dropdown will initialize with the text specified in the `value` attribute. Once the user chooses an option the `value` attribute will be set to the `value` attribute of the selected element and the onchange event will be triggered.
* Options can be disabled.

## Checkbox

```HTML
<lol-checkbox>TEXT-HERE</lol-checkbox>
```

* `checked` state can be set in the same way than `disabled` state.

## Radio buttons

```HTML
<lol-radiobuttons value="1">
    <div value="1">TEXT-HERE</div>
    <div value="2">TEXT-HERE</div>
</lol-radiobuttons>
```

* Each div is an option.
* Initially selected radiobutton will be the one which `value` attribute equals `lol-radiobuttons`'s `value`.
* Options can be disabled.

