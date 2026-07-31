# Deus e Sentido — Devocional Anual

Site estático (sem build, sem dependências) do devocional diário **Deus e Sentido**,
por Dr. Eduardo D'Angelo Mimessi — 366 meditações de sabedoria cristã e espiritualidade
evangélica, acompanhadas de **13 temas de estudo** sobre a Reforma Protestante,
as Cinco Solas e a vida cristã.

Publicado em **https://deusesentido.com.br**

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | a página inteira — interface, estilos e lógica |
| `assets/dias.js` | as 366 meditações (`window.MESES` e `window.DIAS`) |
| `assets/estudos.js` | os 13 temas de estudo (`window.ESTUDOS`) |
| `sw.js` | service worker — funcionamento offline e instalação como app |
| `manifest.webmanifest` | manifesto PWA |
| `og-image.png` | imagem de pré-visualização em WhatsApp, redes e buscadores (1200×630) |
| `robots.txt` / `sitemap.xml` | indexação por buscadores |
| `CNAME` | domínio próprio |

## Endereços internos (links diretos)

O site usa rotas por hash. Qualquer uma pode ser compartilhada:

- `https://deusesentido.com.br/` — abre a meditação do dia de hoje
- `https://deusesentido.com.br/#/dia/3-15` — meditação de 15 de março
- `https://deusesentido.com.br/#/estudos` — lista de temas de estudo
- `https://deusesentido.com.br/#/estudo/sola-fide` — um estudo específico

## Editar as meditações

Todo o texto está em `assets/dias.js`. Cada dia é um objeto:

```js
{ m:mês, d:dia, sem:semana, st:"título da semana", tipo, rot:"rótulo",
  tit:"título", ref:"versículo", txt:"texto do versículo",
  med:"meditação", pra:"prática", ora:"oração" }
```

Cada mês tem tema e frase-âncora em `window.MESES`.

**Parágrafos:** a meditação (`med`) é quebrada automaticamente em 2 ou 3 parágrafos.
Para controlar a quebra manualmente, basta inserir uma linha em branco (`\n\n`) no texto —
o site respeita a divisão que você escrever.

## Editar os estudos

Todo o texto está em `assets/estudos.js`. Cada estudo é um objeto:

```js
{
  id:"sola-fide",          // usado na URL: #/estudo/sola-fide
  m:[3],                   // meses do devocional a que se associa
  eixo:"As Cinco Solas",   // agrupamento na página de estudos
  tit:"…", sub:"…",        // título e subtítulo
  ref:"Romanos 3:28", txt:"…",              // versículo de abertura
  blocos:[{ h:"subtítulo", p:["parágrafo","parágrafo"] }],
  chaves:["…"],            // Pontos-chave
  perg:["…"],              // Para meditar
  leitura:["…"]            // Leia na Bíblia
}
```

O campo `m` faz a ligação nos dois sentidos: o estudo aparece como
*Aprofunde neste tema* nas meditações daquele mês, e o estudo traz um botão
de volta para as meditações correspondentes.

Os rótulos curtos exibidos sob o nome do mês na navegação ficam na constante
`MES_SUB`, dentro do `index.html`.

## Correspondência entre meses e estudos

| Mês | Tema do devocional | Estudo associado |
|---|---|---|
| Janeiro | Feitos para o Sentido | A Reforma e a pergunta que a moveu |
| Fevereiro | A Palavra que Aguça a Consciência | Sola Scriptura |
| Março | Justificados pela Graça | Sola Fide |
| Abril | Graça e Liberdade Responsável | Sola Gratia · Graça barata e graça preciosa |
| Maio | Cristo e o Encontro | Solus Christus |
| Junho | O Sagrado no Cotidiano | Soli Deo Gloria |
| Julho | Vocação e Trabalho | Vocação: todo trabalho é chamado |
| Agosto | A Fé Diante do Sofrimento | Teologia da cruz e teologia da glória |
| Setembro | Responsabilidade | Reformada e arminiana · Graça barata |
| Outubro | Comunidade de Sentido | A igreja e seus movimentos |
| Novembro | Sabedoria para Contar os Dias | Testemunhas da fé |
| Dezembro | O Horizonte Eterno e o Envio | O horizonte eterno e o envio |

## Publicar no GitHub Pages

1. Suba estes arquivos mantendo a estrutura (`index.html` na raiz, `assets/` ao lado).
2. **Settings → Pages → Source: `main` / `/root`** → Save.
3. O site fica em `https://edumimessi.github.io/manhacomDeus/`.

### Domínio próprio

1. O arquivo `CNAME` na raiz já contém `deusesentido.com.br`.
2. No painel do domínio (DNS), aponte para o GitHub Pages:
   - 4 registros **A** para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - ou um **CNAME** `www` → `edumimessi.github.io`
3. Em Settings → Pages, marque **Enforce HTTPS**.

### Ao publicar uma atualização

Suba a versão do cache em `sw.js` (`const CACHE = 'deus-e-sentido-v6'` → `v7`).
Sem isso, quem já instalou o app continuará vendo a versão antiga.

## Atalhos de teclado

| Tecla | Ação |
|---|---|
| `←` `→` | meditação anterior / próxima |
| `/` | abrir a busca |
| `Esc` | fechar a busca |
