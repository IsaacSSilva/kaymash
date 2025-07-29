import type { Action, KeyCombo, Range } from "./keys.types";

export interface Shortcut {
  combo: KeyCombo;
  action: Action;
  range?: Range[]; // Opcional, se não definido é considerado ['global']
  description?: string; // Descrição opcional para documentação
}

export interface UseKeymashListOptions {
  activeRanges?: Range[]; // Quais ranges estão ativos, default ['global']
}
