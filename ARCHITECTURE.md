# Arquitetura do Projeto - RolêMatch

## Visão Geral

Este projeto segue uma arquitetura baseada em **Feature-Sliced Design (FSD)** e **Domain-Driven Design (DDD)**, promovendo:

- ✅ **Separação de responsabilidades** clara
- ✅ **Escalabilidade** e manutenibilidade
- ✅ **Reutilização** de código
- ✅ **Testabilidade** facilitada
- ✅ **Type-safety** rigoroso com TypeScript

## Estrutura de Pastas

```
src/
├── app/                    # Camada de aplicação
│   ├── App.tsx            # Componente raiz com providers
│   └── routes.tsx         # Configuração de rotas com lazy loading
│
├── features/              # Módulos de negócio (features)
│   ├── hangouts/         # Feature de encontros/rolês
│   │   ├── api/          # Chamadas à API
│   │   ├── components/   # Componentes específicos
│   │   ├── hooks/        # Hooks customizados
│   │   ├── types/        # Tipos TypeScript
│   │   ├── utils/        # Utilidades específicas
│   │   └── index.ts      # Exportações públicas
│   ├── auth/             # Feature de autenticação
│   ├── chat/             # Feature de chat
│   ├── profile/          # Feature de perfil
│   └── ...
│
├── entities/             # Entidades de domínio
│   ├── user/            # Entidade usuário
│   ├── hangout/         # Entidade hangout
│   └── message/         # Entidade mensagem
│
├── shared/              # Código compartilhado
│   ├── api/            # Cliente API e configurações
│   ├── config/         # Constantes e configurações
│   ├── hooks/          # Hooks reutilizáveis
│   ├── lib/            # Bibliotecas e integrações
│   ├── types/          # Tipos compartilhados
│   ├── ui/             # Componentes UI genéricos
│   └── utils/          # Funções utilitárias
│
├── widgets/            # Widgets complexos e compostos
│
├── components/         # Componentes legados (migrar gradualmente)
├── contexts/          # React Contexts
├── hooks/             # Hooks legados (migrar para shared/hooks)
├── pages/             # Páginas da aplicação
└── integrations/      # Integrações externas (Supabase, etc.)
```

## Princípios da Arquitetura

### 1. Feature-Sliced Design

Cada feature é autocontida e independente:

```typescript
features/
  hangouts/
    api/          - Lógica de API
    components/   - UI específica
    hooks/        - Hooks da feature
    types/        - Tipos específicos
    utils/        - Utilidades da feature
    index.ts      - Exportações públicas
```

**Regras:**
- Features não devem importar umas das outras diretamente
- Use `shared/` para código compartilhado
- Use `entities/` para modelos de domínio

### 2. Separação de Camadas

#### Camada de API (`api/`)
- Comunicação com backend
- Transformação de dados
- Tratamento de erros
- Type-safe com `Result<T, E>`

```typescript
// Exemplo: features/hangouts/api/hangouts.api.ts
export const hangoutsApi = {
  async getAll(filters?: HangoutFilters): AsyncResult<Hangout[]> {
    // Implementação
  }
};
```

#### Camada de Hooks (`hooks/`)
- Integração com React Query
- Gerenciamento de estado
- Side effects
- Feedback ao usuário (toasts)

```typescript
// Exemplo: features/hangouts/hooks/useHangouts.ts
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

#### Camada de Componentes (`components/`)
- Apenas UI e interação
- Sem lógica de negócio
- Props bem definidas
- Composição sobre herança

### 3. Error Handling

Sistema robusto de tratamento de erros:

```typescript
// Result Type Pattern
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Uso
const result = await hangoutsApi.getAll();
if (!result.success) {
  // Trate o erro
  console.error(result.error);
  return;
}
// Use os dados
const hangouts = result.data;
```

### 4. Type Safety

- **100% TypeScript** com strict mode
- Tipos gerados automaticamente do Supabase
- Interfaces bem definidas
- Validação em tempo de compilação

### 5. Performance

#### Lazy Loading
```typescript
// Carregamento sob demanda de páginas
const Login = lazy(() => import('@/pages/Login'));
```

#### Suspense Boundaries
```typescript
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

#### Error Boundaries
```typescript
<ErrorBoundary fallback={<ErrorState />}>
  <App />
</ErrorBoundary>
```

#### Memoization
```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(deps);
}, [deps]);
```

## Padrões de Código

### 1. Hooks Customizados

```typescript
// ✅ BOM: Hook reutilizável com responsabilidade única
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

### 2. Componentes

```typescript
// ✅ BOM: Props tipadas, componente focado
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
```

### 3. API Calls

```typescript
// ✅ BOM: Tratamento de erro consistente
export const fetchUser = async (id: string): AsyncResult<User> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      return createError(new AppError(error.message));
    }
    
    return createSuccess(data);
  } catch (error) {
    return createError(new AppError('Unexpected error'));
  }
};
```

## Utilitários Compartilhados

### Date Formatting
```typescript
import { formatRelativeTime, formatDateTime } from '@/shared/utils';

formatRelativeTime(new Date()); // "agora", "5min", "2h", "3d"
formatDateTime(new Date());     // "16/02/2026, 14:30"
```

### Validation
```typescript
import { validateEmail, validatePhone } from '@/shared/utils';

if (!validateEmail(email)) {
  // Mostrar erro
}
```

### Helpers
```typescript
import { debounce, throttle, truncateText } from '@/shared/utils';

const debouncedSearch = debounce(handleSearch, 300);
const truncated = truncateText(longText, 100);
```

## Gerenciamento de Estado

### React Query (Server State)
```typescript
// Query
const { data, isLoading, error } = useHangouts(filters);

// Mutation
const { mutate, isPending } = useCreateHangout();
mutate(hangoutData);
```

### Context API (Global UI State)
```typescript
// AuthContext para estado de autenticação
const { user, signIn, signOut } = useAuth();

// VoiceCallContext para chamadas de voz
const { startCall, endCall, isInCall } = useVoiceCall();
```

### Local State (Component State)
```typescript
const [isOpen, setIsOpen] = useState(false);
```

## Testes (Planejado)

```typescript
// Unit Tests
describe('formatRelativeTime', () => {
  it('should return "agora" for recent dates', () => {
    expect(formatRelativeTime(new Date())).toBe('agora');
  });
});

// Integration Tests
describe('useHangouts', () => {
  it('should fetch hangouts successfully', async () => {
    const { result } = renderHook(() => useHangouts());
    await waitFor(() => expect(result.current.data).toBeDefined());
  });
});
```

## Migração Gradual

A arquitetura nova coexiste com o código legado:

1. **Fase 1** ✅ - Estrutura base criada
2. **Fase 2** - Migrar features uma por vez
3. **Fase 3** - Migrar componentes compartilhados
4. **Fase 4** - Remover código legado

## Boas Práticas

### ✅ DO
- Use TypeScript strict mode
- Valide dados na entrada
- Trate erros adequadamente
- Use lazy loading para pages
- Memoize cálculos pesados
- Mantenha componentes pequenos e focados
- Documente código complexo

### ❌ DON'T
- Não use `any` - use tipos específicos
- Não ignore erros
- Não faça prop drilling excessivo
- Não coloque lógica de negócio em componentes
- Não duplique código - crie utilidades

## Recursos

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [React Best Practices](https://react.dev/learn)
