import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL



export async function getTenantDetailsByPgId(pgId, token) {

  const url = BASE_URL + `/booking/getTenants/${pgId}`

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.get(url,  { headers } )

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Failed to get tenant details',
    }
  }
}

export async function checkout(bookingId,action, token) {

  const url = BASE_URL + `/booking/checkout-approval/${bookingId}`
 
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.put(url, action, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Checkout failed',
    }
  }
}

export async function checkoutRequest(bookingId, token) {

  const url = BASE_URL + `/booking/checkout-request/${bookingId}`
 
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.put(url, {}, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Checkout failed',
    }
  }
}









export async function bookingValidation(roomId, token, tenantId = null) {

    const url = BASE_URL + `/booking/validate/${roomId}`

    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    const params = tenantId ? { tenantId } : {}

    try {
        const response = await axios.post(url, {}, { headers, params })

        return {
            status: 'success',
            data: response.data
        }

    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || error.message
        }
    }
}


export async function bookNewRoom(request, token) {

  const url = BASE_URL + '/booking/book-room'

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.post(url, request, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } 
  catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Booking failed',
    }
  }
}




export async function getBookingSummary(id, token) {

  const url = BASE_URL + `/booking/summary/${id}`

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.get(url, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Failed to get booking summary',
    }
  }
}


export async function getMyBookings(token) {

  const url = BASE_URL + '/booking/my-bookings'

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.get(url, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Failed to get bookings',
    }
  }
}

export async function getMyPg(token) {

  const url = BASE_URL + '/booking/my-pg'

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.get(url, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Failed to get bookings',
    }
  }
}


export async function getMyRoom(token) {

  const url = BASE_URL + '/booking/my-room'

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  try {
    const response = await axios.get(url, { headers })

    return {
      status: 'success',
      data: response.data,
    }

  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Failed to get bookings',
    }
  }
}

