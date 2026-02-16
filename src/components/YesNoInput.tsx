import { Check, X } from 'lucide-react';

interface YesNoInputProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

const YesNoInput = ({ value, onChange }: YesNoInputProps) => {
  return (
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
          value === true
            ? 'bg-success text-success-foreground shadow-lg scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        <Check className="w-5 h-5" />
        Ja
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
          value === false
            ? 'bg-destructive text-destructive-foreground shadow-lg scale-105'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        <X className="w-5 h-5" />
        Nein
      </button>
    </div>
  );
};

export default YesNoInput;
