# Cleber Ford — Mecânica Especializada Ford

Site institucional + **Central de Divulgação** (gerador de posts) para a oficina **Cleber Ford**.
Projeto estático em HTML, CSS e JavaScript puro — não precisa de banco de dados, build ou instalação.

---

## 1. O que está incluído

### Site institucional (`index.html`)
- Hero com identidade Ford, chamada para agendamento e avaliação
- Faixa com os modelos Ford atendidos
- 8 serviços + cartão de contato
- Seção “A oficina” com fotos e diferenciais
- Processo de atendimento em 4 etapas
- Banner de conversão
- Avaliações reais (nota 4,6 no Google, com link para os comentários)
- FAQ com acordeão
- Contato com formulário que monta a mensagem e abre o WhatsApp
- Mapa integrado, horários, endereço, telefone e WhatsApp
- Botão flutuante de WhatsApp
- Layout responsivo (desktop, tablet e celular)
- SEO: title, description, Open Graph, JSON-LD (AutoRepair) e sitemap
- Acessibilidade: skip link, foco visível, menu por teclado (ESC), textos alternativos

### Central de Divulgação (`divulgacao.html`)
**Como acessar:** no site, role até o rodapé e clique em **Central de Divulgação**.

- Site publicado: https://cleber-ford.vercel.app
- Central publicada: https://cleber-ford.vercel.app/sistema
- Atalho direto: https://cleber-ford.vercel.app/divulgacao.html

O arquivo `vercel.json` cria o atalho `/sistema` para a Central. Ao publicar em um domínio próprio, troque esses links no README e nos demais lugares indicados na seção de personalização.

Ferramenta interna para o dono da oficina divulgar os serviços sem depender de designer:
- **Gerador de posts** com 5 objetivos: serviço, promoção, dica, prova social e lembrete de revisão
- 9 serviços pré-cadastrados
- 3 tons de comunicação
- 3 formatos: **Feed 1080×1080**, **Story 1080×1920** e **Status 1080×1920**
- Gera **legenda pronta** com hashtags
- Gera **arte pronta em JPG** no próprio navegador (canvas), com logo Ford, serviço, oferta e contato
- Botões de copiar legenda, baixar arte, salvar e compartilhar no WhatsApp
- Histórico local com os últimos 8 posts salvos
- Planejamento com **7 ideias de conteúdo** para a semana (clique e o formulário já vem preenchido)
- Dados da oficina editáveis e salvos no navegador
- Página com `noindex` para não aparecer no Google

> A arte e a legenda são geradas **no navegador**. Nada é enviado para nenhum servidor.

---

## 2. Como visualizar

### Opção simples
Abra o arquivo `index.html` com dois cliques (Chrome, Edge ou Firefox).

### Opção recomendada (servidor local)
No terminal, dentro da pasta do projeto:

```bash
npx serve .
```

Ou, no VS Code, use a extensão **Live Server**.

> O projeto funciona em `file://`, mas um servidor local garante que fontes, mapa e download de imagens se comportem exatamente como no site publicado.

---

## 3. Estrutura de arquivos

```
├── index.html              → site institucional
├── divulgacao.html         → central de divulgação (ferramenta interna)
├── css/
│   ├── site.css            → estilos do site
│   └── painel.css          → estilos do painel
├── js/
│   ├── site.js             → menu, FAQ, formulário e configuração do WhatsApp
│   ├── painel.js           → gerador de legendas e artes
│   └── logo-data.js        → logo Ford em base64 (usada no canvas)
├── assets/img/             → fotos, logo, favicon e imagem de compartilhamento
├── robots.txt
└── sitemap.xml
```

---

## 4. Dados oficiais já aplicados

| Campo | Valor usado no site |
|---|---|
| Nome | Cleber Ford |
| Endereço | R. Expedicionário Joaquim Borges, 105 – Belizandra, Lavras – MG, 37209-030 |
| Telefone / WhatsApp | (35) 3821-0992 |
| Horário | Segunda a sexta, das 8h às 18h. Sábado e domingo: fechado |
| Atendimento | Linha Ford e veículos similares |
| Avaliação | Nota 4,6 no Google, com dezenas de avaliações |
| Site publicado | https://cleber-ford.vercel.app |

Não há e-mail, Instagram ou Facebook confirmados — por isso o site não exibe esses canais.

### 4.1 WhatsApp e telefone
O número fica centralizado em `js/site.js`:

```js
const WHATSAPP_NUMBER = "553538210992"; // 55 + DDD + número, só dígitos
```

Os links `wa.me` e `tel:` do `index.html` também usam `553538210992` / `+553538210992`.
Se o número deixar de ter WhatsApp, troque os links `https://wa.me/...` por `tel:+553538210992` e ajuste os botões de chamada.

### 4.2 Se mudar algum dado
Busque e substitua em `index.html`:

| O que trocar | Onde aparece |
|---|---|
| `R. Expedicionário Joaquim Borges, 105 – Belizandra` | contato, rodapé, JSON-LD, links do mapa |
| `Lavras – MG, 37209-030` | contato, rodapé, JSON-LD |
| `Seg a sex, 8h às 18h · Sáb e dom, fechado` | topo, contato, rodapé, JSON-LD |
| `(35) 3821-0992` / `+553538210992` | topo, botões, contato, rodapé, JSON-LD |
| `https://www.google.com/maps/...` | links “Ver no mapa”, “Traçar rota” e iframe |

> O iframe do mapa usa o endereço dentro da URL (`q=R.%20Expedicion...`). Atualize também esse trecho, ou troque a URL pelo embed oficial do Google Maps da oficina.

### 4.3 Domínio
O site está publicado em `https://cleber-ford.vercel.app/`. Essa URL está em:
- `index.html` → `canonical`, Open Graph e JSON-LD
- `robots.txt` → linha do Sitemap
- `sitemap.xml` → `<loc>`

Ao configurar um domínio próprio, troque `cleber-ford.vercel.app` por ele nesses arquivos.

### 4.4 Fotos
As imagens atuais são de banco gratuito (Unsplash) e servem como demonstração.
Substitua por fotos reais da oficina, da equipe e dos carros — isso aumenta muito a confiança e a conversão.
Mantenha os mesmos nomes de arquivo ou atualize os caminhos no HTML.

### 4.5 Avaliações
A seção de avaliações mostra apenas a **nota real 4,6 no Google** e leva para os comentários.
Não foram publicados depoimentos inventados. Se quiser incluir comentários de clientes, use avaliações reais e identificadas (Google, WhatsApp ou autorização do cliente).

### 4.6 Central de Divulgação
A Central já vem com os dados corretos: telefone `(35) 3821-0992`, WhatsApp `553538210992` e cidade `Lavras – MG`.
O campo Instagram ficou **vazio** porque não há perfil confirmado — preencha apenas se a oficina tiver um.

Esses dados ficam salvos no navegador daquele computador/celular. Se alguma configuração antiga aparecer, clique em **Dados da oficina → Restaurar padrão**.
O histórico também é local (últimos 8 posts), no armazenamento do navegador.

> A central não tem login. Ela está com `noindex`, mas se o site for publicado publicamente, qualquer pessoa que souber a URL consegue acessar. Se quiser restringir, proteja o arquivo/pasta com senha na hospedagem ou mantenha a ferramenta apenas no computador da oficina.

---

## 5. Como usar a Central de Divulgação no dia a dia

1. Abra `divulgacao.html`.
2. Escolha o formato (Feed para o Instagram, Story/Status para os verticais).
3. Escolha o objetivo do post.
4. Selecione o serviço. Se quiser, informe o modelo do carro e uma oferta.
5. Escolha o tom: **Confiável**, **Direto** ou **Descontraído**.
6. Clique em **Gerar post e arte**.
7. Revise a legenda (pode editar).
8. Clique em **Baixar arte** e **Copiar legenda**.
9. Publique no Instagram/Facebook/WhatsApp.
10. Clique em **Salvar** para guardar no histórico e reutilizar depois.

**Dica de frequência:** 3 a 4 posts por semana no feed e stories nos dias de atendimento.
Sempre termine a legenda com uma chamada para o WhatsApp.

### Formatos
- **Feed:** 1080 × 1080 px — Instagram/Facebook feed.
- **Story / Status:** 1080 × 1920 px — stories do Instagram e status do WhatsApp.

A imagem é baixada em JPG. O texto da legenda inclui automaticamente as hashtags.

---

## 6. Publicação do site

O projeto é 100% estático e está publicado no Vercel:
- Site: https://cleber-ford.vercel.app
- Central: https://cleber-ford.vercel.app/sistema

Para republicar:

```bash
vercel deploy --prod --yes --project cleber-ford
```

### Outras opções

#### Netlify Drop
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arraste a pasta do projeto.
3. Configure o domínio próprio, se houver.

### GitHub Pages
1. Crie um repositório e envie os arquivos.
2. Em **Settings → Pages**, selecione a branch principal.
3. Aponte o domínio personalizado.

### Hospedagem tradicional (Hostinger, KingHost, etc.)
Envie o conteúdo da pasta para `public_html` via FTP/gerenciador de arquivos.

> Após publicar, troque as URLs de domínio no HTML e envie `robots.txt` e `sitemap.xml`.
> Use **HTTPS** para o botão “Copiar legenda” funcionar com a API moderna de clipboard (há fallback para navegadores antigos).

---

## 7. Observações importantes

- **Marca Ford:** o símbolo e a marca Ford são propriedade da Ford Motor Company. Use este material apenas se a oficina tiver autorização para se apresentar como especializada Ford. O rodapé já inclui um aviso de que o site é de uma oficina independente.
- **LGPD:** o formulário não grava dados em banco; ele apenas monta uma mensagem e abre o WhatsApp. Não há cookies de análise nem rastreamento.
- **Sem backend:** toda a persistência da Central de Divulgação é local (`localStorage`). Limpar os dados do navegador apaga o histórico e as configurações.
- **Internet:** Google Fonts, mapa e links do WhatsApp precisam de conexão. O restante do site funciona offline.
- **Imagens:** as fotos de demonstração vêm do Unsplash (licença gratuita). Substitua por fotos próprias para evitar imagens genéricas e reforçar a marca.

---

## 8. Checklist final antes de entregar ao cliente

- [x] WhatsApp e telefone corretos em `js/site.js` e nos textos visíveis
- [x] Endereço, horários e cidade conferidos (Lavras – MG)
- [x] Domínio atualizado em canonical, Open Graph, JSON-LD, robots e sitemap
- [x] Avaliações reais (nota 4,6 no Google) e ausência de depoimentos inventados
- [ ] Fotos reais da oficina
- [ ] Logo Ford usado com autorização
- [ ] Testado no celular (menu, formulário, WhatsApp)
- [ ] Testado o download e a cópia de legenda na Central de Divulgação
- [ ] Google Meu Negócio criado/atualizado com o link do site
- [ ] HTTPS ativo após publicar

---

Feito para a **Cleber Ford** — seu Ford em boas mãos.
