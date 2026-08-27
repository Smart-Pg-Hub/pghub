import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function createComplaints(request, token) {
  const url = BASE_URL + '/complaints/create'
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(url, request, { headers })

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

export async function getComplaints(token) {
  const url = BASE_URL + '/complaints/getComplaints'
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(url, { headers })

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

export async function getAllcomplaints(pgId, token) {
  const url = BASE_URL + `/complaints/get-Bypg/${pgId}`
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.get(url, { headers })

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

export async function resolveComplaint(cmpId, token) {
  const url = BASE_URL + `/complaints/resolve/${cmpId}`

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.put(url, {}, { headers })

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
