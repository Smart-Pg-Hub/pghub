import axios from 'axios'

export const getAddressByPincode = async (pincode) => {
    try {
        const response = await axios.get(
            `https://api.postalpincode.in/pincode/${pincode}`
        )
         return {
            status: 'success',
            data: response.data
        }
    }

        catch (err) {
        return {
            status: 'error',
            error: err.response?.data || 'Failed to fetch address'
        }
    }
}