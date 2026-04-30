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
  return (
    <div>
      <label className="label-text">{label}</label>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={rows}
          className={`input-field resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
      )}
      {error && <p className="helper-text text-red-600">{error}</p>}
      {helperText && !error && <p className="helper-text">{helperText}</p>}
    </div>
  );
}
