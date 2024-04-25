# onDespezzas

O onDespezzas é uma aplicação desenvolvida para facilitar o gerenciamento de despesas pessoais, permitindo um controle eficiente e organizado dos gastos.

## Requisitos

Antes de iniciar, certifique-se de ter instalado em seu sistema:

- Node.js v20 ou superior

## Configuração do Ambiente

Para executar este projeto, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env`:

```bash
# Configurações de Ambiente
NODE_ENV="development"
PORT=3333

# Configurações do Banco de Dados
DATABASE_URL="file:./dev.db"

# Configurações do JWT
JWT_SECRET="your-secret"
```

## Início Rápido

Siga os passos abaixo para configurar e executar o projeto localmente:

### Clonar o Repositório

```bash
git clone git@github.com:luizsmatos/on-despezzas-api.git
```

### Navegar até o Diretório do Projeto

```bash
cd on-despezzas-api
```

### Instalar as Dependências

```bash
npm install
```

### Executar as Migrações do Prisma

```bash
npm run db:migrate
```

### Iniciar o Servidor de Desenvolvimento

```bash
npm run start:dev
```

## Testes

Para executar os testes unitários e de integração, utilize os seguintes comandos:

```bash
# Executar todos os testes unitários
npm test

# Executar testes unitários em modo de observação
npm run test:watch

# Executar testes de integração
npm run test:e2e
```

## Documentação da API

A documentação da API está disponível via Swagger. Para acessá-la, execute o seguinte comando e visite o link fornecido:

```bash
npm run start:dev
http://localhost:3333/docs
```

