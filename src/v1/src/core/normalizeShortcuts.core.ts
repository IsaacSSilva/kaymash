import { Shortcut } from "../types/schema.types";

export function normalizeShortcuts(shortcuts: Shortcut[]): Shortcut[] {
  return shortcuts.map((s) => ({
    ...s,
    range: s.range && s.range.length > 0 ? s.range : ["global"],
  }));
}
