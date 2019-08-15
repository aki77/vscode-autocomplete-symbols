# Autocomplete symbols

Completion provider for symbols.

## Features

![demo](https://i.gyazo.com/00686ea818174759942737138d345c6a.gif)

## Extension Settings

This extension contributes the following settings:

- `autocompleteSymbols.minLength`: `4`
- `autocompleteSymbols.enabledLanguages`: `[]`
- `autocompleteSymbols.includeAutomatically`: `true`

## Keymaps

No keymap by default.

### example

```json
[
  {
    "key": "ctrl+'",
    "command": "-editor.action.triggerSuggest",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+'",
    "command": "autocompleteSymbols.triggerSuggest",
    "when": "editorTextFocus"
  }
]
```
