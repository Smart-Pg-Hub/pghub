import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function getAllProperties() {
    const url = BASE_URL + '/property/all'

    try {
        const response = await axios.get(url)

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'Failed to fetch properties',
        }
    }
}

export async function getPropertyById(id) {
    const url = BASE_URL + `/property/view/${id}`

    try {
        const response = await axios.get(url)

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'Property not found',
        }
    }
}

export async function addProperty(property, token) {
    const url = BASE_URL + '/property/addProperty'

    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }

        const response = await axios.post(url, property, { headers })

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'Failed to add property',
        }
    }
} 

export async function getPropertiesByOwnerId(ownerId, token) {
    const url = BASE_URL + `/property/owner/${ownerId}`

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
            error: error.response?.data || 'No corresponding properties',
        }
    } 
}

export async function searchPg(request) {
  const url = BASE_URL + `/property/search`

  try {
    const response = await axios.get(url, {
      params: {
        name: request.name || '',
        city: request.city || '',
        type: request.type || '',
      },
    })

    return {
      status: 'success',
      data: response.data,
    }
  } catch (error) {
    return {
      status: 'error',
      error: error.response?.data || 'No corresponding properties',
    }
  }
}


export async function addPropertyPhotos(request,token) {
  const url = BASE_URL + "/property/add-photos"
  try {
        const headers = {
            Authorization: `Bearer ${token}`, 
        }

        const response = await axios.post(url, request ,{ headers })

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'No corresponding properties',
        }
    } 
}

export async function getPropertyPhotosByPgId(propertyId,token) {
  const url = BASE_URL + `/property/get-photos/${propertyId}`
  try { 
        const headers = {
            Authorization: `Bearer ${token}`, 
        }

        const response = await axios.get(url,{ headers })

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'No corresponding photos',
        }
    } 
}

