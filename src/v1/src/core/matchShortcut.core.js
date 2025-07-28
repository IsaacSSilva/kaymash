export function filterShortcutsByRange(shortcuts, activeRanges) {
    return shortcuts.filter((shortcut) => shortcut.range.some((r) => activeRanges.includes(r)));
}
export function isComboPressed(combo, pressedKeys) {
    return combo.every((k) => pressedKeys.has(k));
}
