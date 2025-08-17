interface RadioOption<T> {
  value: T;
  label: string;
}

interface RadioGroupProps<T> {
  name: string;
  value: T | null;
  onChange: (value: T | null) => void;
  options: RadioOption<T>[];
  allowNone?: boolean;
  noneLabel?: string;
}

export function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  allowNone = false,
  noneLabel = 'None',
}: RadioGroupProps<T>) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value || 'none'}
          className="flex items-center space-x-3 cursor-pointer py-1"
        >
          <input
            type="radio"
            name={name}
            value={option.value || ''}
            checked={value === option.value}
            onChange={(e) => onChange((e.target.value as T) || null)}
            className="w-4 h-4 md:w-3.5 md:h-3.5 border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
          />
          <span className="text-sm md:text-base select-none">{option.label}</span>
        </label>
      ))}
      {allowNone && (
        <label className="flex items-center space-x-3 cursor-pointer py-1">
          <input
            type="radio"
            name={name}
            value=""
            checked={value === null}
            onChange={() => onChange(null)}
            className="w-4 h-4 md:w-3.5 md:h-3.5 border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
          />
          <span className="text-sm md:text-base select-none">{noneLabel}</span>
        </label>
      )}
    </div>
  );
}
