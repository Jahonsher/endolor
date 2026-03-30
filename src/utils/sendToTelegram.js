const BOT_TOKEN = '8425127321:AAEUH1k5StFWbw13I-DMuzIigIjnlndyC3o'
const CHAT_ID = '-1003528925275'

export async function sendToTelegram(message) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })
    return res.ok
  } catch (error) {
    console.error('Telegram xatolik:', error)
    return false
  }
}