interface MacroCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function MacroCheckbox({ checked, onChange, label, description }: MacroCheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-3 cursor-pointer py-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 md:w-3.5 md:h-3.5 rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
        />
        <span className="font-medium text-sm md:text-base select-none">{label}</span>
      </label>
      {description && <p className="text-xs md:text-sm text-gray-400">{description}</p>}
    </div>
  );
}
