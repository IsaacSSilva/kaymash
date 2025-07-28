Perfeito! Aqui está o `README.md` atualizado com todas as melhorias do **keymash/v2**, **mantendo compatibilidade com a API antiga** via a função `useKaymash`.

---

````md
# 🧠 keymash

**React Hook para atalhos de teclado com suporte a múltiplos contextos (`range`), registro em massa e bloqueio automático de eventos nativos.**  
Agora modular, mais poderoso — **e ainda compatível com a versão antiga** via `useKaymash`.

---

## 🚀 Instalação

```bash
pnpm add keymash
# ou
npm install keymash
```
````

## Formas de utilizar

existe duas formas de usar sendo elas listando ou declarando diretamente.

- **useKeymashList**
- **useKaymash**

---

<br/>

## 🧪 useKeymashList (versão nova)

```tsx
import { useKeymashList } from "keymash";

function App() {
  useKeymashList(
    [
      {
        combo: ["Control", "k"],
        action: () => alert("🔍 Busca ativada!"),
        range: ["global"],
        description: "Abrir busca",
      },
      {
        combo: ["Shift", "p"],
        action: () => console.log("Apresentação ativada"),
        range: ["editor"],
        description: "Modo apresentação",
      },
    ],
    {
      activeRanges: ["global", "editor"],
    }
  );

  return <div>Atalhos ativados. Pressione e veja o que acontece!</div>;
}
```

---

## useKaymash

Você ainda pode usar a API simples e direta da versão anterior com `useKaymash`, se quiser manter o estilo enxuto:

```tsx
import { useKaymash } from "keymash";

function App() {
  const [ativo, setAtivo] = useState(false);

  useKaymash(["Control", "k"], () => {
    setAtivo(!ativo);
  });

  return (
    <div>
      <h1>{ativo ? "Ativado!" : "Desativado!"}</h1>
    </div>
  );
}
```

---

## ⚙️ API

### 🔹 `useKeymashList(shortcuts: Shortcut[], options?: UseKeymashListOptions)`

#### 🔑 Shortcut

| Campo         | Tipo         | Obrigatório | Descrição                                       |
| ------------- | ------------ | ----------- | ----------------------------------------------- |
| `combo`       | `string[]`   | ✅          | Teclas do atalho (ex: `["Control", "k"]`)       |
| `action`      | `() => void` | ✅          | Função executada ao disparar o combo            |
| `range`       | `string[]`   | ❌          | Contextos onde o atalho é válido (`["editor"]`) |
| `description` | `string`     | ❌          | Texto explicativo, útil para docs/UI            |

#### ⚙️ UseKeymashListOptions

| Campo          | Tipo       | Obrigatório | Descrição                                         |
| -------------- | ---------- | ----------- | ------------------------------------------------- |
| `activeRanges` | `string[]` | ❌          | Quais ranges estão ativos (default: `["global"]`) |

---

### 🔹 `useKaymash(combo: string[], callback: () => void)`

Compatível com versões anteriores. Registro simples de um atalho único.

---

## ✅ Recursos

- [x] Registro em massa de atalhos (`array de Shortcut`)
- [x] Suporte a contextos com `range`
- [x] `preventDefault` automático (bloqueia atalhos do navegador)
- [x] Suporte à ordem invertida de teclas
- [x] Cleanup automático no `unmount`
- [x] Arquitetura modular e extensível
- [x] Compatível com o hook antigo `useKaymash`

---

## 🔧 Dica avançada

Quer listar os atalhos registrados?

```ts
import { normalizeShortcuts } from "keymash/core";

console.table(normalizeShortcuts(shortcuts));
```

---

## 📦 Requisitos

- React 18 ou 19
- TypeScript (opcional, mas altamente recomendado)

---

## 📃 Licença

[MIT](./LICENSE)

---

Feito com café, paciência e teclado por **S.Silva.**
