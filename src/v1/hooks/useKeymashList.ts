"use client";

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
  const cooldownRef = useRef(new Set<string>());

  const activeRanges = options?.activeRanges ?? ["global"];
  const normalizedShortcuts = normalizeShortcuts(shortcuts);

  useEffect(() => {
    const filteredShortcuts = filterShortcutsByRange(
      normalizedShortcuts,
      activeRanges
    );

    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();

      if (activeKeys.current.has(key)) return;

      activeKeys.current.add(key);

      const pressed = activeKeys.current.getKeys();

      // Verifica se a tecla pressionada faz parte de algum combo registrado
      const isKeyPartOfAnyShortcut = filteredShortcuts.some((shortcut) =>
        shortcut.combo.some((comboKey) => comboKey.toLowerCase() === key)
      );

      // Se a tecla pressionada é parte de algum atalho, bloqueia o evento
      if (isKeyPartOfAnyShortcut) {
        e.preventDefault();
      }

      for (const shortcut of filteredShortcuts) {
        const normalizedCombo = shortcut.combo.map((k) => k.toLowerCase());
        const comboId = normalizedCombo.join("+");

        const comboIsPressed = isComboPressed(normalizedCombo, pressed);

        // Só dispara se combo completo e ainda não disparou nessa sequência
        if (comboIsPressed && !cooldownRef.current.has(comboId)) {
          shortcut.action();
          cooldownRef.current.add(comboId);
        }
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      activeKeys.current.remove(key);

      if (activeKeys.current.getKeys().size === 0) {
        cooldownRef.current.clear();
      }
    }

    function handleBlur() {
      activeKeys.current.clear();
      cooldownRef.current.clear();
    }

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("keyup", handleKeyUp, { capture: true });
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("keyup", handleKeyUp, { capture: true });
      window.removeEventListener("blur", handleBlur);
      activeKeys.current.clear();
      cooldownRef.current.clear();
    };
  }, [normalizedShortcuts, activeRanges]);
}
