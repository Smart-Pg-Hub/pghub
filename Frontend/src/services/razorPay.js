import { createOrder, verifyPayment } from './payment'

export async function startRazorpayPayment(orderRequest) {

    const token = sessionStorage.getItem('token')

    const result = await createOrder(orderRequest, token)
    console.log('Create Order Result:', result)

    const newdata = result.data

    console.log('Order:', newdata)

    if (result.status !== 'success') {
        alert('Unable to create order')
        return
    }

    const order = result.data

    return new Promise((resolve, reject) => {

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: order.amount,
            currency: order.currency,
            order_id: order.orderId,
            name: 'Smart PG',
            description: orderRequest.paymentType,
            theme: {
                color: '#0d6efd',
            },         
            handler: async function (response) {
    try {

        console.log('Razorpay Response:', response)

        const verifyData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
        }

        const verify = await verifyPayment(verifyData, token)

        console.log('Verify Response:', verify)

        if (verify.status !== 'success') {

            resolve({
                status: 'error',
                message: 'Payment Verification Failed'
            })

            return
        }

        resolve({
            status: 'success',
            paymentDetails: {
                amount: orderRequest.amount,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
            }
        })

    } catch (err) {

        console.error(err)

        resolve({
            status: 'error',
            message: err.message
        })

    }

},
         
            modal: {
                ondismiss: function () {
                    resolve({
                        status: 'cancelled'
                    })
                }
            }
        }

        const razorpay = new window.Razorpay(options)

        razorpay.on('payment.failed', function (response) {
            resolve({
                status: 'error',
                message: response.error.description
            })
        })

        razorpay.open()
    })
}