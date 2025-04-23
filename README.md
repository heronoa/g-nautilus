# G-Nautilus (GitHub Explorer)

Este é um projeto de clonagem da interface do GitHub com funcionalidades para pesquisar e visualizar repositórios, perfis e problemas relacionados a usuários do GitHub. O projeto é construído com **Next.js** e utiliza **TypeScript**, **Jest** para testes, e **Axios** para requisições HTTP.

## Como rodar o projeto

### Pré-requisitos

Antes de rodar o projeto, você precisa ter as seguintes dependências instaladas:

- [Node.js](https://nodejs.org/) (recomenda-se a versão LTS)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/) (gerenciadores de pacotes)

### Passos para rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/github-clone.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd github-clone
   ```

3. Instale as dependências:

   Usando **npm**:

   ```bash
   npm install
   ```

   Ou usando **Yarn**:

   ```bash
   yarn install
   ```

4. Execute o projeto no modo de desenvolvimento:

   Usando **npm**:

   ```bash
   npm run dev
   ```

   Ou usando **Yarn**:

   ```bash
   yarn dev
   ```

5. Acesse a aplicação no navegador, no endereço:

   ```bash
   http://localhost:3000
   ```

### Scripts

- **`dev`**: Inicia o servidor de desenvolvimento.
- **`build`**: Gera a versão otimizada de produção.
- **`start`**: Executa a aplicação em modo de produção (deve ser usado após o build).
- **`test`**: Executa os testes unitários utilizando o Jest.
- **`lint`**: Executa a análise de código com ESLint.
- **`stylelint`**: Executa a verificação de estilo CSS com Stylelint.
  **`dev`**: Inicia o servidor de desenvolvimento do Next.js.
- **`generate:icons`**: Gera os componentes de ícones a partir de arquivos SVG usando o SVGR e os converte em TypeScript. Os ícones são extraídos da pasta `src/assets/icons` e o código gerado é colocado em `src/components/icons`.
- **`test`**: Executa todos os testes com o Jest.
- **`test:unit`**: Executa os testes unitários localizados na pasta `__tests__/unit`.
- **`test:watch`**: Executa os testes em modo de observação, permitindo que os testes sejam executados automaticamente à medida que o código é alterado.
- **`build`**: Cria a versão de produção da aplicação com o Next.js, realizando a compilação e otimização do código.
- **`start`**: Inicia o servidor de produção do Next.js, após a compilação.
- **`lint`**: Executa a verificação de código com o ESLint.

### Estrutura de Pastas

A estrutura de pastas deste projeto é organizada de maneira a manter o código modularizado e fácil de manter. Abaixo está uma descrição do que contém cada diretório e arquivo principal.

#### Raiz do projeto

- **`tsconfig.json`**: Arquivo de configuração do TypeScript.
- **`jest.config.ts`**: Configuração do Jest para testes.
- **`package.json`**: Contém as dependências e scripts do projeto.
- **`eslint.config.mjs`**: Configuração do ESLint para garantir a qualidade do código.
- **`components.json`**: Lista de componentes que são utilizados no projeto.
- **`README.md`**: Documento que descreve o projeto, como rodá-lo, suas funcionalidades e mais.
- **`.stylelintrc.json`**: Configuração do Stylelint para garantir a qualidade do CSS.
- **`jest.setup.ts`**: Arquivo de configuração do Jest antes de rodar os testes.
- **`next.config.ts`**: Configuração do Next.js.
- **`.gitignore`**: Arquivo que define quais arquivos ou pastas devem ser ignorados pelo Git.
- **`postcss.config.mjs`**: Configuração do PostCSS para processamento de CSS.
- **`commitlint.config.js`**: Arquivo de configuração para o CommitLint, garantindo que os commits sigam a convenção de mensagens.
- **`package-lock.json`**: Bloqueio das versões das dependências instaladas.

#### `__tests__/`

Este diretório contém os testes do projeto, organizados em diferentes categorias.

- **`mocks/`**: Contém mocks para simular as respostas das APIs durante os testes.
  - Arquivos como `axios.ts`, `index.ts`, `issues.ts`, entre outros, contêm dados simulados para ajudar nos testes unitários.
- **`unit/`**: Contém testes unitários.

  - Testes de hooks como `useProfiles.test.ts`, `useRepos.test.ts` e outros são feitos aqui.
  - Testes de utilitários como `normalizeRepos.test.ts`, `filterRepos.test.ts` também estão localizados neste diretório.

- **`e2e/`**: Testes end-to-end para verificar o comportamento completo da aplicação.

  - Inclui testes para diferentes páginas do projeto.

- **`integration/`**: Testes de integração para validar a interação entre diferentes módulos do sistema.
  - Contém testes de integração de hooks, componentes e serviços, como `githubService.test.ts`.

#### `src/`

Este é o diretório principal do código-fonte da aplicação.

- **`hooks/`**: Contém hooks personalizados usados ao longo do projeto.

  - Exemplo: `useRepoSearch.ts`, `useProfiles.ts` e outros.

- **`store/`**: Contém o estado global gerenciado pelo Zustand.

  - Exemplo: `SearchState.ts` e `AppState.ts` são responsáveis por gerenciar os estados da aplicação.

- **`utils/`**: Contém utilitários e funções auxiliares.

  - Funções para normalizar dados, como `normalizeIssues.ts`, `normalizeProfiles.ts`, e outras funções de ajuda.

- **`components/`**: Contém todos os componentes reutilizáveis do projeto, organizados por tipo ou funcionalidade.

  - **`Sections/`**: Contém seções que constituem os frames da interface do usuário como `RepositoryDetailsSection.tsx`, `ProfileRepoTabsSection.tsx`, etc.
  - **`Repository/`**: Componentes relacionados a repositórios, como `RepositoryCard.tsx` e `RepositoryFilterList.tsx`.
  - **`icons/`**: Contém ícones usados no projeto, como `Logo.tsx`, `ChevronDown3.tsx`, etc.
  - **`Layout/`**: Contém componentes de layout, como `BreadCrumbNav.tsx` e `Header.tsx`.
  - **`Frames/`**: Contém componentes que enquadram uma página toda de visualização, como `ProfileFrame.tsx` e `RepositoryFrame.tsx`.
  - **`Profile/`**: Componentes relacionados ao perfil do usuário, como `ProfileCard.tsx`.
  - **`ui/`**: Contém componentes de UI reutilizáveis, como `Button.tsx`, `Input.tsx`, `Drawer.tsx`, entre outros.

- **`assets/`**: Contém arquivos estáticos, como ícones SVG usados em diversos componentes.

  - Os arquivos de ícones estão organizados em `src/assets/icons/`.

- **`services/`**: Contém os serviços que interagem com APIs externas.

  - Exemplo: `githubService.ts` e `axiosGithubInstance.ts` são responsáveis pela comunicação com o GitHub API.

- **`app/`**: Contém a estrutura principal da aplicação Next.js.

  - Inclui arquivos como `globals.css`, que contém o estilo global da aplicação, e `layout.tsx`, que define o layout geral da aplicação.
  - Dentro de `profile/` estão as páginas dinâmicas para visualizar os detalhes de um perfil de usuário e repositórios.

- **`lib/`**: Contém bibliotecas e utilitários externos que podem ser usados em todo o projeto.

  - Exemplo: `utils.ts` contém funções auxiliares que são usadas em diversas partes do projeto.

- **`types/`**: Contém as definições de tipos do TypeScript para diferentes entidades do projeto, como `github.ts` para tipagem dos dados retornados pela API do GitHub.

#### `public/`

Este diretório contém arquivos públicos que são acessíveis diretamente, como imagens e ícones:

- Exemplo: `window.svg`, `vercel.svg`, `next.svg`, e outros arquivos estáticos.

## Features Implementadas

### Funcionalidades principais:

1. **Busca de Repositórios**: Pesquise por repositórios públicos do GitHub, filtrando por nome, descrição ou outros critérios.
2. **Perfil de Usuário**: Visualize o perfil de usuários do GitHub, com informações como nome, bio, repositórios públicos, seguidores e mais.
3. **Visualização de Repositórios**: Exibição detalhada de repositórios com seções para detalhes, issues e estatísticas.

### Tecnologias e Ferramentas

O projeto utiliza um conjunto robusto de tecnologias e ferramentas para garantir performance, escalabilidade e uma boa experiência de desenvolvimento. As principais incluem:

- **Next.js**: Framework React para desenvolvimento de aplicações web com renderização do lado servidor (SSR) e geração de sites estáticos (SSG). Utiliza técnicas avançadas de caching para otimizar a performance de carregamento e execução.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário, utilizada para criar a camada de visualização dinâmica da aplicação.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, proporcionando mais segurança e facilidades durante o desenvolvimento.
- **Tailwind CSS**: Framework CSS utilitário para criar interfaces de usuário responsivas e bem estruturadas de forma rápida e eficiente.
- **ShadCNUI**: Biblioteca de componentes UI acessíveis e altamente customizáveis, baseada em **Radix UI** e **Tailwind CSS**, que facilita a construção de componentes interativos com boas práticas de UX/UI e acessibilidade.
- **Zustand**: Biblioteca minimalista para gerenciamento de estado global de forma simples e eficiente. Utiliza uma API fácil de usar, sem a necessidade de boilerplate, proporcionando uma solução leve e de alto desempenho para gerenciar o estado da aplicação.
- **React Query**: Biblioteca para gerenciamento de dados assíncronos e cache de requisições, proporcionando uma maneira eficiente de lidar com dados que precisam ser carregados da API, com suporte a cache, sincronização automática e refetching.
- **Jest**: Framework de testes JavaScript para a execução de testes unitários e de integração, garantindo a qualidade e confiabilidade do código.
- **ESLint**: Ferramenta de análise estática de código para garantir a consistência do código JavaScript/TypeScript e evitar erros comuns.
- **Prettier**: Ferramenta de formatação de código para garantir que o código siga um estilo consistente e legível.
- **Husky**: Ferramenta para gerenciamento de hooks Git, utilizada para rodar scripts de verificação de código, como linting e testes, antes de commits e pushes, garantindo que o código enviado para o repositório esteja em conformidade com os padrões do projeto.

Essas tecnologias e ferramentas trabalham juntas para criar uma aplicação moderna, escalável e de alta performance, com um fluxo de desenvolvimento eficiente e sustentável.

### Regras para contribuições

- **Escreva testes**: Toda funcionalidade nova deve ser acompanhada de testes unitários.
- **Mantenha o código limpo**: Siga os padrões de estilo e boas práticas de código. Utilize o ESLint e o Prettier para manter a consistência.
- **Documente alterações importantes**: Caso altere ou adicione algo significativo, atualize a documentação no `README.md`.
- **Evite Pull Requests grandes**: Mantenha as alterações pequenas e específicas para facilitar a revisão.
- **Respeite o código de conduta**: Mantenha um ambiente de colaboração amigável e respeitoso.

## GitHub Actions e Husky

### CI/CD Pipeline

Este projeto utiliza **GitHub Actions** para configurar uma pipeline de integração e entrega contínuas (CI/CD). A pipeline é acionada automaticamente nas seguintes situações:

1. **Push para as branches principais** (`main` e `dev`).
2. **Pull requests** direcionados às branches principais.

A pipeline realiza os seguintes passos:

- **Checkout do código**: Faz o download do código do repositório.
- **Configuração do Node.js**: A pipeline configura o ambiente Node.js com a versão 18.
- **Instalação de dependências**: Instala todas as dependências necessárias para o funcionamento do projeto.
- **Execução de testes unitários**: Roda os testes definidos no projeto para garantir que as funcionalidades estão funcionando corretamente.
- **Análise de qualidade de código**: Executa a análise de código com ESLint para verificar a conformidade com as regras de estilo e melhores práticas.
- **Compilação do projeto**: Gera uma versão otimizada do código para produção.

Se alguma etapa falhar, o pipeline interrompe o processo e não realiza o deploy, garantindo que apenas código funcional seja implantado.

### Regras do Husky com Conventional Commits

Este projeto utiliza o **Husky** para garantir que os commits sigam a convenção de **Conventional Commits**. As convenções de commits ajudam a manter um histórico de commits consistente e mais fácil de entender.

### Regras de Commit

Este projeto segue a convenção de **Conventional Commits** para garantir um histórico de commits claro e organizado. As regras de commit ajudam a entender rapidamente o tipo de mudança que foi realizada no código, além de facilitar o versionamento e a geração de changelogs.

#### Estrutura do Commit:

Os commits devem seguir o formato:

```bash
tipo(escopo): mensagem
```

Onde:

- **tipo**: Especifica o tipo da mudança realizada no código. Exemplos de tipos incluem:

  - `feat`: para novas funcionalidades.
  - `fix`: para correções de bugs.
  - `chore`: para tarefas de manutenção ou configuração.
  - `docs`: para alterações apenas na documentação.
  - `style`: para mudanças que não afetam a lógica do código (ex: formatação).
  - `refactor`: para refatorações que não alteram a funcionalidade do código.
  - `test`: para adições ou modificações de testes.

- **escopo** (opcional): Especifica a área do código afetada pela mudança, como `auth`, `api`, `ui`, etc.

- **mensagem**: Uma descrição curta e clara do que foi alterado ou adicionado em até 100 letras.

#### Exemplos de Commit:

- **`feat(header): add responsive navbar`**: Adiciona uma barra de navegação responsiva.
- **`fix(button): correct alignment of primary button`**: Corrige o alinhamento do botão primário.
- **`chore(config): update webpack configuration`**: Atualiza a configuração do Webpack.
- **`docs(readme): update project setup instructions`**: Atualiza as instruções de configuração do projeto no README.
- **`style(css): fix padding issues in footer`**: Corrige problemas de padding no rodapé.
- **`refactor(api): improve error handling in user service`**: Melhora o tratamento de erros no serviço de usuários.
- **`test(auth): add tests for login functionality`**: Adiciona testes para a funcionalidade de login.

### Git Hooks com Husky

Este projeto utiliza o **Husky** para garantir que as convenções de commits sejam seguidas automaticamente antes de permitir qualquer commit ou push. O Husky configura hooks de Git que fazem a verificação dos commits de acordo com as regras do Conventional Commits.

#### Regras para os Commits:

1. **Commit Message Linting**: A mensagem de commit será validada para garantir que siga o padrão do Conventional Commits. Caso contrário, o commit será bloqueado e o desenvolvedor será avisado para corrigir a mensagem.
2. **Verificação de Testes**: Antes de permitir o commit, os testes unitários devem passar. Isso garante que o código não introduza falhas.

Com o Husky e o uso do **Commitlint**, qualquer tentativa de realizar um commit ou push com mensagens que não sigam o padrão será impedida, tornando a comunicação no histórico de commits mais eficaz.

## Contribuindo

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. **Faça um Fork** do repositório.
2. **Crie uma branch** para a sua feature ou correção. Exemplo:

   ```bash
   git checkout -b feature/alguma-feature
   ```

3. **Adicione suas alterações** e faça um commit:

   ```bash
   git add .
   git commit -m "feat(teste):Descrição das alterações"
   ```

4. **Push para o seu Fork**:

   ```bash
   git push origin feature/alguma-feature
   ```

5. **Abra um Pull Request** para o repositório original.
