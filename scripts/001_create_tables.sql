-- =====================================================
-- RoleMatch Database Schema
-- =====================================================

-- 1. Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  location TEXT,
  interests TEXT[] DEFAULT '{}',
  reputation_score INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- 2. Hangouts table
CREATE TABLE IF NOT EXISTS public.hangouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'outros',
  location TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  date DATE NOT NULL,
  time TIME,
  max_participants INTEGER DEFAULT 10,
  current_participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'full', 'completed', 'cancelled')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.hangouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hangouts_select_all" ON public.hangouts FOR SELECT USING (true);
CREATE POLICY "hangouts_insert_own" ON public.hangouts FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "hangouts_update_own" ON public.hangouts FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "hangouts_delete_own" ON public.hangouts FOR DELETE USING (auth.uid() = creator_id);

-- 3. Hangout participants
CREATE TABLE IF NOT EXISTS public.hangout_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hangout_id UUID NOT NULL REFERENCES public.hangouts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(hangout_id, user_id)
);

ALTER TABLE public.hangout_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "participants_select_all" ON public.hangout_participants FOR SELECT USING (true);
CREATE POLICY "participants_insert_own" ON public.hangout_participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "participants_delete_own" ON public.hangout_participants FOR DELETE USING (auth.uid() = user_id);

-- 4. Reels table
CREATE TABLE IF NOT EXISTS public.reels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  hangout_id UUID REFERENCES public.hangouts(id) ON DELETE SET NULL,
  media_url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  caption TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reels_select_all" ON public.reels FOR SELECT USING (true);
CREATE POLICY "reels_insert_own" ON public.reels FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reels_update_own" ON public.reels FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reels_delete_own" ON public.reels FOR DELETE USING (auth.uid() = user_id);

-- 5. Reel likes
CREATE TABLE IF NOT EXISTS public.reel_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(reel_id, user_id)
);

ALTER TABLE public.reel_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reel_likes_select_all" ON public.reel_likes FOR SELECT USING (true);
CREATE POLICY "reel_likes_insert_own" ON public.reel_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reel_likes_delete_own" ON public.reel_likes FOR DELETE USING (auth.uid() = user_id);

-- 6. Reel comments
CREATE TABLE IF NOT EXISTS public.reel_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES public.reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reel_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reel_comments_select_all" ON public.reel_comments FOR SELECT USING (true);
CREATE POLICY "reel_comments_insert_own" ON public.reel_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reel_comments_update_own" ON public.reel_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reel_comments_delete_own" ON public.reel_comments FOR DELETE USING (auth.uid() = user_id);

-- 7. Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'private' CHECK (type IN ('private', 'group')),
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conversations_select_own" ON public.conversations FOR SELECT
  USING (id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid()));
CREATE POLICY "conversations_insert" ON public.conversations FOR INSERT WITH CHECK (true);

-- 8. Conversation participants
CREATE TABLE IF NOT EXISTS public.conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);

ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conv_participants_select_own" ON public.conversation_participants FOR SELECT
  USING (user_id = auth.uid() OR conversation_id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid()));
CREATE POLICY "conv_participants_insert" ON public.conversation_participants FOR INSERT WITH CHECK (true);

-- 9. Messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_select_own" ON public.messages FOR SELECT
  USING (conversation_id IN (SELECT conversation_id FROM public.conversation_participants WHERE user_id = auth.uid()));
CREATE POLICY "messages_insert_own" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
