interface ContactFromFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function ContactFromField({ value, onChange }: ContactFromFieldProps) {
  return (
    <label
      style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      data-component="ContactFromField"
    >
      <span style={{ fontSize: '12px', fontWeight: 600 }}>From</span>
      <input
        type="email"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="your@email.com"
        required
        style={{
          padding: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '13px',
        }}
      />
    </label>
  )
}
