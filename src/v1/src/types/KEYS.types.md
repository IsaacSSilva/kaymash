export type KeyCombo = string[]; // Exemplo: ["Control", "k"]
export type Action = () => void; // Exemplo: () => console.log("you pressed the following shortcut: Control + K")
export type Range = string; // Exemplo: ["Terminal", "Editor"]

/\* Description

### ✅ `export type KeyCombo = string[];`

**O que é?**
Um array de strings, onde cada string representa uma tecla que faz parte de um atalho de teclado.

**Exemplo:**

```ts
["Control", "k"][("Shift", "Alt", "P")];
```

**Pra que serve?**
Serve pra definir quais teclas devem ser pressionadas **juntas** para que uma ação seja disparada.
É literalmente o "combo" de teclas que o usuário vai apertar.

**Finalidade:**
Definir claramente as combinações de teclas que vão disparar funções. Sem isso, você não tem um atalho.

---

### ✅ `export type Action = () => void;`

**O que é?**
Uma função que **não recebe nenhum argumento** e **não retorna nada** (`void`), mas que é **executada quando o combo de teclas é detectado**.

**Exemplo:**

```ts
() => alert("🔍 Buscando...")
() => console.log("Você pressionou Control + K")
```

**Pra que serve?**
É o que **acontece** quando o atalho é ativado. É a função que você quer executar quando as teclas certas forem pressionadas.

**Finalidade:**
Definir a **ação real** disparada pelo atalho. Pode ser abrir um modal, mudar o foco, chamar uma API, abrir um terminal, o que você quiser.

---

### ✅ `export type Range = string;`

**O que é?**
Uma string que representa um **contexto de uso** do atalho.

**Exemplo:**

```ts
"global";
"editor";
"terminal";
"modal-search";
```

**Pra que serve?**
Serve pra limitar onde e quando um atalho pode ser usado.
Por exemplo:

- Um combo pode funcionar só no **editor**, mas não no **terminal**.
- Outro pode estar ativo **sempre**, se estiver no range `"global"`.

**Finalidade:**
Permitir controle **contextual** sobre os atalhos. Isso evita que você dispare ações em situações erradas, tipo abrir o buscador com `Ctrl+K` enquanto digita dentro de um input.

---

### Resumo maroto:

| Tipo       | Estrutura    | Pra que serve                                 |
| ---------- | ------------ | --------------------------------------------- |
| `KeyCombo` | `string[]`   | Define quais teclas formam o atalho           |
| `Action`   | `() => void` | Define o que acontece quando o atalho dispara |
| `Range`    | `string`     | Limita onde/quando o atalho pode ser usado    |
