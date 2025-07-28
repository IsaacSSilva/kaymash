import { useEffect, useRef } from "react";
import { filterShortcutsByRange, isComboPressed, } from "../core/matchShortcut.core";
import { normalizeShortcuts } from "../core/normalizeShortcuts.core";
import { KeySet } from "../utils/keySet.util";
export function useKeymashList(shortcuts, options) {
    const activeKeys = useRef(new KeySet());
    const activeRanges = options?.activeRanges ?? ["global"];
    const normalizedShortcuts = normalizeShortcuts(shortcuts);
    useEffect(() => {
        function handleKeyDown(e) {
            if (activeKeys.current.has(e.key))
                return;
            activeKeys.current.add(e.key);
            const filteredShortcuts = filterShortcutsByRange(normalizedShortcuts, activeRanges);
            for (const shortcut of filteredShortcuts) {
                if (isComboPressed(shortcut.combo, activeKeys.current.getKeys())) {
                    e.preventDefault();
                    shortcut.action();
                    break;
                }
            }
        }
        function handleKeyUp(e) {
            activeKeys.current.remove(e.key);
        }
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            activeKeys.current.clear();
        };
    }, [normalizedShortcuts, activeRanges]);
}
