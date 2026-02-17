# 🚀 Quick Start Guide

## Para Novos Desenvolvedores

### Setup Inicial (5 minutos)

```bash
# 1. Clone o repositório
git clone <URL>
cd meet-a-rol-main

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
# Crie .env e adicione:
# VITE_SUPABASE_URL=sua_url
# VITE_SUPABASE_ANON_KEY=sua_key

# 4. Execute
npm run dev
```

### Leitura Essencial

1. **ARCHITECTURE.md** (15 min) - Entenda a estrutura
2. **STYLE_GUIDE.md** (10 min) - Aprenda os padrões
3. **features/hangouts/** (5 min) - Veja exemplo prático

## Para Desenvolvedores Existentes

### Novo Padrão de Desenvolvimento

#### ❌ Antes (Não faça mais assim)
```typescript
// Lógica no componente
const [data, setData] = useState([]);
useEffect(() => {
  fetch().then(setData);
}, []);
```

#### ✅ Agora (Faça assim)
```typescript
// Use hooks da feature
const { data, isLoading } = useHangouts();
```

### Criando Nova Feature

```bash
# 1. Crie a estrutura
mkdir -p src/features/minha-feature/{api,hooks,types,components}

# 2. Crie os arquivos base
# - api/minha-feature.api.ts
# - hooks/useMinhaFeature.ts
# - types/minha-feature.types.ts
# - index.ts

# 3. Consulte features/hangouts/ como exemplo
```

### Adicionando Nova Página

```typescript
// 1. Crie o arquivo em src/pages/
// src/pages/MinhaPage.tsx

// 2. Adicione rota lazy em src/app/routes.tsx
const MinhaPage = lazy(() => import('@/pages/MinhaPage'));

// 3. Adicione no Routes
<Route 
  path="/minha-rota" 
  element={
    <ProtectedWrapper>
      <MinhaPage />
    </ProtectedWrapper>
  } 
/>
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor dev (porta 8080)

# Build
npm run build           # Produção
npm run build:dev       # Dev build
npm run preview         # Preview build

# Quality
npm run lint            # ESLint
npm run test            # Testes
npm run test:watch      # Testes watch mode

# Type checking
npx tsc --noEmit        # Verificar tipos
```

## Estrutura de Imports

```typescript
// ✅ Correto - Use path aliases
import { Button } from '@/components/ui/button';
import { useHangouts } from '@/features/hangouts';
import { formatDate } from '@/shared/utils';

// ❌ Errado - Imports relativos profundos
import { Button } from '../../../components/ui/button';
```

## Padrões Rápidos

### API Call
```typescript
// features/minha-feature/api/minha-feature.api.ts
export const minhaFeatureApi = {
  async getAll(): AsyncResult<Item[]> {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*');
      
      if (error) return createError(new AppError(error.message));
      return createSuccess(data);
    } catch (error) {
      return createError(new AppError('Erro inesperado'));
    }
  }
};
```

### Hook
```typescript
// features/minha-feature/hooks/useMinhaFeature.ts
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const result = await minhaFeatureApi.getAll();
      if (!result.success) throw result.error;
      return result.data;
    },
  });
};
```

### Componente
```typescript
// features/minha-feature/components/ItemCard.tsx
interface ItemCardProps {
  item: Item;
  onAction?: () => void;
}

export const ItemCard = ({ item, onAction }: ItemCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {item.description}
      </CardContent>
      <CardFooter>
        <Button onClick={onAction}>Ação</Button>
      </CardFooter>
    </Card>
  );
};
```

### Página
```typescript
// pages/MinhaPage.tsx
import { useItems } from '@/features/minha-feature';
import { Container, PageHeader } from '@/shared/ui/layouts';
import { Loading, ErrorState, EmptyState } from '@/shared/ui';

export default function MinhaPage() {
  const { data: items, isLoading, error, refetch } = useItems();
  
  if (isLoading) return <Loading fullScreen />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!items?.length) return <EmptyState />;
  
  return (
    <Container>
      <PageHeader title="Minha Página" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </Container>
  );
}
```

## Componentes Compartilhados

### Loading
```typescript
<Loading />                           // Default
<Loading fullScreen />                // Tela cheia
<Loading text="Carregando..." />      // Com texto
<Loading size="lg" />                 // Tamanho grande
```

### Estados
```typescript
<ErrorState 
  title="Erro" 
  message="Descrição"
  onRetry={handleRetry}
/>

<EmptyState
  title="Nenhum item"
  message="Crie seu primeiro item"
  action={<Button>Criar</Button>}
/>
```

### Layouts
```typescript
<Container maxWidth="xl">
  <PageHeader 
    title="Título"
    description="Descrição"
    action={<Button />}
  />
  
  <Stack direction="column" spacing="md">
    {/* Conteúdo */}
  </Stack>
  
  <Grid cols={3} gap="lg">
    {/* Items */}
  </Grid>
</Container>
```

## Utilitários

### Datas
```typescript
import { formatDate, formatRelativeTime } from '@/shared/utils';

formatDate(new Date());              // "16/02/2026"
formatRelativeTime(new Date());      // "agora"
```

### Validação
```typescript
import { validateEmail, sanitizeInput } from '@/shared/utils';

if (!validateEmail(email)) {
  // Erro
}

const clean = sanitizeInput(userInput);
```

### Hooks
```typescript
import { useDebounce, useDisclosure } from '@/shared/hooks';

const debouncedValue = useDebounce(searchTerm, 300);
const { isOpen, open, close } = useDisclosure();
```

## Debugging

### React Query Devtools
```typescript
// Já configurado em modo dev
// Acesse pela UI no canto inferior esquerdo
```

### Logs
```typescript
// Use console apropriadamente
console.info('Info');     // Informações
console.warn('Aviso');    // Avisos
console.error('Erro');    // Erros

// Em produção, erros são capturados por ErrorBoundary
```

## Problemas Comuns

### Erro de Import
```typescript
// ❌ Erro: Cannot find module '@/features/...'
// Solução: Verifique tsconfig.json paths

// ❌ Erro: Circular dependency
// Solução: Use index.ts para exportações públicas
```

### React Query não atualiza
```typescript
// Invalide a query após mutation
const { mutate } = useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  }
});
```

### TypeScript errors
```typescript
// Rode type check
npx tsc --noEmit

// Não use 'any'
// Use tipos específicos ou 'unknown'
```

## Checklist de Code Review

- [ ] Código segue STYLE_GUIDE.md
- [ ] Props tipadas corretamente
- [ ] Erros tratados apropriadamente
- [ ] Loading states implementados
- [ ] Sem uso de `any`
- [ ] Imports usando path aliases
- [ ] Componentes pequenos e focados
- [ ] Lógica em hooks, não em componentes

## Recursos

- 📚 [ARCHITECTURE.md](./ARCHITECTURE.md)
- 📝 [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- 🔄 [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- 🎨 [UX_IMPROVEMENTS.md](./UX_IMPROVEMENTS.md)
- 📦 [features/hangouts/](./src/features/hangouts/)

## Dúvidas?

1. Consulte a documentação
2. Veja exemplos em `features/hangouts/`
3. Peça ajuda ao time

---

<div align="center">
  <p><strong>Bem-vindo ao RolêMatch! 🎉</strong></p>
  <p>Código limpo, arquitetura sólida, UX excepcional</p>
</div>
