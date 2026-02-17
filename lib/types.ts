export type Profile = {
  id: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  interests: string[];
  reputation_score: number;
  badges: string[];
  created_at: string;
};

export type HangoutCategory =
  | "esportes"
  | "cultura"
  | "gastronomia"
  | "festas"
  | "jogos"
  | "ao_ar_livre"
  | "estudo"
  | "voluntariado"
  | "outro";

export type HangoutStatus = "active" | "full" | "completed" | "cancelled";

export type Hangout = {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  category: HangoutCategory;
  location: string;
  latitude: number | null;
  longitude: number | null;
  date: string;
  time: string;
  max_participants: number;
  current_participants: number;
  status: HangoutStatus;
  image_url: string | null;
  created_at: string;
  creator?: Profile;
};

export type ParticipantStatus = "pending" | "confirmed" | "checked_in";

export type HangoutParticipant = {
  id: string;
  hangout_id: string;
  user_id: string;
  status: ParticipantStatus;
  joined_at: string;
  profile?: Profile;
};

export type MediaType = "image" | "video";

export type Reel = {
  id: string;
  user_id: string;
  hangout_id: string | null;
  media_url: string;
  media_type: MediaType;
  caption: string | null;
  thumbnail_url: string | null;
  created_at: string;
  profile?: Profile;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
};

export type ReelComment = {
  id: string;
  reel_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
};

export type Conversation = {
  id: string;
  type: "private" | "group";
  created_at: string;
  participants?: Profile[];
  last_message?: Message;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender?: Profile;
};

export const CATEGORY_CONFIG: Record<
  HangoutCategory,
  { label: string; color: string; icon: string }
> = {
  esportes: { label: "Esportes", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: "Trophy" },
  cultura: { label: "Cultura", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400", icon: "Palette" },
  gastronomia: { label: "Gastronomia", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: "UtensilsCrossed" },
  festas: { label: "Festas", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400", icon: "PartyPopper" },
  jogos: { label: "Jogos", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: "Gamepad2" },
  ao_ar_livre: { label: "Ao Ar Livre", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: "TreePine" },
  estudo: { label: "Estudo", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400", icon: "BookOpen" },
  voluntariado: { label: "Voluntariado", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400", icon: "Heart" },
  outro: { label: "Outro", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400", icon: "MoreHorizontal" },
};
