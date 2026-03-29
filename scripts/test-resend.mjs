const apiKey = process.env.RESEND_API_KEY
const from = process.env.RESEND_FROM || 'contact@nikhilkgupta.uk'
const to = process.env.RESEND_TO || 'contact@nikhilkgupta.uk'

if (!apiKey) {
  console.error('Missing RESEND_API_KEY')
  process.exit(1)
}

const payload = {
  from,
  to,
  subject: 'Resend API test 33333',
  text: `Test 3333 message sent at ${new Date().toISOString()}`,
}

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})

if (!response.ok) {
  const errorText = await response.text()
  console.error(`Send failed (${response.status}): ${errorText}`)
  process.exit(1)
}

const result = await response.json()
console.log('Send success:', result)
