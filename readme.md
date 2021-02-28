# lol-uikit
Basic HTML implementation of League of Legends-like controls.

# How to implement

Simply copy the lol-uikit folder to your project and add this to your HTML:

```HTML
<link rel="stylesheet" href=".../lol-uikit/lol-uikit.css">
<script src=".../lol-uikit/lib/jquery.js"></script>
<script src=".../lol-uikit/lol-uikit.js" type="module" id="lol-script"></script>
```

Please note the `type="module"` and `id="lol-script"` attributes. Things may not work correctly if you don't set these attributes correctly.

# Demo

Try a demo by opening the [index.html](./index.html) file. You may want to NOT open it by `file:///` because some browsers may block script loading.

# Wrappers

These just stylize already existing controls. To theme them just add the class to them.

## Textbox

```HTML
<input class="lol-textbox" type="text">
```

## Seekbar

```HTML
<input class="lol-seekbar" type="range">
```

# Full custom controls

Now due to limitations in design, I couldn't fully customize some controls so I had to implement them by myself.
All functionality is written by myself, so if you see any bug, please open an issue.
All these controls cannot be disabled with the `disabled` attribute. Instead you have to add `class="disabled"` to disable them.
All buttons have the same logic behind.

## Yellow button
```HTML
<lol-button></lol-button>
```

- Supports mouse events. `onclick` is not triggered if disabled.

## Transparent button / clickable label

```HTML
<lol-transparent-button></lol-transparent-button>
```

## Checkbox

```HTML
<lol-checkbox></lol-checkbox>
```

- Has class `checked` when checked.

## Dropdown

```HTML
<dropdown value="" text="">
    <li value="[value]">[html]</li>
    ...
</dropdown>
```

- Each `li` is an option.
- Attributes:
    - `value`: Will change to the value of the selected option. Goes both ways.
    - `text`: Initial text. Useful for things like "Pick one".

## Radio buttons

```HTML
<lol-radiobuttons value="1">
    <li value="[value]">[html]</li>
    ...
</lol-radiobuttons>
```

- Each `li` is an option that has class `selected` when selected. It is recommended to use the `value` attribute though.
- Options can be disabled individually.
- Disabling the `lol-radiobuttons` element will disable all options.
- Attributes:
    - `value`: Will change to the value of the selected option. Goes both ways.

## Progressbar

```HTML
<lol-progressbar class="percentage zero-hide no-tip" value="1"></lol-progressbar>
```

- You can change the height, but it may lead to weird layouts.
- Attributes:
    - `value`: Goes from 0 to 1.
    - `hue`: Hue rotation to change color. Keep in mind that the original animation is blue. Set as you would in CSS (I.E.: `100deg`).
    - `saturation`: Color saturation. Set as you would in CSS.
- Classes:
    - `percentage`: Show a label in the middle which shows the progress in percentage.
    - `zero-hide`: Keep progressbar empty when value is 0. If not set you will see a thin blue line at the left when `value` is 0.
    - `no-tip`: Hide the shining tip.

# Styles

Classes you can add to anything to theme different elements inside them.

## Scrollbars

```HTML
<div class="lol-scrollbar"></div>
```

## Text

```HTML
<div class="lol-text"></div>
```

## Animated background

```HTML
<div class="lol-bg-animated"></div>
```
