import { useEffect } from "react";
import { Callback, KeyCombo } from "./Types/keymash.type";

const activeCombos = new Set<string>();
const pressedKeys = new Set<string>();
const shortcutMap = new Map<string, { combo: KeyCombo; callback: Callback }>();

function comboId(combo: KeyCombo): string {
  return combo.slice().sort().join("+");
}

function sameCombo(a: KeyCombo, b: KeyCombo): boolean {
  if (a.length !== b.length) return false;
  const aSorted = [...a].sort();
  const bSorted = [...b].sort();
  return aSorted.every((k, i) => k === bSorted[i]);
}

function handleKeyDown(event: KeyboardEvent) {
  pressedKeys.add(event.key);

  for (const [id, { combo, callback }] of shortcutMap.entries()) {
    const allPressed = combo.every((k) => pressedKeys.has(k));
    const isPartOfCombo = combo.includes(event.key);

    if (allPressed && !activeCombos.has(id)) {
      event.preventDefault();
      activeCombos.add(id);
      callback();
      break;
    }

    if (activeCombos.has(id) && isPartOfCombo) {
      event.preventDefault();
      break;
    }
  }
}

function handleKeyUp(event: KeyboardEvent) {
  pressedKeys.delete(event.key);

  for (const [id, { combo }] of shortcutMap.entries()) {
    const anyStillPressed = combo.some((k) => pressedKeys.has(k));
    if (!anyStillPressed) {
      activeCombos.delete(id);
    }
  }
}

let listenersAttached = false;
function attachListeners() {
  if (listenersAttached) return;
  window.addEventListener("keydown", handleKeyDown, { passive: false });
  window.addEventListener("keyup", handleKeyUp);
  listenersAttached = true;
}

function detachListeners() {
  if (!listenersAttached) return;
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
  listenersAttached = false;
  shortcutMap.clear();
  activeCombos.clear();
  pressedKeys.clear();
}

export function useKeymash(combo: KeyCombo, callback: Callback) {
  useEffect(() => {
    const id = comboId(combo);

    // Registra o combo
    if (!shortcutMap.has(id)) {
      shortcutMap.set(id, { combo, callback });
    }

    attachListeners();

    return () => {
      shortcutMap.delete(id);
      // Se não tiver mais atalhos registrados, remove tudo
      if (shortcutMap.size === 0) {
        detachListeners();
      }
    };
  }, [combo.join("+"), callback]);
}
