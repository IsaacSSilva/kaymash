import { useEffect, useRef } from "react";
import {
  filterShortcutsByRange,
  isComboPressed,
} from "../core/matchShortcut.core";
import { normalizeShortcuts } from "../core/normalizeShortcuts.core";
import { Shortcut, UseKeymashListOptions } from "../types/schema.types";
import { KeySet } from "../utils/keySet.util";

export function useKeymashList(
  shortcuts: Shortcut[],
  options?: UseKeymashListOptions
) {
  const activeKeys = useRef(new KeySet());
  const activeRanges = options?.activeRanges ?? ["global"];
  const normalizedShortcuts = normalizeShortcuts(shortcuts);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (activeKeys.current.has(e.key)) return;

      activeKeys.current.add(e.key);

      const filteredShortcuts = filterShortcutsByRange(
        normalizedShortcuts,
        activeRanges
      );

      for (const shortcut of filteredShortcuts) {
        if (isComboPressed(shortcut.combo, activeKeys.current.getKeys())) {
          e.preventDefault();
          shortcut.action();
          break;
        }
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
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
