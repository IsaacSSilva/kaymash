export function normalizeShortcuts(shortcuts) {
    return shortcuts.map((s) => ({
        ...s,
        range: s.range && s.range.length > 0 ? s.range : ["global"],
    }));
}
