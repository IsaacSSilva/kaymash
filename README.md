# 🧠 Kaymash

**React Hook para criação de atalhos de teclado com bloqueio de eventos padrão.**  
Simples, direto e funcional.

---

## 🚀 Instalação

```bash
pnpm add kaymash
# ou
npm install kaymash
```

---

## 🧪 Exemplo de uso

```tsx
import { useKaymash } from "kaymash";

function App() {
  const [ativo, setAtivo] = useState(false);

  useKaymash(["Control", "k"], () => {
    setAtivo((prev) => !prev);
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

### `useKaymash(combo: string[], callback: () => void)`

| Parâmetro  | Tipo         | Descrição                                       |
| ---------- | ------------ | ----------------------------------------------- |
| `combo`    | `string[]`   | Lista de teclas que formam o atalho             |
| `callback` | `() => void` | Função executada quando o combo for pressionado |

🔒 O hook bloqueia os eventos padrão do navegador (como Ctrl+S, Ctrl+K) enquanto o combo está ativo.

---

## ✅ Recursos

- [x] Suporte a qualquer combinação de teclas (`["Control", "k"]`, `["Shift", "Alt", "s"]`, etc.)
- [x] Bloqueio confiável de eventos padrão (`preventDefault`)
- [x] Suporte à ordem invertida (pressionar `k` antes de `Control` funciona também)
- [x] Hook limpo com registro automático e cleanup
- [x] Sem dependências externas

---

## 📦 Requisitos

- React 18 ou 19
- TypeScript (opcional, mas recomendado)

---

## 📃 Licença

[MIT](./LICENSE)

---

Feito com café e teimosia por **S.Silva.**
