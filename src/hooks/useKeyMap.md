#react #hook #useKeyMap #draft 

```
/*
 *
 * References:
 *   https://code.visualstudio.com/docs/getstarted/keybindings
 *
 https://betterprogramming.pub/full-featured-hotkeys-library-in-200-lines-of-javascript-code-81a74e3138cc*
 *
type SingleKey = 'foo' | 'bar' | 'baz' 
type LongPressKey = `!${SingleKey}`;
type KeyCombination = `Alt+${SingleKey}` | `Ctrl+${SingleKey}` | `Shift+${SingleKey}` | `Alt+Ctrl+${SingleKey}` | `Alt+Shift+${SingleKey}` 
| `Ctrl+Shift+${SingleKey}`;

type KeyStroke = SingleKey | LongPressKey | KeyCombination;

type AlternativeKeys = `[${KeyStroke}, ${KeyStroke}]` | `[${KeyStroke}, ${KeyStroke}, ${KeyStroke}]`
 | `[${KeyStroke}, ${KeyStroke}, ${KeyStroke}, ${SingleKey}]`;

type KeyChord = `${KeyStroke} ${KeyStroke}` | `${KeyStroke} ${KeyStroke} ${KeyStroke}` | `${KeyStroke} ${KeyStroke} ${KeyStroke} ${SingleKey}`;

type Key = KeyStroke | AlternativeKeys | KeyChord;
 *
 * useKeyMap(element, {
 *  key: (event, meta?) => void
 *  key: {
 *    command: (event, meta?) => void,
 *    when: (e) => boolean
 *  },
 *  [key, key]: () => 
 *  'key key': ...
 *  key: {
 *    key: () => void
 *  }
 *
 * })
 *
 */
```