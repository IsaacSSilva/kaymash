import { Range } from "../types/keys.types";
import { Shortcut } from "../types/schema.types";

export function filterShortcutsByRange(
  shortcuts: Shortcut[],
  activeRanges: Range[]
): Shortcut[] {
  return shortcuts.filter((shortcut) =>
    shortcut.range!.some((r) => activeRanges.includes(r))
  );
}

export function isComboPressed(
  combo: string[],
  pressedKeys: Set<string>
): boolean {
  return combo.every((k) => pressedKeys.has(k));
}
