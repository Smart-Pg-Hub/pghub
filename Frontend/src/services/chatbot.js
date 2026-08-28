import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function sendChatMessage(message, sessionId, token) {
  const url = BASE_URL + '/chat'
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(url, { message, sessionId }, { headers })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Chat request failed',
    }
  }
}