import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function getRooms(pgId, token) { 
    const url = BASE_URL + `/room/getAll/${pgId}`
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
            error: error.response?.data || 'Failed to fetch rooms',
        }
    }
}

export async function addRoom(room, token) {
    const url = BASE_URL + '/room/add'

    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }

        const response = await axios.post(url, room, { headers })

        return {
            status: 'success',
            data: response.data,
        }
    } catch (error) {
        return {
            status: 'error',
            error: error.response?.data || 'Failed to add room',
        }
    }
}