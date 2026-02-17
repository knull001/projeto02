# Guia de Migração - Nova Arquitetura

## Visão Geral

Este guia explica como migrar código existente para a nova arquitetura profissional do RolêMatch.

## Estrutura Atual vs Nova

### Antes (Estrutura Antiga)
```
src/
├── components/       # Todos os componentes misturados
├── contexts/        # Contexts
├── hooks/           # Hooks misturados
├── pages/           # Páginas
└── integrations/    # Supabase
```

### Depois (Nova Estrutura)
```
src/
├── app/            # Aplicação principal
├── features/       # Features isoladas
├── entities/       # Modelos de domínio
├── shared/         # Código compartilhado
└── widgets/        # Widgets compostos
```

## Migração Passo a Passo

### 1. Migrando Hooks

#### Antes
```typescript
// src/hooks/useHangouts.ts
export const useHangouts = () => {
  const [hangouts, setHangouts] = useState([]);
  // ... lógica misturada
};
```

#### Depois
```typescript
// src/features/hangouts/hooks/useHangouts.ts
import { hangoutsApi } from '../api/hangouts.api';
import { QUERY_KEYS } from '@/shared/config/constants';

export const useHangouts = (filters?: HangoutFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.HANGOUTS, filters],
    queryFn: async () => {
      const result = await hangoutsApi.getAll(filters);
      if (!result.success) throw result.error;
      return result.data;
    },
  });
};
```

**Passos:**
1. Crie a pasta `features/[nome-feature]/hooks/`
2. Extraia a lógica de API para `api/`
3. Use React Query para gerenciamento de estado servidor
4. Adicione tipos apropriados

### 2. Migrando API Calls

#### Antes
```typescript
// Chamada direta no componente
const fetchHangouts = async () => {
  const { data, error } = await supabase
    .from('hangouts')
    .select('*');
  
  if (error) {
    console.error(error);
    return;
  }
  
  setHangouts(data);
};
```

#### Depois
```typescript
// src/features/hangouts/api/hangouts.api.ts
export const hangoutsApi = {
  async getAll(filters?: HangoutFilters): AsyncResult<Hangout[]> {
    try {
      let query = supabase.from('hangouts').select('*');
      
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      
      const { data, error } = await query;
      
      if (error) {
        return createError(new AppError(error.message, 'FETCH_ERROR'));
      }
      
      return createSuccess(data as Hangout[]);
    } catch (error) {
      return createError(new AppError('Unexpected error', 'UNEXPECTED'));
    }
  }
};
```

**Passos:**
1. Crie `features/[nome]/api/[nome].api.ts`
2. Agrupe todas as chamadas relacionadas
3. Use o padrão `Result<T, E>` para type-safety
4. Trate todos os erros apropriadamente

### 3. Migrando Componentes

#### Antes
```typescript
// src/components/HangoutCard.tsx
export const HangoutCard = ({ hangout }: any) => {
  const [loading, setLoading] = useState(false);
  
  const handleJoin = async () => {
    setLoading(true);
    // Lógica de API aqui
    const { error } = await supabase
      .from('hangout_participants')
      .insert({ ... });
    setLoading(false);
  };
  
  return <div>...</div>;
};
```

#### Depois
```typescript
// src/features/hangouts/components/HangoutCard.tsx
import { useJoinHangout } from '../hooks/useHangouts';
import { Hangout } from '../types/hangout.types';

interface HangoutCardProps {
  hangout: Hangout;
  onJoinSuccess?: () => void;
}

export const HangoutCard = ({ hangout, onJoinSuccess }: HangoutCardProps) => {
  const { mutate: joinHangout, isPending } = useJoinHangout();
  
  const handleJoin = () => {
    joinHangout(hangout.id, {
      onSuccess: () => {
        onJoinSuccess?.();
      },
    });
  };
  
  return (
    <Card>
      {/* ... */}
      <Button onClick={handleJoin} disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </Card>
  );
};
```

**Passos:**
1. Mova para `features/[nome]/components/`
2. Adicione tipos para props
3. Extraia lógica para hooks
4. Use hooks customizados ao invés de API direta
5. Remova estado desnecessário

### 4. Migrando Páginas

#### Antes
```typescript
// src/pages/Index.tsx
export default function Index() {
  const [hangouts, setHangouts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchHangouts();
  }, []);
  
  const fetchHangouts = async () => {
    // ... lógica de fetch
  };
  
  if (loading) return <div>Carregando...</div>;
  
  return (
    <div>
      {hangouts.map(h => <HangoutCard key={h.id} hangout={h} />)}
    </div>
  );
}
```

#### Depois
```typescript
// src/pages/Index.tsx
import { useHangouts } from '@/features/hangouts';
import { HangoutCard } from '@/features/hangouts/components/HangoutCard';
import { Loading, ErrorState, EmptyState } from '@/shared/ui';
import { Container, PageHeader } from '@/shared/ui/layouts';

export default function Index() {
  const { data: hangouts, isLoading, error, refetch } = useHangouts();
  
  if (isLoading) return <Loading fullScreen text="Carregando rolês..." />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!hangouts?.length) {
    return <EmptyState title="Nenhum rolê encontrado" />;
  }
  
  return (
    <Container>
      <PageHeader title="Rolês Disponíveis" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hangouts.map(h => (
          <HangoutCard key={h.id} hangout={h} />
        ))}
      </div>
    </Container>
  );
}
```

**Passos:**
1. Use hooks de features ao invés de lógica própria
2. Use componentes compartilhados (Loading, ErrorState)
3. Use componentes de layout (Container, PageHeader)
4. Remova estado local desnecessário
5. Simplifique condicionais de renderização

### 5. Migrando Types

#### Antes
```typescript
// Tipos espalhados ou inline
const hangout: any = ...;

// Ou types locais em cada arquivo
interface Hangout {
  id: string;
  title: string;
  // ...
}
```

#### Depois
```typescript
// src/features/hangouts/types/hangout.types.ts
import { Database } from '@/integrations/supabase/types';

export type HangoutDB = Database['public']['Tables']['hangouts']['Row'];

export interface Hangout extends Omit<HangoutDB, 'created_at'> {
  created_at: Date;
  creator?: UserProfile;
  participants_count: number;
}

export interface CreateHangoutInput {
  title: string;
  description: string;
  category: string;
  // ...
}
```

**Passos:**
1. Centralize tipos em `features/[nome]/types/`
2. Estenda tipos do banco (Supabase)
3. Crie tipos específicos para Input/Output
4. Exporte através do `index.ts` da feature

## Checklist de Migração

### Para cada Feature

- [ ] Criar estrutura de pastas
  ```
  features/[nome]/
    ├── api/
    ├── components/
    ├── hooks/
    ├── types/
    ├── utils/
    └── index.ts
  ```

- [ ] Migrar tipos
  - [ ] Criar `types/[nome].types.ts`
  - [ ] Definir interfaces Input/Output
  - [ ] Exportar em `index.ts`

- [ ] Migrar API
  - [ ] Criar `api/[nome].api.ts`
  - [ ] Implementar CRUD operations
  - [ ] Usar padrão `Result<T, E>`
  - [ ] Tratar todos os erros

- [ ] Migrar Hooks
  - [ ] Criar `hooks/use[Nome].ts`
  - [ ] Usar React Query
  - [ ] Adicionar feedback (toasts)
  - [ ] Invalidar queries apropriadamente

- [ ] Migrar Componentes
  - [ ] Mover para `components/`
  - [ ] Adicionar tipos para props
  - [ ] Usar hooks ao invés de API direta
  - [ ] Remover lógica de negócio

- [ ] Atualizar imports
  - [ ] Atualizar páginas
  - [ ] Atualizar outros componentes
  - [ ] Testar tudo

## Exemplo Completo: Feature de Friends

### 1. Estrutura
```
features/friends/
├── api/
│   └── friends.api.ts
├── components/
│   ├── FriendCard.tsx
│   └── FriendsList.tsx
├── hooks/
│   └── useFriends.ts
├── types/
│   └── friend.types.ts
└── index.ts
```

### 2. Types
```typescript
// features/friends/types/friend.types.ts
export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  friend: UserProfile;
}

export interface SendFriendRequestInput {
  friend_id: string;
}
```

### 3. API
```typescript
// features/friends/api/friends.api.ts
export const friendsApi = {
  async getAll(): AsyncResult<Friend[]> { ... },
  async sendRequest(input: SendFriendRequestInput): AsyncResult<Friend> { ... },
  async acceptRequest(id: string): AsyncResult<Friend> { ... },
  async rejectRequest(id: string): AsyncResult<void> { ... },
};
```

### 4. Hooks
```typescript
// features/friends/hooks/useFriends.ts
export const useFriends = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FRIENDS],
    queryFn: async () => {
      const result = await friendsApi.getAll();
      if (!result.success) throw result.error;
      return result.data;
    },
  });
};

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: SendFriendRequestInput) => {
      const result = await friendsApi.sendRequest(input);
      if (!result.success) throw result.error;
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FRIENDS] });
      toast.success('Solicitação enviada!');
    },
  });
};
```

### 5. Componente
```typescript
// features/friends/components/FriendCard.tsx
interface FriendCardProps {
  friend: Friend;
}

export const FriendCard = ({ friend }: FriendCardProps) => {
  const { mutate: acceptRequest } = useAcceptFriendRequest();
  
  return (
    <Card>
      <Avatar src={friend.friend.avatar_url} />
      <p>{friend.friend.name}</p>
      {friend.status === 'pending' && (
        <Button onClick={() => acceptRequest(friend.id)}>
          Aceitar
        </Button>
      )}
    </Card>
  );
};
```

### 6. Export
```typescript
// features/friends/index.ts
export * from './types/friend.types';
export * from './api/friends.api';
export * from './hooks/useFriends';
export { FriendCard } from './components/FriendCard';
export { FriendsList } from './components/FriendsList';
```

## Dicas de Migração

1. **Migre uma feature por vez** - Não tente migrar tudo de uma vez
2. **Mantenha funcionalidade** - Certifique-se que tudo funciona antes de prosseguir
3. **Delete código old** - Remova código antigo após migrar
4. **Atualize imports** - Use find-replace para atualizar imports
5. **Teste tudo** - Teste cada feature após migração

## Prioridades de Migração

1. ✅ Hangouts (Exemplo já criado)
2. Auth
3. Profile
4. Friends
5. Chat
6. Notifications
7. Voice Call

## Suporte

Se tiver dúvidas durante a migração:
1. Consulte `ARCHITECTURE.md`
2. Consulte `STYLE_GUIDE.md`
3. Veja exemplos em `features/hangouts/`
