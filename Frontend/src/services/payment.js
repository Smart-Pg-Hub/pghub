import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL
export async function getPaymentsByProperty(propertyId, token) {
  const url = `${BASE_URL}/payment/allPayments/${propertyId}`

  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Order Creation Failed',
    }
  }
}

export async function createOrder(data, token) {
  const url = `${BASE_URL}/payment/create-order`

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Order Creation Failed',
    }
  }
}

export async function verifyPayment(data, token) {
  const url = `${BASE_URL}/payment/verify`

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Payment Verification Failed',
    }
  }
}


export async function getRent(tenantId, token) {
  const url = `${BASE_URL}/rent/tenant/${tenantId}`

  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Payment Verification Failed',
    }
  }
}


export async function payRent(rentId, request, token) {
    const url = `${BASE_URL}/rent/pay/${rentId}`

    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }

        const response = await axios.post(url, request, { headers })

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'Payment Failed',
        }
    }
}

export async function createRent(data, token) {
  const url = `${BASE_URL}/rent/create`

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Payment Verification Failed',
    }
  }
}



export async function getRentDetails(tenantId, token) {
  const url = `${BASE_URL}/rent/property/${tenantId}`

  try {
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Payment Verification Failed',
    }
  }
}