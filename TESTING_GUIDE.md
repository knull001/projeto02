# ⚡ Quick Test Guide - Novas Features

## 🚀 Setup Rápido (5 minutos)

### 1. Banco de Dados
```bash
cd meet-a-rol-main

# Aplicar migration
psql -h SEU_HOST -U SEU_USER -d SEU_DB -f supabase/migrations/20260216_reels_and_voice_calls.sql

# OU com Supabase CLI:
supabase db push
```

### 2. OpenAI API (Opcional)
```
Supabase Dashboard → Functions → moderate-image → Secrets
Adicionar: OPENAI_API_KEY = sk-...
```

### 3. Verificar Storage
```
Supabase Dashboard → Storage
Buckets criados:
- reels ✅
- temp-moderation ✅
```

---

## 🧪 Testes Manuais

### Teste 1: Criar Reel (2 min)

1. **Executar app**
   ```bash
   npm run dev
   ```

2. **Acessar `/reels`**
   - URL: http://localhost:8080/reels

3. **Criar Reel**
   - Clique em "Criar Reel" (se houver botão)
   - OU implemente temporariamente:
   ```typescript
   // Em qualquer página
   import { CreateReelModal } from '@/features/reels';
   const [show, setShow] = useState(false);
   
   <Button onClick={() => setShow(true)}>Criar Reel</Button>
   <CreateReelModal 
     isOpen={show} 
     onClose={() => setShow(false)}
     hangoutId="SEU_HANGOUT_ID"
     hangoutTitle="Teste"
   />
   ```

4. **Upload**
   - Selecione uma imagem ou vídeo
   - Adicione legenda
   - Clique em "Publicar"

**Resultado Esperado:**
- ✅ Upload bem-sucedido
- ✅ Reel aparece no feed
- ✅ Toast de sucesso exibido

---

### Teste 2: Moderação de Imagem (3 min)

#### A. Teste com Imagem Apropriada
```typescript
// Console do navegador ou componente
import { moderateImage } from '@/shared/utils/contentModeration';

const file = new File([...], 'test.jpg', { type: 'image/jpeg' });
const result = await moderateImage(file);
console.log(result); 
// { safe: true }
```

#### B. Teste com Palavras Bloqueadas
```typescript
import { validateHangoutContent } from '@/shared/utils/contentModeration';

const result = await validateHangoutContent(
  'Rolê de morte', // ❌ Palavra bloqueada
  'Vamos falar sobre morte',
  undefined
);
console.log(result);
// { valid: false, reason: 'Conteúdo inapropriado: morte' }
```

**Resultado Esperado:**
- ✅ Imagens apropriadas: permitidas
- ✅ Palavras bloqueadas: rejeitadas
- ✅ Mensagem clara ao usuário

---

### Teste 3: Like e Comentário (2 min)

1. **Curtir Reel**
   - Clique no ❤️ em um reel
   - Contador deve aumentar
   - Coração deve ficar vermelho

2. **Comentar**
   - Clique em 💬
   - Digite um comentário
   - Pressione Enter ou clique "Enviar"

**Resultado Esperado:**
- ✅ Like registrado instantaneamente
- ✅ Comentário aparece na lista
- ✅ Contadores atualizados

---

### Teste 4: Chamadas de Voz (5 min)

```sql
-- 1. Verificar tabela criada
SELECT * FROM voice_calls LIMIT 1;

-- 2. Simular chamada (via código)
```

```typescript
import { voiceCallApi } from '@/shared/api/voiceCall.api';

// Iniciar chamada
const result = await voiceCallApi.initiateCall(
  'CONVERSATION_ID',
  'RECEIVER_ID'
);

console.log(result);
// { success: true, data: { id, status: 'ringing', ... } }
```

```sql
-- 3. Verificar registro
SELECT * FROM voice_calls ORDER BY created_at DESC LIMIT 1;
```

**Resultado Esperado:**
- ✅ Registro criado com status 'ringing'
- ✅ caller_id e receiver_id corretos
- ✅ timestamps preenchidos

---

### Teste 5: Filtros de Reels (1 min)

1. **Acessar `/reels`**
2. **Clicar nas tabs:**
   - "Todos" → Mostra todos
   - "Fotos" → Apenas imagens
   - "Vídeos" → Apenas vídeos

**Resultado Esperado:**
- ✅ Filtros funcionam corretamente
- ✅ Reels filtrados aparecem
- ✅ Transição suave

---

## 🔍 Verificações no Banco

### Reels Criados
```sql
SELECT 
  r.id,
  r.caption,
  r.media_type,
  u.name as author,
  h.title as hangout
FROM reels r
JOIN profiles u ON r.user_id = u.id
JOIN hangouts h ON r.hangout_id = h.id
ORDER BY r.created_at DESC
LIMIT 5;
```

### Likes por Reel
```sql
SELECT 
  r.caption,
  COUNT(rl.id) as total_likes
FROM reels r
LEFT JOIN reel_likes rl ON r.id = rl.reel_id
GROUP BY r.id, r.caption
ORDER BY total_likes DESC;
```

### Comentários Recentes
```sql
SELECT 
  rc.content,
  u.name as author,
  r.caption as reel
FROM reel_comments rc
JOIN profiles u ON rc.user_id = u.id
JOIN reels r ON rc.reel_id = r.id
ORDER BY rc.created_at DESC
LIMIT 10;
```

### Status de Chamadas
```sql
SELECT 
  caller.name as caller,
  receiver.name as receiver,
  vc.status,
  vc.duration,
  vc.created_at
FROM voice_calls vc
JOIN profiles caller ON vc.caller_id = caller.id
JOIN profiles receiver ON vc.receiver_id = receiver.id
ORDER BY vc.created_at DESC
LIMIT 10;
```

---

## 🐛 Troubleshooting

### Erro: "Cannot upload to storage"
```
Solução:
1. Verificar storage policies
2. Verificar bucket público
3. Verificar autenticação
```

### Erro: "Moderation failed"
```
Solução:
1. Verificar OPENAI_API_KEY configurada
2. Verificar Edge Function deployada
3. Ver logs em Supabase → Functions
```

### Erro: "RLS policy violation"
```
Solução:
1. Verificar usuário autenticado
2. Verificar policies aplicadas:
   SHOW rls ON reels;
3. Recriar policies se necessário
```

### Reels não aparecem
```
Solução:
1. Verificar query React Query:
   DevTools → Queries → reels
2. Verificar erro no console
3. Verificar dados no banco:
   SELECT COUNT(*) FROM reels;
```

---

## ✅ Checklist Rápido

### Setup
- [ ] Migration aplicada
- [ ] Storage buckets criados
- [ ] RLS policies ativas
- [ ] OpenAI configurada (opcional)

### Funcionalidades
- [ ] Criar reel funciona
- [ ] Feed de reels carrega
- [ ] Like funciona
- [ ] Comentário funciona
- [ ] Filtros funcionam
- [ ] Moderação bloqueia conteúdo inapropriado
- [ ] Chamadas são registradas

### Performance
- [ ] Upload < 5 segundos (imagem)
- [ ] Feed carrega < 2 segundos
- [ ] Vídeos fazem streaming

### UX
- [ ] Loading states aparecem
- [ ] Erros mostram mensagem clara
- [ ] Success feedback (toasts)
- [ ] Mobile responsivo

---

## 📊 Métricas de Sucesso

Após implementação, você deve ter:

```sql
-- Reels criados
SELECT COUNT(*) as total_reels FROM reels;
-- Esperado: > 0

-- Usuários ativos
SELECT COUNT(DISTINCT user_id) as active_users FROM reels;
-- Esperado: > 1

-- Engajamento
SELECT 
  COUNT(*) as total_likes,
  COUNT(DISTINCT reel_id) as reels_liked
FROM reel_likes;

-- Chamadas realizadas
SELECT COUNT(*) as total_calls FROM voice_calls;
-- Esperado: > 0
```

---

## 🎯 Casos de Teste Críticos

### 1. Upload de Arquivo Grande
- [ ] Arquivo 51MB → Deve rejeitar
- [ ] Mensagem clara de erro

### 2. Conteúdo Inapropriado
- [ ] Palavra "morte" em título → Bloqueado
- [ ] Imagem inapropriada → Bloqueado (se OpenAI configurada)

### 3. Permissões
- [ ] Usuário A não pode deletar reel de B
- [ ] Usuário pode deletar próprio reel

### 4. Concorrência
- [ ] Dois usuários curtindo ao mesmo tempo → Ambos registrados
- [ ] Unique constraint em reel_likes funciona

---

## 🚀 Performance Test

```bash
# Testar upload de 10 reels
for i in {1..10}; do
  echo "Uploading reel $i..."
  # Script de upload aqui
done

# Verificar
psql -c "SELECT COUNT(*) FROM reels WHERE created_at > NOW() - INTERVAL '1 minute';"
```

---

## 📞 Suporte

Problemas durante os testes?

1. ✅ Consulte [NEW_FEATURES.md](./NEW_FEATURES.md)
2. ✅ Verifique logs do Supabase
3. ✅ Verifique console do navegador
4. ✅ Verifique queries React Query DevTools

---

<div align="center">
  <h2>✨ Happy Testing!</h2>
  <p>Siga este guia e estará funcionando em minutos</p>
</div>
