# GHStars
Aplicação que mostra os repositórios em que o usuário deu estrela

# Projeto
O projeto está disponível na URL:

``https://joaobgusmao.github.io/ghstars``

# Dependências
O projeto não tem dependências para produção. Todas as dependências são de desenvolvimento. A lista pode ser vista aqui:

* babel-core: ^6.26.0
* babel-plugin-transform-object-rest-spread": ^6.26.0
* babel-preset-env: ^1.6.0
* css-loader: 0.28.7
* extract-text-webpack-plugin: ^3.0.0
* node-sass: ^4.5.3,
* sass-loader: ˆ6.0.6
* style-loader: ^0.18.2
* webpack: ^3.6.0

...ou aqui: https://joaobgusmao.github.io/ghstars?ghuser=joaobgusmao

Para compilar js e css, usei o webpack, e já que usei as specs da es6, foi necessário alguns plugins do 'babel' para fazer a tradução do código para que o mesmo funcione nos interpretadores de js dos navegadores.

# Rodar no Localhost
A aplicação roda independênte de um servidor específico, como node, nginx, apache... Portanto, basta clonar o projeto e acessar o arquivo index.html
``git@github.com:JoaoBGusmao/ghstars.git``

# Instalando as dependências
``git@github.com:JoaoBGusmao/ghstars.git
cd ghstars
npm i
``

# Fazendo edições
Requer nodejs! As alterações no código CSS e JavaScript do projeto precisam ser compiladas. Para isso, utilizo o webpack.
``webpack --watch``
O comando acima fará com que o webpack (anteriormente instalado com npm) fique 'escutando' as alterações nos arquivos. Assim que qualquer alteração for feita, o webpack vai compilar novamente o projeto e exportar as saídas para ./dist

# O Código
Optei por utilizar as specs da es6 para que eu pudesse escrever um código mais mordeno, legível e que pudesse distribuir as tarefas para cada 'classe' com sua respectiva responsabilidade no projeto.
O projeto é constituído por algumas classes, e cada classe corresponde a um arquivo na pasta src/js, tendo como entry point o app.js.

## app.js
A responsabilidade do app.js é dar início à aplicação. Ele quem define qual usuário deve ser escolhido, coloca a página em estado de carregamento, faz a chamada para a API do github, e passa para a classe RepoCard.

## repo-card.js
A classe RepoCard lida com todo tipo de responsabilidade referente à exibição das cards de repositório, e suas respectivas modificações, como filtros e ordenações.

## templating.js
No momento da criação das cards, foi vista a necessidade da criação de um template para que a card pudesse ser replicada para todos os resultados. Para isso, abstraí a criação e manipulação de templates para facilitar o uso tanto nas cards, quanto na renderização dos filtros de linguagens.

## ghemojis.js
Alguns repositórios usam emojis em suas descrições, e ficavam em modo texto quando renderizados nas cards. Para dar um visual melhor, esta classe foi criada. Ela faz a chamada para a API de emojis do github usando o ApiWorker, e faz o replace no texto pelas respectivas imagens de emojis. Para evitar chamadas desnecessárias à API, o resultado é salvo no localStorage.

## api-worker.js
É a classe que tem a responsabilidade de consultar dados externos através de chamadas ajax, e retornar a resposta para os métodos especificados em callback. Para chamadas http, foi usado o XMLHttpRequest do JavaScript