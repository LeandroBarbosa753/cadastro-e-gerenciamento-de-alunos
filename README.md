# 🧑‍🎓 Projeto cadastro e gerenciamento de alunos

![Repository size](https://img.shields.io/github/repo-size/LeandroBarbosa753/cadastro-e-gerenciamento-de-alunos?color=blue) &nbsp;
![Pull request](https://img.shields.io/static/v1?label=PR&message=welcome&color=green)&nbsp;
[![Minimum node.js version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org)

## 🔍 Sobre o Projeto

#### Este projeto foi desenvolvido com o objetivo de criar um sistema de cadastro e gerenciamento de alunos com ferramentas e tecnologias aprendidas na disciplina de Back-End.

### Descrição:

- Cadastro de alunos (nome, matrícula, turma).
- Edição e exclusão de cadastros.
- Listagem de todos os alunos.
- Consulta por nome ou matrícula.

## 🛠️ Tecnologias e Ferramentas Utilizadas

<p align="center">
 <a href="https://skillicons.dev">
    <img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/adonisjs/adonisjs-original.svg" width="50" height="50" alt="AdonisJS" />
    <a href="https://skillicons.dev/icons?i=nodejs"><img src="https://skillicons.dev/icons?i=nodejs" width="50" height="50" alt="Node.js" /></a>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="50" height="50" alt="TypeScript" />
    <a href="https://skillicons.dev/icons?i=npm"><img src="https://skillicons.dev/icons?i=npm" width="50" height="50" alt="npm" /></a>
    <a href="https://skillicons.dev/icons?i=yarn"><img src="https://skillicons.dev/icons?i=yarn" width="50" height="50" alt="Yarn" /></a>
     <img src="https://raw.githubusercontent.com/prettier/prettier-logo/e638a708b41a176a46cfbbf9d3ed4910132df265/images/prettier-icon-light.svg" width="50" height="50" alt="Prettier" />
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" width="50" height="50" alt="ESLint" />
    <a href="https://skillicons.dev/icons?i=docker"><img src="https://skillicons.dev/icons?i=docker" width="50" height="50" alt="Docker" /></a>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="50" height="50" alt="PostgreSQL" />
    <img src="https://avatars.githubusercontent.com/u/114530840?v=4" width="50" height="50" alt="Usebruno" />
    <img src="https://github.com/bush1D3v/navarro_blog_api/assets/133554156/de030e87-8f12-4b6b-8c75-071bab8526a5" width="50" height="50" alt=".env" />
</a>
</p>

# 📦 Configuração do Ambiente de Desenvolvimento

Primeiro, confira se o `node` está acima da versão 14:

```bash
node -v
```

Para criar o projeto, use:

```bash
npm init adonis-ts-app@latest api
```

Caso não dê certo com `npm`, utilize o `yarn`. Primeiro, instale o `yarn` utilizando o comando:

```bash
npm install -g yarn
```

Depois, execute o comando para criar o projeto:

```bash
yarn create adonis-ts-app api
```

Selecione a estrutura de projeto “api”, coloque o nome de “api”, coloque `true` para o uso de eslint e `true` para o uso de prettier.

## 🗄️ Parte de Database

Instalação do Lucid, que é o ORM que o Adonis trabalha:

```bash
yarn add @adonisjs/lucid@18.4.0
```

Depois de instalar a biblioteca, é necessário configurá-la:

```bash
node ace configure @adonisjs/lucid
```

Selecione o `PostgreSQL` utilizando a barra de espaço. Depois, escolha onde quer que sejam exibidas as informações de variáveis de ambiente, no `terminal` ou no `browser`.

Como vou utilizar PostgreSQL, é necessário incluir as variáveis no arquivo `env.ts`:

```typescript
PG_HOST: Env.schema.string({ format: 'host' }),
PG_PORT: Env.schema.number(),
PG_USER: Env.schema.string(),
PG_PASSWORD: Env.schema.string.optional(),
PG_DB_NAME: Env.schema.string(),
```

### 🐳 Criar um Banco de Dados no Docker

Inicialize o Docker e inicie o container:

```bash
docker start [CONTAINER_NAME] ou [CONTAINER_ID]
```

Depois, use `docker exec` para rodar o SQL no PostgreSQL:

```bash
docker exec -it postgres sql -U postgres
```

Então, crie uma database:

```sql
create database todo;
```

Para sair, use:

```sql
\q
```

Depois, coloque as informações no arquivo `.env`.

## 🔐 Autenticação

Instale a autenticação:

```bash
yarn add @adonisjs/auth@8.2.3
```

E também deve ser feita a configuração:

```bash
node ace configure @adonisjs/auth
```

Ele pergunta qual será o provedor: `Lucid` (ORM padrão do AdonisJS) ou `QueryBuilder`. No caso, utilize o `Lucid`.

Ele pergunta qual o tipo de tokens (Web, API tokens ou Basic Auth). Será utilizado o API tokens, que é uma melhoria do JWT.

Pergunta qual o nome do model que será utilizado para autenticação. O nome será `Adm`.
Pergunta se quer criar a migration de Adm

Pergunta onde gravar os tokens: no `Redis` (banco de dados de alto desempenho baseado em chave-valor) ou utilizar uma própria database. Como será utilizada uma database própria, criamos uma migration `api_tokens`.

Agora, replicar o modelo do banco de dados para a migration:

![modelo.png](modelo.png)

É necessário criar uma migration para alunos, usando o comando:

```bash
node ace make:model Alunos -c -m
```

Tambem necessário criar uma migration para alunos, usando o comando:

```bash
node ace make:model Turma -c -m
```

Poderia ter sido criado o model, o controller e a migration separadamente, mas com esse comando é criado tudo de uma vez só.

Depois, faça as alterações nos models `Adm.ts` , `Aluno.ts`e `Turma.ts` e faça o relacionamento entre as tabelas:

Aluno:

```
  @belongsTo(() => Turma)
  public turma: BelongsTo<typeof Turma>
```

Turma:

```
  @hasMany(() => Aluno)
  public alunos: HasMany<typeof Aluno>
```

Adm:

```
 @hasMany(() => Aluno)
  public alunos: HasMany<typeof Aluno>

  @hasMany(() => Turma)
  public turmas: HasMany<typeof Turma>

```

## 🔍 Acessando o PostgreSQL

Execute novamente o comando para entrar no PostgreSQL:

```bash
docker exec -it postgres sql -U postgres
```

Use o comando para abrir a database:

```bash
\c [NOME_DO_BANCO]
```

Após entrar no banco, execute:

```bash
\dt
```

Para mostrar quais tabelas estão no database.

Caso queira ver somente uma tabela, execute o comando:

```sql
\d [NOME_DA_TABELA]
```

## 🛠️ Criando Controller de Adm

```bash
node ace make:controller Adm -r
```

Importação do Adm para o controller:

```typescript
import User from 'App/Models/Adm'
```

Depois, faça as construções dos métodos.

O Adm precisa ser autenticado para verificar as permissoes de alterações de dados.

```bash
node ace make:controller Session -r
```

## 🚀 Criação das Rotas

### Criação das Rotas de Usuário e Autenticação

Utilizando o comando:

```bash
Route.resource('/adm', 'AdmsController').apiOnly()
```

Conseguimos criar as 5 rotas de uma vez só. Para visualizar as rotas, use o código abaixo:

```bash
node ace list:routes
```

## 🏃 Executando o Projeto

Para rodar o projeto, utilize o comando:

```bash
yarn dev
```

# 🔒 Criando Middleware de Autenticação

Ao criar os métodos do `/aluno` e da `/turma`, vamos criar um `middleware` de autenticação. Vamos entrar no arquivo `start/kernel` e registrar o middleware no final:

```typescript
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
})
```

Como é um resource, ele não consegue passar o ‘auth’ diretamente:

```typescript
Route.resource('/aluno', 'AlunosController').apiOnly()
Route.resource('/turma', 'TurmasController').apiOnly() // não dá certo assim
```

Precisamos criar um grupo por fora:

```typescript
Route.group(() => {
  Route.resource('/aluno', 'AlunosController').apiOnly()
  Route.resource('/turma', 'TurmasController').apiOnly()
}).middleware('auth')
```

## 🗝️ Criando Rotas de Autenticação

```typescript
Route.post('/session', 'SessionsController.store')
Route.delete('/session', 'SessionsController.destroy').middleware('auth')
```

## 📚 Referência

Para mais detalhes e guias sobre o AdonisJS, consulte a documentação oficial: [AdonisJS Documentation](https://v5-docs.adonisjs.com/guides/introduction).
