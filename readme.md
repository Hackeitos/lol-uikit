# lol-uikit
Basic HTML implementation of League of Legends-like controls.

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
All these controls cannot bedisabled with the `disabled` attribute. Instead you have to add `class="disabled"` to disable them.
All buttons have the same logic behind.

## Yellow button
```HTML
<lol-button></lol-button>
```

- Supports mouse events. `onclick` is not triggered if disabled.

# Transparent button / clickable label

```HTML
<lol-transparent-button></lol-transparent-button>
```

# Checkbox

```HTML
<lol-checkbox></lol-checkbox>
```

- Has class `checked` when checked.

# Dropdown

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

# 

