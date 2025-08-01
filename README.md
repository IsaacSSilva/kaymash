# Keymash

<!-- ![Logo](/keymash.png) -->

Keymash é uma biblioteca JavaScript/TypeScript para gerenciamento de atalhos de teclado em aplicações web. Ela oferece hooks para React que permitem registrar e gerenciar combinações de teclas (key combos), além de fornecer utilitários para personalizar o comportamento de atalhos em diferentes contextos.

## Instalação

Adicione ao seu projeto via npm:

```bash
npm install keymash
```

## Principais Funcionalidades

- **Registro de atalhos de teclado** com callbacks customizados.
- **Gerenciamento de múltiplos atalhos** e escopos (ranges) ativos.
- **Normalização e filtragem de atalhos** por contexto.
- **Hooks prontos para uso em React**.

## API

### 1. useKeymash

Registra um atalho de teclado global que dispara um callback quando a combinação for pressionada.

```typescript
import { useKeymash } from "keymash";

useKeymash(["Control", "k"], () => {
  // Função executada ao pressionar Control + K
});
```

**Parâmetros:**

- `combo: string[]` – Array de teclas que formam o atalho (ex: `["Control", "k"]`).
- `callback: () => void` – Função chamada quando o atalho for ativado.

### 2. useKeymashList

Gerencia uma lista de atalhos, permitindo múltiplos atalhos e escopos customizados.

```typescript
import { useKeymashList } from "keymash";

const shortcuts = [
  {
    combo: ["Control", "s"],
    action: () => { /* salvar */ },
    range: ["editor"],
    description: "Salvar documento"
  },
  {
    combo: ["Control", "p"],
    action: () => { /* abrir busca */ },
    range: ["global"],
    description: "Abrir busca"
  }
];

useKeymashList(shortcuts, { activeRanges: ["editor"] });
```

**Parâmetros:**

- `shortcuts: Shortcut[]` – Lista de atalhos a serem registrados.
- `options?: UseKeymashListOptions` – Opções, como ranges ativos.

**Tipo `Shortcut`:**

```typescript
interface Shortcut {
  combo: string[];
  action: () => void;
  range?: string[];
  description?: string;
}
```

**Tipo `UseKeymashListOptions`:**

```typescript
interface UseKeymashListOptions {
  activeRanges?: string[];
}
```

### 3. Funções Utilitárias

#### filterShortcutsByRange

Filtra atalhos conforme ranges ativos.

```typescript
filterShortcutsByRange(shortcuts, activeRanges);
```

#### isComboPressed

Verifica se todos os elementos de um combo estão pressionados.

```typescript
isComboPressed(combo, pressedKeys);
```

#### normalizeShortcuts

Garante que todos os atalhos tenham range definido (ou "global" por padrão).

```typescript
normalizeShortcuts(shortcuts);
```

### 4. Utilitário KeySet

Classe para gerenciar o estado das teclas pressionadas.

```typescript
const keySet = new KeySet();
keySet.add("a");
keySet.has("a"); // true
keySet.remove("a");
keySet.clear();
```

## Estrutura dos Arquivos

- `src/v0/keymash.js` e `.d.ts` – Hook para atalhos simples.
- `src/v1/hooks/useKeymashList.js` e `.d.ts` – Hook para múltiplos atalhos e ranges.
- `src/core/` – Funções utilitárias para filtragem e normalização.
- `src/types/` – Tipos TypeScript para combos, ranges e atalhos.
- `src/utils/keySet.util.js` – Classe auxiliar para armazenar teclas pressionadas.

## Exemplos

### Atalho global simples

```typescript
useKeymash(["Escape"], () => {
  // Fecha modal ou executa outra ação
});
```

### Múltiplos atalhos com ranges

```typescript
useKeymashList([
  {
    combo: ["Control", "b"],
    action: () => {/* negrito */},
    range: ["editor"]
  },
  {
    combo: ["Control", "i"],
    action: () => {/* itálico */},
    range: ["editor"]
  }
], { activeRanges: ["editor"] });
```

## Observações

- Os atalhos são sensíveis ao contexto dos ranges, permitindo escopos como "global" ou "editor".
- Os hooks devem ser usados dentro de componentes React.
- Combinações de teclas são normalizadas para garantir consistência.

## Licença

Consulte o arquivo LICENSE para informações de licença.
