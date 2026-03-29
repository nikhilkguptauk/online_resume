interface ContactMessageFieldProps {
  value: string
  onChange: (value: string) => void
}

export default function ContactMessageField({ value, onChange }: ContactMessageFieldProps) {
  return (
    <label
      style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
      data-component="ContactMessageField"
    >
      <span style={{ fontSize: '12px', fontWeight: 600 }}>Message</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your message..."
        required
        rows={6}
        style={{
          padding: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '13px',
          resize: 'vertical',
        }}
      />
    </label>
  )
}
