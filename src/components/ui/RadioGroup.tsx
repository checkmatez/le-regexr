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
        <label key={option.value || 'none'} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option.value || ''}
            checked={value === option.value}
            onChange={(e) => onChange((e.target.value as T) || null)}
            className="border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
          />
          <span>{option.label}</span>
        </label>
      ))}
      {allowNone && (
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value=""
            checked={value === null}
            onChange={() => onChange(null)}
            className="border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
          />
          <span>{noneLabel}</span>
        </label>
      )}
    </div>
  );
}
