import axios from 'axios'
import { config } from './config'

const BASE_URL = config.BASE_URL

export async function addreviews(request){
    const url=BASE_URL+'/reviews/addreviews'

    try {
    const response = await axios.post(url,request)

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

export async function getreviews(propertyid){
    const url=BASE_URL+`/reviews/getreviews/${propertyid}`

    try {
    const response = await axios.get(url)

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