## ✅ `interface Shortcut`

```ts
export interface Shortcut {
  combo: KeyCombo;
  action: Action;
  range?: Range[];
  description?: string;
}
```

### 📌 O que é?

Um objeto que representa **um único atalho de teclado**: o combo de teclas, a ação que ele dispara, onde ele pode ser usado e uma descrição opcional.

---

### 🧱 Campos detalhados:

| Campo         | Tipo       | Obrigatório? | O que faz e por quê                                                                                                           |
| ------------- | ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `combo`       | `KeyCombo` | ✅ Sim       | Define quais teclas o usuário precisa pressionar. Ex: `["Control", "k"]`. Sem isso, não tem como detectar o atalho.           |
| `action`      | `Action`   | ✅ Sim       | Função executada quando o atalho é ativado. O coração do shortcut.                                                            |
| `range`       | `Range[]`  | ❌ Não       | Define em **quais contextos** esse atalho está ativo. Se não tiver, assume `["global"]`. Evita disparar ação em lugar errado. |
| `description` | `string`   | ❌ Não       | Explica o que o atalho faz. Útil pra gerar tooltips, docs ou exibir numa UI de ajuda.                                         |

---

### 🧠 Finalidade:

Representar **um atalho completo** de forma clara e segura.
Permite que o sistema saiba o _quê_, _quando_ e _onde_ disparar alguma coisa com base em teclas pressionadas.

---

### 🛠 Exemplo real de uso:

```ts
const shortcut: Shortcut = {
  combo: ["Control", "k"],
  action: () => console.log("Abrir busca"),
  range: ["global", "editor"],
  description: "Atalho para abrir a busca",
};
```

---

## ✅ `interface UseKeymashListOptions`

```ts
export interface UseKeymashListOptions {
  activeRanges?: Range[];
}
```

### 📌 O que é?

Um objeto que configura **quais ranges (contextos) estão ativos no momento**.

---

### 🧱 Campos detalhados:

| Campo          | Tipo      | Obrigatório? | O que faz e por quê                                                                                                                           |
| -------------- | --------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeRanges` | `Range[]` | ❌ Não       | Lista de contextos ativos. Se não passar nada, assume `["global"]`. Serve pra ativar/desativar atalhos dinamicamente conforme o estado da UI. |

---

### 🧠 Finalidade:

Controlar **quais atalhos devem funcionar** no momento atual.
Por exemplo, se você está com um modal aberto, pode ativar `["modal"]` e desativar atalhos do editor.

---

### 🛠 Exemplo real de uso:

```ts
useKeymashList(myShortcuts, {
  activeRanges: ["editor", "commandPalette"],
});
```

Isso faz com que apenas atalhos desses ranges sejam escutados. Nada fora disso será executado.

---

### 🧨 Resumo de ambos:

| Interface               | Representa o quê?                          | Usado para...                                   |
| ----------------------- | ------------------------------------------ | ----------------------------------------------- |
| `Shortcut`              | Um atalho individual (combo + ação + onde) | Definir comportamento e lógica dos atalhos      |
| `UseKeymashListOptions` | Configuração do hook de escuta             | Controlar quais atalhos estão ativos no momento |
