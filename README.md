# Free My TV para Samsung (Tizen)

A tela inicial do [Free My TV](https://github.com/simbasjungles/free-my-tv), sem anúncios, adaptada para TVs Samsung
com Tizen e rodando como módulo do [TizenBrew](https://github.com/reisxd/TizenBrew).

O que tem:

- **Para você:** três destaques por hora, em alta na semana e lançamentos, só dos apps que a sua TV tem. Abas Explorar,
  Filmes e Séries.
- **Prateleira** com os seus apps de streaming. OK abre o app.
- **↓ na prateleira** abre a gaveta com o clima de hora em hora, nascer e pôr do sol e as cotações (Bitcoin,
  Ethereum, Solana e dólar).
- **Claro de dia, escuro à noite**, seguindo o pôr do sol da sua cidade.
- **Todos os apps** e **Configurações** nos botões do canto.
- **Protetor de tela** com as fotos dos destaques e um relógio.

O que **não** dá para fazer no Tizen (diferente do Android): virar a tela inicial de verdade. O botão Home do controle
continua abrindo o Smart Hub da Samsung. Veja o passo 5 para chegar bem perto disso.

---

## Instalação (uns 20 minutos)

### 1. Instale o TizenBrew na TV

Siga o [guia oficial](https://github.com/reisxd/TizenBrew/blob/main/docs/README.md). Para TVs de 2017 a 2023 (a sua
é de 2023, Tizen 7), o jeito mais fácil é abrir `https://tizentube.vercel.app/installer` no navegador da TV e
apertar **Install TizenBrew**. Se não funcionar, use o **TizenBrew Updater** no computador, que está no mesmo guia.

Se o TizenBrew reclamar de "Daemon SDB", ative o Modo Desenvolvedor: em **Apps**, digite `1 2 3 4 5` no controle,
ligue o **Developer mode**, coloque **127.0.0.1** em *Host PC IP* e reinicie a TV segurando o botão de ligar até
aparecer o logo da Samsung.

### 2. Coloque esta pasta no GitHub

O TizenBrew baixa os módulos do GitHub.

1. Crie uma conta em [github.com](https://github.com) (é grátis).
2. Clique em **New repository**, dê o nome `free-my-tv-tizen` e deixe como **Public**.
3. Na página do repositório, clique em **uploading an existing file** e arraste **tudo o que está dentro desta pasta**
   (`package.json`, `app`, `src`, `tools`, `README.md`, `LICENSE`). Depois clique em **Commit changes**.

O importante é que o `package.json` fique na raiz do repositório.

### 3. Adicione o módulo no TizenBrew

1. Abra o TizenBrew na TV e vá no **gerenciador de módulos** (no menu do topo ou pelo botão **verde** do controle).
2. Escolha **Adicionar módulo GitHub**.
3. Digite `SEU-USUARIO/free-my-tv-tizen` (trocando pelo seu usuário do GitHub) e confirme.
4. Volte e abra **Free My TV**.

### 4. Ligue as recomendações (chave do TMDB)

1. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/signup) e abra **Configurações → API**.
2. Peça uma chave de desenvolvedor (é grátis e leva dois minutos).
3. Na TV, abra o Free My TV, vá no botão de **engrenagem → Chave do TMDB** e digite a **Chave da API** (a curta, com 32
   letras e números).

Dica: o app **SmartThings** no celular tem um teclado para a TV, o que facilita muito.

A chave fica guardada só na TV. **Não coloque a chave no `config.js`**, porque o repositório é público.

Na mesma tela dá para trocar a cidade, a moeda, o idioma, o visual e o tempo do protetor de tela.

### 5. Faça a TV abrir direto nele

1. No TizenBrew, abra **Configurações** no menu do topo, entre em **Autolaunch** e escolha **Free My TV**.
   Assim o TizenBrew já abre direto na tela nova.
2. Na TV, procure em **Configurações → Geral → Recursos inteligentes** (o nome muda um pouco entre modelos):
   - ligue **Executar automaticamente o último app**;
   - desligue **Iniciar Smart Hub automaticamente**.

Agora, se você desligar a TV com o Free My TV aberto, ela volta nele quando ligar.

---

## Atualizar

Mudou algo no GitHub? O TizenBrew pega os arquivos pelo jsDelivr, que guarda cópias por até 12 horas. Para forçar a
atualização na hora, abra no navegador:

```
https://purge.jsdelivr.net/gh/SEU-USUARIO/free-my-tv-tizen@main/app/index.html
https://purge.jsdelivr.net/gh/SEU-USUARIO/free-my-tv-tizen@main/package.json
```

## Personalizar

- **Padrões** (cidade, moeda, ordem da prateleira): `app/config.js`. Dá para editar direto no GitHub, sem build.
- **Apps da prateleira e cores:** a lista `SERVICES` em `src/tv.js`.
- **Visual:** `src/style.css`. Tudo é medido numa tela de 1920 × 1080.
- Depois de mudar algo em `src/`, rode `node tools/build.js`. Ele gera o `app/index.html`, que tem tudo dentro de um
  arquivo só.

### Testar no computador

Abra `app/index.html` no navegador. Sem a TV, ele entra em **modo demo**, com destaques, clima e cotações de mentira.
Use as setas, Enter e Esc (Voltar). Adicione `?real` no endereço para usar os dados de verdade.

## Se algo não funcionar

- **A prateleira está vazia:** a TV pode não ter informado a lista de apps. Abra **Configurações → Apps encontrados na
  TV**. Se a lista estiver vazia, me avise. Se os apps aparecerem com outro nome, o id de cada um aparece embaixo, e
  você pode colocá-lo em `appIds` no `app/config.js`.
- **"Não consegui abrir o app":** confira o id em **Apps encontrados na TV**.
- **Recomendações não aparecem:** confira a chave e a internet da TV. Use **Configurações → Atualizar recomendações
  agora**.

## Créditos

- Baseado no [Free My TV](https://github.com/simbasjungles/free-my-tv) (MIT), de simbasjungles.
- Roda no [TizenBrew](https://github.com/reisxd/TizenBrew), de Reis Can.
- Este produto usa a API do TMDB, mas não é endossado nem certificado pelo [TMDB](https://www.themoviedb.org/).
- Clima por [Open-Meteo.com](https://open-meteo.com/) (CC BY 4.0). Cotações da API pública da [Binance](https://www.binance.com/).
- Ícones: [Material Symbols](https://fonts.google.com/icons) (Apache 2.0). Fonte: [Inter](https://rsms.me/inter/) (SIL OFL 1.1).
- Sem vínculo com a Samsung nem com nenhum serviço de streaming. Os nomes dos apps pertencem aos seus donos.
