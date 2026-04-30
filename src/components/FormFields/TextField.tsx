interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  helperText?: string;
  disabled?: boolean;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  helperText,
  disabled = false,
  error,
  multiline = false,
  rows = 3,
}: TextFieldProps) {
  const inputClasses = `w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${error ? 'border-red-500 focus:ring-red-500 focus:border-transparent' : ''
    }`;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={rows}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={inputClasses}
        />
      )}
      {error && <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-500 mt-1.5">{helperText}</p>}
    </div>
  );
}
