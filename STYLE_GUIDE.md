# Guia de Estilo e Boas Práticas - RolêMatch

## Convenções de Nomenclatura

### Arquivos e Pastas
```
✅ BOM
components/UserProfile.tsx
hooks/useUserData.ts
utils/formatDate.ts
features/hangouts/

❌ RUIM
components/userprofile.tsx
hooks/UseUserData.ts
utils/format-date.ts
features/Hangouts/
```

### Componentes
```typescript
// ✅ BOM: PascalCase para componentes
export const UserProfile = () => { ... }
export const HangoutCard = () => { ... }

// ❌ RUIM
export const userProfile = () => { ... }
export const hangout_card = () => { ... }
```

### Hooks
```typescript
// ✅ BOM: camelCase com prefixo 'use'
export const useUserData = () => { ... }
export const useDebounce = () => { ... }

// ❌ RUIM
export const UserData = () => { ... }
export const debounce = () => { ... }
```

### Variáveis e Funções
```typescript
// ✅ BOM: camelCase
const userName = 'João';
const isActive = true;
const fetchUserData = async () => { ... }

// ❌ RUIM
const user_name = 'João';
const IsActive = true;
const FetchUserData = async () => { ... }
```

### Constantes
```typescript
// ✅ BOM: UPPER_SNAKE_CASE ou camelCase para objetos
const MAX_PARTICIPANTS = 20;
const API_BASE_URL = 'https://api.example.com';

const ROUTES = {
  HOME: '/',
  PROFILE: '/perfil',
};

// ❌ RUIM
const maxParticipants = 20;
const apiBaseUrl = 'https://api.example.com';
```

### Types e Interfaces
```typescript
// ✅ BOM: PascalCase
interface UserProfile { ... }
type HangoutStatus = 'pending' | 'active' | 'completed';

// ❌ RUIM
interface userProfile { ... }
type hangoutStatus = 'pending' | 'active' | 'completed';
```

## Estrutura de Componentes

### Ordem de Declaração
```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUserData } from '@/hooks/useUserData';

// 2. Types/Interfaces
interface UserCardProps {
  userId: string;
  onEdit?: () => void;
}

// 3. Component
export const UserCard = ({ userId, onEdit }: UserCardProps) => {
  // 3.1. Hooks
  const { data, isLoading } = useUserData(userId);
  const [isEditing, setIsEditing] = useState(false);

  // 3.2. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 3.3. Event Handlers
  const handleEdit = () => {
    setIsEditing(true);
    onEdit?.();
  };

  // 3.4. Render Helpers
  const renderActions = () => (
    <Button onClick={handleEdit}>Editar</Button>
  );

  // 3.5. Early Returns
  if (isLoading) return <Loading />;
  if (!data) return <ErrorState />;

  // 3.6. Main Render
  return (
    <div>
      {/* ... */}
      {renderActions()}
    </div>
  );
};
```

### Props

```typescript
// ✅ BOM: Interface descritiva, props opcionais com '?'
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return <button>{children}</button>;
};

// ❌ RUIM: Props sem tipo, valores default implícitos
export const Button = (props: any) => {
  return <button>{props.children}</button>;
};
```

### Composição sobre Herança

```typescript
// ✅ BOM: Composição
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card">{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);

// Uso
<Card>
  <CardHeader>Título</CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>

// ❌ RUIM: Herança e acoplamento
class BaseCard extends Component { ... }
class UserCard extends BaseCard { ... }
```

## Hooks

### Regras
1. Sempre comece com `use`
2. Só chame no top-level
3. Extraia lógica complexa
4. Mantenha hooks focados

```typescript
// ✅ BOM: Hook focado e reutilizável
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

// ❌ RUIM: Hook fazendo muitas coisas
export const useEverything = () => {
  // Fetching data
  // Managing forms
  // Handling authentication
  // Managing UI state
  // ... tudo junto
};
```

## Estado

### Local vs Global

```typescript
// ✅ BOM: Estado local para UI simples
const [isOpen, setIsOpen] = useState(false);

// ✅ BOM: React Query para dados do servidor
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

// ✅ BOM: Context para estado global de UI
const { theme, setTheme } = useTheme();

// ❌ RUIM: Context para tudo
const { 
  users, 
  hangouts, 
  messages, 
  isModalOpen, 
  searchTerm 
} = useAppContext(); // Evite God Context
```

### Imutabilidade

```typescript
// ✅ BOM: Atualizações imutáveis
const [users, setUsers] = useState<User[]>([]);

// Adicionar
setUsers([...users, newUser]);

// Atualizar
setUsers(users.map(u => u.id === id ? { ...u, name: newName } : u));

// Remover
setUsers(users.filter(u => u.id !== id));

// ❌ RUIM: Mutação direta
users.push(newUser); // NÃO FAÇA ISSO
setUsers(users);
```

## Performance

### Memoization

```typescript
// ✅ BOM: useMemo para cálculos pesados
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ BOM: useCallback para funções passadas como props
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ❌ RUIM: useMemo/useCallback em tudo
const simpleValue = useMemo(() => a + b, [a, b]); // Desnecessário
```

### React.memo

```typescript
// ✅ BOM: Memo para componentes que renderizam frequentemente
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  return <div>{/* renderização pesada */}</div>;
});

// ❌ RUIM: Memo em componentes simples
export const SimpleText = React.memo(({ text }: { text: string }) => (
  <span>{text}</span> // Muito simples para memo
));
```

### Lazy Loading

```typescript
// ✅ BOM: Lazy load de páginas e componentes pesados
const UserProfile = lazy(() => import('./pages/UserProfile'));
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// ❌ RUIM: Lazy load de componentes pequenos
const Button = lazy(() => import('./components/Button')); // Muito pequeno
```

## Tratamento de Erros

### Try-Catch

```typescript
// ✅ BOM: Tratamento específico
try {
  const result = await fetchData();
  return createSuccess(result);
} catch (error) {
  if (error instanceof NetworkError) {
    return createError(new AppError('Erro de conexão', 'NETWORK_ERROR'));
  }
  if (error instanceof ValidationError) {
    return createError(new AppError('Dados inválidos', 'VALIDATION_ERROR'));
  }
  return createError(new AppError('Erro inesperado', 'UNEXPECTED_ERROR'));
}

// ❌ RUIM: Catch genérico sem tratamento
try {
  const result = await fetchData();
} catch (error) {
  console.log(error); // Apenas log
}
```

### Error Boundaries

```typescript
// ✅ BOM: Error Boundary em pontos estratégicos
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>

<ErrorBoundary fallback={<FeatureError />}>
  <FeatureComponent />
</ErrorBoundary>

// ❌ RUIM: Error Boundary em todo componente
<ErrorBoundary>
  <Button /> {/* Excessivo */}
</ErrorBoundary>
```

## TypeScript

### Tipos sobre Any

```typescript
// ✅ BOM: Tipos específicos
interface User {
  id: string;
  name: string;
  email: string;
}

const fetchUser = async (id: string): Promise<User> => { ... }

// ❌ RUIM: any em todo lugar
const fetchUser = async (id: any): Promise<any> => { ... }
```

### Type Guards

```typescript
// ✅ BOM: Type guards para validação
const isUser = (obj: unknown): obj is User => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
};

if (isUser(data)) {
  console.log(data.name); // TypeScript sabe que é User
}

// ❌ RUIM: Cast sem validação
const user = data as User; // Perigoso
```

## Testes (Planejado)

### Estrutura de Testes

```typescript
describe('UserCard', () => {
  it('should render user name', () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(onEdit).toHaveBeenCalled();
  });
});
```

## Checklist de Code Review

- [ ] Código segue as convenções de nomenclatura
- [ ] Componentes são pequenos e focados
- [ ] Props são tipadas corretamente
- [ ] Hooks seguem as regras do React
- [ ] Estado é gerenciado apropriadamente
- [ ] Performance otimizada (quando necessário)
- [ ] Erros são tratados adequadamente
- [ ] Sem uso de `any` ou `@ts-ignore`
- [ ] Código é legível e autodocumentado
- [ ] Funcionalidade testável (ou testada)
