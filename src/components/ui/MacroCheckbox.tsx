interface MacroCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function MacroCheckbox({ checked, onChange, label, description }: MacroCheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="rounded border-gray-600 bg-gray-700 text-amber-400 focus:ring-amber-400"
        />
        <span className="font-medium">{label}</span>
      </label>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
}
