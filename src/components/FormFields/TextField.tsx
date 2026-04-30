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
  const inputClasses = `w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-slate-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed ${error ? 'border-red-500 focus:ring-red-500 focus:border-transparent' : ''
    }`;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
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
      {error && <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">{helperText}</p>}
    </div>
  );
}
