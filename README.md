# Deus e Sentido — Devocional Anual

Site estático (sem build, sem dependências) do devocional diário **Deus e Sentido**,
por Dr. Eduardo D'Angelo Mimessi — 366 meditações unindo a Logoterapia de Viktor Frankl
e a espiritualidade evangélica.

## Arquivos
- `index.html` — a página (interface, estilos e lógica)
- `assets/dias.js` — os dados das 366 meditações (`window.MESES` e `window.DIAS`)

## Publicar no GitHub Pages
1. Crie um repositório novo (ex.: `manhacomDeus`).
2. Suba estes arquivos mantendo a estrutura (`index.html` na raiz, `assets/dias.js`).
3. **Settings → Pages → Source: `main` / `/root`** → Save.
4. O site fica em `https://edumimessi.github.io/manhacomDeus/`.

## Domínio próprio
1. Crie um arquivo `CNAME` na raiz com o domínio, ex.: `cafecomsentido.com.br`
2. No painel do domínio (DNS), aponte para o GitHub Pages:
   - 4 registros **A** para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - ou um **CNAME** `www` → `edumimessi.github.io`
3. Em Settings → Pages, marque **Enforce HTTPS**.

## Editar o conteúdo
Todo o texto está em `assets/dias.js`. Cada dia é um objeto:
`{ m:mês, d:dia, sem:semana, st:"título da semana", tipo, rot:"rótulo", tit:"título",
   ref:"versículo", txt:"texto do versículo", med:"meditação", pra:"prática", ora:"oração" }`
Cada mês tem tema e frase-âncora em `window.MESES`.
