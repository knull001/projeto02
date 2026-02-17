# RolêMatch

<div align="center">
  <h3>🎯 Conecte-se com pessoas para experiências reais</h3>
  <p>Plataforma moderna para criar e participar de encontros sociais seguros</p>
</div>

---

## 📋 Sobre o Projeto

RolêMatch é uma aplicação web profissional construída com as mais modernas tecnologias e melhores práticas de desenvolvimento. A plataforma permite que usuários criem e participem de encontros sociais (hangouts) de forma segura, organizada e intuitiva.

### ⭐ Diferenciais

- 🏗️ **Arquitetura Profissional** - Feature-Sliced Design + DDD
- 🎨 **UX Moderna** - Interface intuitiva e responsiva
- ⚡ **Performance Otimizada** - Lazy loading, code splitting, caching inteligente
- 🔒 **Type-Safe** - 100% TypeScript com strict mode
- 🎯 **Testável** - Arquitetura preparada para testes
- 📱 **PWA** - Instalável e funciona offline

## 🚀 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca UI com Concurrent Features
- **TypeScript 5** - Type-safety e melhor DX
- **Vite 5** - Build tool ultra-rápido

### State Management
- **TanStack Query v5** - Server state com cache inteligente
- **React Context** - Global UI state

### UI/UX
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Tailwind CSS** - Styling utility-first
- **Radix UI** - Primitivos acessíveis
- **Lucide React** - Ícones modernos

### Backend
- **Supabase** - Backend as a Service
  - Autenticação
  - PostgreSQL Database
  - Realtime subscriptions
  - Storage

### Ferramentas
- **ESLint** - Linting
- **Vitest** - Testing framework
- **React Router v6** - Roteamento
- **date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Camada de aplicação
│   ├── App.tsx            # Root component
│   └── routes.tsx         # Rotas com lazy loading
│
├── features/              # Features isoladas (Feature-Sliced Design)
│   ├── hangouts/         # Feature de rolês
│   │   ├── api/          # Lógica de API
│   │   ├── components/   # Componentes específicos
│   │   ├── hooks/        # Hooks customizados
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Public exports
│   ├── auth/             # Autenticação
│   ├── chat/             # Mensagens
│   ├── profile/          # Perfil
│   └── ...
│
├── entities/             # Entidades de domínio
│   ├── user/
│   ├── hangout/
│   └── message/
│
├── shared/               # Código compartilhado
│   ├── api/             # API client
│   ├── config/          # Configurações
│   ├── hooks/           # Hooks reutilizáveis
│   ├── types/           # Tipos compartilhados
│   ├── ui/              # Componentes UI genéricos
│   │   ├── ErrorBoundary.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorState.tsx
│   │   └── layouts/     # Container, Grid, Stack
│   └── utils/           # Funções utilitárias
│
├── widgets/             # Widgets compostos
├── components/          # Componentes UI (shadcn/ui)
├── contexts/            # React Contexts
├── pages/               # Páginas da aplicação
└── integrations/        # Integrações externas
```

## 🎯 Padrões e Arquitetura

### Feature-Sliced Design (FSD)

Cada feature é autocontida e independente:

```typescript
features/hangouts/
  ├── api/          - Chamadas de API com Result<T, E>
  ├── components/   - UI específica da feature
  ├── hooks/        - React Query hooks
  ├── types/        - TypeScript interfaces
  └── index.ts      - Exportações públicas
```

### Separação de Responsabilidades

- **API Layer**: Comunicação com backend, transformação de dados
- **Hooks Layer**: React Query, side effects, UI feedback
- **Component Layer**: Apenas UI e interação
- **Utils Layer**: Funções puras e helpers

### Type Safety

```typescript
// Result Type Pattern para error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Uso
const result = await hangoutsApi.getAll();
if (!result.success) {
  // Trate o erro
  return;
}
// Use os dados com segurança
const hangouts = result.data;
```

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn ou pnpm

### Setup

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd meet-a-rol-main

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do Supabase

# Execute em desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 📜 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run build:dev    # Build de desenvolvimento
npm run preview      # Preview da build
npm run lint         # Executar linter
npm run test         # Executar testes
npm run test:watch   # Testes em modo watch
```

## ✨ Funcionalidades

### Autenticação
- ✅ Login/Registro com email
- ✅ Autenticação social (Google, etc)
- ✅ Verificação de identidade
- ✅ Recuperação de senha

### Hangouts (Rolês)
- ✅ Criar novos encontros
- ✅ Filtrar por categoria
- ✅ Buscar por localização
- ✅ Sistema de check-in
- ✅ Avaliações e reputação
- ✅ Relatório de problemas

### Chat e Comunicação
- ✅ Chat privado
- ✅ Chat em grupo
- ✅ Chamadas de voz
- ✅ Notificações em tempo real

### Perfil
- ✅ Edição de perfil
- ✅ Sistema de badges
- ✅ Histórico de atividades
- ✅ Contatos de confiança

### Segurança
- ✅ Moderação de imagens (AI)
- ✅ Sistema de denúncia
- ✅ Botão SOS
- ✅ Compartilhamento de localização

## 🎨 Design System

O projeto utiliza um design system consistente com:

- **Tokens de Design**: Cores, espaçamentos, tipografia
- **Componentes Reutilizáveis**: Button, Card, Modal, etc
- **Layouts Responsivos**: Container, Grid, Stack
- **Estados Visuais**: Loading, Error, Empty

Ver [`STYLE_GUIDE.md`](./STYLE_GUIDE.md) para detalhes.

## 📚 Documentação

- [**ARCHITECTURE.md**](./ARCHITECTURE.md) - Arquitetura detalhada
- [**STYLE_GUIDE.md**](./STYLE_GUIDE.md) - Guia de estilo e convenções
- [**MIGRATION_GUIDE.md**](./MIGRATION_GUIDE.md) - Guia de migração
- [**UX_IMPROVEMENTS.md**](./UX_IMPROVEMENTS.md) - Melhorias de UX

## 🚢 Deploy

### Build

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

### Hospedagem

Recomendações:
- **Vercel** (recomendado) - Deploy automático
- **Netlify** - CI/CD integrado
- **Cloudflare Pages** - CDN global
- **AWS S3 + CloudFront** - Escalável

## 🧪 Testes (Planejado)

```bash
npm run test              # Executar todos os testes
npm run test:watch        # Modo watch
npm run test:coverage     # Relatório de cobertura
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenções de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

## 📄 Licença

Este projeto é de código aberto.

## 👥 Equipe

Desenvolvido com 💜 pela equipe RolêMatch

---

<div align="center">
  <p>Feito com React, TypeScript e muito ☕</p>
</div>
