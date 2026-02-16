import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame, Calendar, TrendingUp, Target, PieChart as PieChartIcon, Clock } from 'lucide-react';
import { Question, PREDEFINED_QUESTIONS } from '@/lib/questions';
import {
  getUserQuestions,
  getCustomQuestions,
  getAnswersForQuestion,
  updateQuestionChartType,
  getStreak,
  getBestStreak,
  getTotalCheckIns,
  getAllEntries,
} from '@/lib/store';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const CHART_COLORS = [
  'hsl(174, 62%, 32%)',
  'hsl(38, 92%, 50%)',
  'hsl(152, 60%, 42%)',
  'hsl(280, 60%, 55%)',
  'hsl(350, 65%, 55%)',
];

const Statistics = () => {
  const navigate = useNavigate();
  const [userQuestions, setUserQuestions] = useState(getUserQuestions());
  const allQuestions = useMemo(() => [...PREDEFINED_QUESTIONS, ...getCustomQuestions()], []);

  const streak = getStreak();
  const bestStreak = getBestStreak();
  const totalCheckIns = getTotalCheckIns();

  // 30-day rate
  const thirtyDayRate = useMemo(() => {
    const entries = getAllEntries();
    const today = new Date();
    let count = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (entries.find(e => e.date === dateStr)) count++;
    }
    return Math.round((count / 30) * 100);
  }, []);

  const activeQuestions = useMemo(() =>
    userQuestions
      .map(uq => ({
        question: allQuestions.find(q => q.id === uq.questionId),
        config: uq,
      }))
      .filter(item => item.question) as { question: Question; config: typeof userQuestions[0] }[],
    [userQuestions, allQuestions]
  );

  const toggleChartType = (questionId: string) => {
    const current = userQuestions.find(q => q.questionId === questionId);
    const newType = current?.chartType === 'pie' ? 'line' : 'pie';
    updateQuestionChartType(questionId, newType);
    setUserQuestions(getUserQuestions());
  };

  const streakMessage = streak === 0 ? 'Starte jetzt!' : streak === 1 ? 'Großartiger Start!' : streak < 7 ? 'Weiter so!' : 'Unglaublich! 🔥';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Statistiken</h1>
            <p className="text-sm text-muted-foreground">Dein Fortschritt im Überblick</p>
          </div>
        </div>
      </div>

      {/* Streak banner */}
      <div className="px-5 mb-4">
        <div className="gradient-accent rounded-2xl p-5 text-center">
          <p className="text-accent-foreground/80 text-sm font-medium">Aktuelle Streak</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="bg-accent-foreground/20 rounded-full p-2">
              <Flame className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-3xl font-bold text-accent-foreground">{streak}</span>
          </div>
          <p className="text-accent-foreground/80 text-sm mt-1">{streakMessage}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="px-5 grid grid-cols-3 gap-2 mb-6">
        <div className="bg-card rounded-xl shadow-card p-3 text-center">
          <Calendar className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{totalCheckIns}</p>
          <p className="text-[10px] text-muted-foreground">Check-ins</p>
        </div>
        <div className="bg-card rounded-xl shadow-card p-3 text-center">
          <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{bestStreak}</p>
          <p className="text-[10px] text-muted-foreground">Beste Streak</p>
        </div>
        <div className="bg-card rounded-xl shadow-card p-3 text-center">
          <Target className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-xl font-bold text-foreground">{thirtyDayRate}%</p>
          <p className="text-[10px] text-muted-foreground">30-Tage Rate</p>
        </div>
      </div>

      {/* Trends */}
      <div className="px-5 pb-8">
        <h2 className="text-lg font-bold text-foreground mb-3">Trends</h2>
        <div className="space-y-3">
          {activeQuestions.map(({ question, config }) => (
            <QuestionStats
              key={question.id}
              question={question}
              chartType={config.chartType || 'line'}
              onToggleChart={() => toggleChartType(question.id)}
            />
          ))}
          {activeQuestions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Keine Fragen ausgewählt
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function QuestionStats({
  question,
  chartType,
  onToggleChart,
}: {
  question: Question;
  chartType: 'line' | 'pie';
  onToggleChart: () => void;
}) {
  const answers = getAnswersForQuestion(question.id);
  const hasData = answers.length > 0;

  return (
    <div className="bg-card rounded-xl shadow-card p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl">{question.emoji || '📝'}</span>
          <p className="text-sm font-semibold text-foreground truncate">{question.text}</p>
        </div>
        {question.type !== 'freetext' && (
          <button
            onClick={onToggleChart}
            className="p-2 rounded-lg hover:bg-secondary transition-colors ml-2"
          >
            {chartType === 'line' ? (
              <Clock className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Clock className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      {!hasData ? (
        <p className="text-sm text-muted-foreground italic py-4 text-center">Noch keine Daten</p>
      ) : question.type === 'yesno' ? (
        <YesNoChart answers={answers} chartType={chartType} />
      ) : question.type === 'scale' ? (
        <ScaleChart answers={answers} chartType={chartType} min={question.scaleMin || 1} max={question.scaleMax || 10} />
      ) : (
        <FreeTextStats answers={answers} />
      )}
    </div>
  );
}

function YesNoChart({ answers, chartType }: { answers: { date: string; value: any }[]; chartType: 'line' | 'pie' }) {
  const yesCount = answers.filter(a => a.value === true).length;
  const noCount = answers.filter(a => a.value === false).length;

  if (chartType === 'pie') {
    const data = [
      { name: 'Ja', value: yesCount },
      { name: 'Nein', value: noCount },
    ].filter(d => d.value > 0);
    return (
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {data.map((_, i) => <Cell key={i} fill={i === 0 ? CHART_COLORS[0] : CHART_COLORS[4]} />)}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const lineData = answers.map(a => ({
    date: new Date(a.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' }),
    value: a.value === true ? 1 : 0,
  }));

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis domain={[0, 1]} ticks={[0, 1]} tickFormatter={v => v === 1 ? 'Ja' : 'Nein'} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip formatter={(v: number) => v === 1 ? 'Ja' : 'Nein'} />
          <Line type="stepAfter" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ fill: CHART_COLORS[0], r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ScaleChart({ answers, chartType, min, max }: { answers: { date: string; value: any }[]; chartType: 'line' | 'pie'; min: number; max: number }) {
  if (chartType === 'pie') {
    const counts: Record<number, number> = {};
    answers.forEach(a => { const v = Number(a.value); counts[v] = (counts[v] || 0) + 1; });
    const data = Object.entries(counts).map(([k, v]) => ({ name: k, value: v })).sort((a, b) => Number(a.name) - Number(b.name));
    return (
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
              {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const lineData = answers.map(a => ({
    date: new Date(a.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' }),
    value: Number(a.value),
  }));

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis domain={[min, max]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={2} dot={{ fill: CHART_COLORS[0], r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function FreeTextStats({ answers }: { answers: { date: string; value: any }[] }) {
  const wordCounts: Record<string, number> = {};
  answers.forEach(a => {
    String(a.value).toLowerCase().split(/\s+/).filter(w => w.length > 2).forEach(w => {
      wordCounts[w] = (wordCounts[w] || 0) + 1;
    });
  });
  const topWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxCount = topWords.length > 0 ? topWords[0][1] : 1;

  return (
    <div>
      {topWords.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Häufigste Wörter</p>
          <div className="flex flex-wrap gap-1.5">
            {topWords.map(([word, count]) => (
              <span key={word} className="px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                {word} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">Letzte Einträge</p>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {answers.slice(-5).reverse().map((a, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="text-muted-foreground flex-shrink-0">
                {new Date(a.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
              </span>
              <span className="text-foreground">{String(a.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Statistics;
