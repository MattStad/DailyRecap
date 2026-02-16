interface ScaleInputProps {
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const ScaleInput = ({ value, onChange, min = 1, max = 10 }: ScaleInputProps) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="flex gap-1 justify-center flex-wrap">
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-200 flex-shrink-0 ${
            value === num
              ? 'gradient-primary text-primary-foreground shadow-lg scale-110'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default ScaleInput;
