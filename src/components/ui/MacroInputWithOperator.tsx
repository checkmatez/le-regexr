import type { Operator } from '../../types/stash-search';

interface OperatorOption {
  value: Operator;
  label: string;
}

interface MacroInputWithOperatorProps {
  value: number;
  operator: Operator;
  onValueChange: (value: number) => void;
  onOperatorChange: (operator: Operator) => void;
  operatorOptions: OperatorOption[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export function MacroInputWithOperator({
  value,
  operator,
  onValueChange,
  onOperatorChange,
  operatorOptions,
  min = 0,
  max,
  placeholder,
}: MacroInputWithOperatorProps) {
  return (
    <div className="flex space-x-2">
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onValueChange(parseInt(e.target.value) || min)}
        placeholder={placeholder}
        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
      />
      <select
        value={operator}
        onChange={(e) => onOperatorChange(e.target.value as Operator)}
        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
      >
        {operatorOptions.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
}
