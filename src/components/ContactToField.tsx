interface ContactToFieldProps {
  value: string
}

export default function ContactToField({ value }: ContactToFieldProps) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }} data-component="ContactToField">
      <span style={{ fontSize: '12px', fontWeight: 600 }}>To</span>
      <input
        type="email"
        value={value}
        readOnly
        style={{
          padding: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '13px',
          backgroundColor: '#f9fafb',
        }}
      />
    </label>
  )
}
