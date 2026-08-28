import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function getAdminDashboard(token) {
  const url = BASE_URL + '/admin/dashboard'

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
      error:
        error.response?.data ||
        error.message ||
        'Failed to get admin dashboard',
    }
  }
}

export async function getAllAdminUsers(token) {
  const url = BASE_URL + '/admin/users'

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
      error:
        error.response?.data ||
        error.message ||
        'Failed to get all users',
    }
  }
}

export async function getAdminOwners(token) {
  const url = BASE_URL + '/admin/owners'

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
      error:
        error.response?.data ||
        error.message ||
        'Failed to get owners',
    }
  }
}