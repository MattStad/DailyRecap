export type QuestionType = 'yesno' | 'scale' | 'freetext';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: string;
  emoji?: string;
  scaleMin?: number;
  scaleMax?: number;
  isCustom?: boolean;
}

export interface Answer {
  questionId: string;
  value: string | number | boolean;
  timestamp: string;
}

export interface DayEntry {
  date: string;
  answers: Answer[];
}

export interface UserQuestion {
  questionId: string;
  addedAt: string;
  chartType?: 'line' | 'pie';
}

export const CATEGORIES = [
  'Gesundheit',
  'Fitness',
  'Ernährung',
  'Mental Health',
  'Produktivität',
  'Soziales',
  'Lernen',
  'Kreativität',
  'Finanzen',
  'Selbstfürsorge',
] as const;

export const PREDEFINED_QUESTIONS: Question[] = [
  // Gesundheit
  { id: 'pre-1', text: 'Hast du heute genug Wasser getrunken?', type: 'yesno', category: 'Gesundheit', emoji: '💧' },
  { id: 'pre-2', text: 'Wie viele Stunden hast du geschlafen?', type: 'scale', category: 'Gesundheit', scaleMin: 1, scaleMax: 10, emoji: '😴' },
  { id: 'pre-3', text: 'Wie gut hast du geschlafen?', type: 'scale', category: 'Gesundheit', scaleMin: 1, scaleMax: 10, emoji: '🛏️' },
  { id: 'pre-4', text: 'Hast du Medikamente/Vitamine genommen?', type: 'yesno', category: 'Gesundheit', emoji: '💊' },
  { id: 'pre-5', text: 'Wie fühlst du dich körperlich?', type: 'scale', category: 'Gesundheit', scaleMin: 1, scaleMax: 10, emoji: '💪' },

  // Fitness
  { id: 'pre-6', text: 'Hast du heute Sport gemacht?', type: 'yesno', category: 'Fitness', emoji: '🏃' },
  { id: 'pre-7', text: 'Wie intensiv war dein Training?', type: 'scale', category: 'Fitness', scaleMin: 1, scaleMax: 10, emoji: '🔥' },
  { id: 'pre-8', text: 'Hast du dich heute genug bewegt?', type: 'yesno', category: 'Fitness', emoji: '🚶' },
  { id: 'pre-9', text: 'Wie viele Schritte bist du gegangen (Schätzung 1-10)?', type: 'scale', category: 'Fitness', scaleMin: 1, scaleMax: 10, emoji: '👟' },
  { id: 'pre-10', text: 'Hast du gedehnt oder Yoga gemacht?', type: 'yesno', category: 'Fitness', emoji: '🧘' },

  // Ernährung
  { id: 'pre-11', text: 'Hast du heute gesund gegessen?', type: 'yesno', category: 'Ernährung', emoji: '🥗' },
  { id: 'pre-12', text: 'Wie zufrieden bist du mit deiner Ernährung heute?', type: 'scale', category: 'Ernährung', scaleMin: 1, scaleMax: 10, emoji: '🍽️' },
  { id: 'pre-13', text: 'Hast du Obst oder Gemüse gegessen?', type: 'yesno', category: 'Ernährung', emoji: '🍎' },
  { id: 'pre-14', text: 'Hast du auf Zucker verzichtet?', type: 'yesno', category: 'Ernährung', emoji: '🚫' },
  { id: 'pre-15', text: 'Was hast du heute Besonderes gegessen?', type: 'freetext', category: 'Ernährung', emoji: '🍕' },

  // Mental Health
  { id: 'pre-16', text: 'Wie ist deine Stimmung?', type: 'scale', category: 'Mental Health', scaleMin: 1, scaleMax: 10, emoji: '😊' },
  { id: 'pre-17', text: 'Hast du heute meditiert?', type: 'yesno', category: 'Mental Health', emoji: '🧘' },
  { id: 'pre-18', text: 'Wie gestresst fühlst du dich?', type: 'scale', category: 'Mental Health', scaleMin: 1, scaleMax: 10, emoji: '😰' },
  { id: 'pre-19', text: 'Wofür bist du heute dankbar?', type: 'freetext', category: 'Mental Health', emoji: '🙏' },
  { id: 'pre-20', text: 'Hast du dir heute eine Auszeit genommen?', type: 'yesno', category: 'Mental Health', emoji: '☕' },
  { id: 'pre-21', text: 'Wie war deine Energie heute?', type: 'scale', category: 'Mental Health', scaleMin: 1, scaleMax: 10, emoji: '⚡' },

  // Produktivität
  { id: 'pre-22', text: 'Hast du deine wichtigste Aufgabe erledigt?', type: 'yesno', category: 'Produktivität', emoji: '✅' },
  { id: 'pre-23', text: 'Wie produktiv warst du heute?', type: 'scale', category: 'Produktivität', scaleMin: 1, scaleMax: 10, emoji: '💼' },
  { id: 'pre-24', text: 'Hast du heute prokrastiniert?', type: 'yesno', category: 'Produktivität', emoji: '😬' },
  { id: 'pre-25', text: 'Was war dein größter Erfolg heute?', type: 'freetext', category: 'Produktivität', emoji: '🏆' },
  { id: 'pre-26', text: 'Wie fokussiert warst du?', type: 'scale', category: 'Produktivität', scaleMin: 1, scaleMax: 10, emoji: '🎯' },

  // Soziales
  { id: 'pre-27', text: 'Hast du heute jemanden getroffen?', type: 'yesno', category: 'Soziales', emoji: '👥' },
  { id: 'pre-28', text: 'Wie zufrieden bist du mit deinen sozialen Kontakten?', type: 'scale', category: 'Soziales', scaleMin: 1, scaleMax: 10, emoji: '💬' },
  { id: 'pre-29', text: 'Hast du jemandem geholfen?', type: 'yesno', category: 'Soziales', emoji: '🤝' },
  { id: 'pre-30', text: 'Hast du Zeit mit Familie verbracht?', type: 'yesno', category: 'Soziales', emoji: '👨‍👩‍👧‍👦' },

  // Lernen
  { id: 'pre-31', text: 'Hast du heute etwas Neues gelernt?', type: 'yesno', category: 'Lernen', emoji: '💡' },
  { id: 'pre-32', text: 'Hast du heute gelesen?', type: 'yesno', category: 'Lernen', emoji: '📖' },
  { id: 'pre-33', text: 'Wie viel hast du heute gelernt?', type: 'scale', category: 'Lernen', scaleMin: 1, scaleMax: 10, emoji: '📚' },
  { id: 'pre-34', text: 'Was hast du heute gelernt?', type: 'freetext', category: 'Lernen', emoji: '✏️' },

  // Kreativität
  { id: 'pre-35', text: 'Hast du heute etwas Kreatives gemacht?', type: 'yesno', category: 'Kreativität', emoji: '🎨' },
  { id: 'pre-36', text: 'Wie kreativ fühlst du dich heute?', type: 'scale', category: 'Kreativität', scaleMin: 1, scaleMax: 10, emoji: '✨' },
  { id: 'pre-37', text: 'Welches kreative Projekt beschäftigt dich?', type: 'freetext', category: 'Kreativität', emoji: '🖌️' },

  // Finanzen
  { id: 'pre-38', text: 'Hast du heute unnötig Geld ausgegeben?', type: 'yesno', category: 'Finanzen', emoji: '💸' },
  { id: 'pre-39', text: 'Wie zufrieden bist du mit deinem Ausgabeverhalten?', type: 'scale', category: 'Finanzen', scaleMin: 1, scaleMax: 10, emoji: '💰' },
  { id: 'pre-40', text: 'Wofür hast du heute Geld ausgegeben?', type: 'freetext', category: 'Finanzen', emoji: '🧾' },

  // Selbstfürsorge
  { id: 'pre-41', text: 'Hast du dir heute etwas Gutes getan?', type: 'yesno', category: 'Selbstfürsorge', emoji: '🌸' },
  { id: 'pre-42', text: 'Wie zufrieden bist du mit dir selbst?', type: 'scale', category: 'Selbstfürsorge', scaleMin: 1, scaleMax: 10, emoji: '💖' },
  { id: 'pre-43', text: 'Hast du heute frische Luft bekommen?', type: 'yesno', category: 'Selbstfürsorge', emoji: '🌿' },
  { id: 'pre-44', text: 'Hast du heute Bildschirmzeit reduziert?', type: 'yesno', category: 'Selbstfürsorge', emoji: '📵' },
  { id: 'pre-45', text: 'Was hat dich heute glücklich gemacht?', type: 'freetext', category: 'Selbstfürsorge', emoji: '😄' },
  { id: 'pre-46', text: 'Was möchtest du morgen erreichen?', type: 'freetext', category: 'Produktivität', emoji: '🚀' },
  { id: 'pre-47', text: 'Wie war dein Tag so?', type: 'scale', category: 'Mental Health', scaleMin: 1, scaleMax: 10, emoji: '📝' },
];
