import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function registerUser(request) {
  const url = BASE_URL + '/auth/signUp'

  try {
    const response = await axios.post(url, request)

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Registration Failed',
    }
  }
}

export async function loginUser(request) {
  const url = BASE_URL + '/auth/login'

  try {
    const response = await axios.post(url, request)

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: 'Invalid email or password',
    }
  }
}

export async function registerTenant(request) {
  const url = BASE_URL + '/tenant/register'

  try {
    const response = await axios.post(url, request)

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Registration Failed',
    }
  }
}

export async function registerOwner(request) {
  const url = BASE_URL + '/owner/register'

  try {
    const response = await axios.post(url, request)

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Registration Failed',
    }
  }
}


export async function userUpdate(data, token) {
  const url = BASE_URL + '/auth/update'

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }



    const response = await axios.put(url, data, { headers })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'Update Failed',
    }
  }
}

