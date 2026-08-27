// import React, { useState } from 'react'
// import { getAddressByPincode } from '../../services/pincode'
// import { addProperty } from '../../services/property'
// import { toast } from 'react-toastify'

// const AMENITY_OPTIONS = [
// 'WiFi', 'Parking', 'Laundry', 'AC', 'Power Backup',
// 'Housekeeping', 'Meals/Food', 'TV', 'Fridge', 'Security/CCTV'
// ]

// const AddProperty = ({ show, onClose, onSuccess }) => {
// const [villages, setVillages] = useState([])
// const [property, setProperty] = useState({
// name: '', totalRooms: '', amenity: [], contact: '', email: '', pgType: 'BOYS', propertyProfilePhoto: null, address:
// { area: '', city: '', state: '', pincode: '' }
// })

// const onTextChange = async (e) => {
//     const { name, value } = e.target

//     if (['area', 'city', 'state', 'pincode'].includes(name)) {

//         const updatedAddress = {
//             ...property.address,
//             [name]: value,
//         }

//         setProperty({...property, address: updatedAddress, })

//         if (name === 'pincode' && value.length === 6) {
//             const result = await getAddressByPincode(value)

//             if (result && result.data[0].Status === 'Success') {
//                 const postOffice = result.data[0].PostOffice

//                 setVillages(postOffice)

//                 setProperty((prev) => ({ ...prev, address: { ...prev.address, pincode: value, city: postOffice[0].District, state: postOffice[0].State, },
//                 }))
//             }
//         }

//     }
//     else {
//         setProperty({
//             ...property,
//             [name]: value,
//         })
//     }
// }

// const onAmenityToggle = (amenityName) => {
//     setProperty((prev) => {
//         const exists = prev.amenity.includes(amenityName)
//         const updatedAmenities = exists
//             ? prev.amenity.filter((a) => a !== amenityName)
//             : [...prev.amenity, amenityName]
//         return { ...prev, amenity: updatedAmenities }
//     })
// }

// const onSubmit = async (e) => {
//     e.preventDefault()

//     const payload = {
//         ...property,
//         amenity: property.amenity.join(', '),
//     }

//     const token = sessionStorage.getItem('token')

//     const result = await addProperty(payload, token)

//     if (result.status === 'success') {
//         toast.success('Property added successfully')
//         if (onSuccess) onSuccess()
//         if (onClose) onClose()
//     } else {
//         toast.error(result.error || 'Failed to add property')
//     }
// }

// if (!show) return null

// return (
//     <div
//         className='modal d-block'
//         tabIndex='-1'
//         style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//         onClick={(e) => {
//             if (e.target === e.currentTarget && onClose) onClose()
//         }}
//     >
//         <div className='modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered'>
//             <div className='modal-content'>

//                 <div className='modal-header bg-primary text-white'>
//                     <h3 className='mb-0'>Add New Property</h3>
//                     <button
//                         type='button'
//                         className='btn-close btn-close-white'
//                         onClick={onClose}
//                     ></button>
//                 </div>

//                 <div className='modal-body'>
//                     <form onSubmit={onSubmit} id='addPropertyForm'>

//                         <div className='row'>

//                             <div className='col-md-6 mb-3'><label className='form-label'>Property Name</label>
//                                 <input type='text' className='form-control' name='name' value={property.name}
//                                     onChange={onTextChange} placeholder='Enter Property Name' required />
//                             </div>

//                             <div className='col-md-6 mb-3'><label className='form-label'>Contact Number</label>
//                                 <input type='tel' className='form-control' name='contact' value={property.contact}
//                                     onChange={onTextChange} placeholder='Enter Contact Number' maxLength={10} required />
//                             </div>

//                             <div className='col-md-6 mb-3'>
//                                 <label className='form-label'>Email Address</label>
//                                 <input type='email' className='form-control' name='email' value={property.email}
//                                     onChange={onTextChange} placeholder='Enter Email Address' required />
//                             </div>

//                             <div className='col-md-6 mb-3'><label className='form-label'>PG Type</label>
//                                 <select className='form-select' name='pgType' value={property.pgType}
//                                     onChange={onTextChange}><option value='BOYS'>Boys</option><option value='GIRLS'>Girls</option>
//                                     <option value='COLIVING'>Co-Living</option></select>
//                             </div>

//                             <div className='col-md-6 mb-3'>
//                                 <label className='form-label'>PG Profile Photo</label>
//                                 <input
//                                     type='file'
//                                     className='form-control'
//                                     name='propertyProfilePhoto'
//                                     onChange={(e) => setProperty({
//                                         ...property,
//                                         propertyProfilePhoto: e.target.files[0],
//                                     })}
//                                 />
//                             </div>

//                             <div className='col-12 mb-3'>
//                                 <label className='form-label d-block'>Amenities</label>
//                                 <div className='d-flex flex-wrap gap-3'>
//                                     {AMENITY_OPTIONS.map((item) => (
//                                         <div className='form-check' key={item}>
//                                             <input
//                                                 type='checkbox'
//                                                 className='form-check-input'
//                                                 id={`amenity-${item}`}
//                                                 checked={property.amenity.includes(item)}
//                                                 onChange={() => onAmenityToggle(item)}
//                                             />
//                                             <label className='form-check-label' htmlFor={`amenity-${item}`}>{item}</label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         <hr />
//                         <h5 className='mb-3'>Address Details</h5>

//                         <div className='row'>

//                             <div className='col-md-6 mb-3'><label className='form-label'>Pincode</label>
//                                 <input type='text' className='form-control' name='pincode' maxLength={6}
//                                     value={property.address.pincode} onChange={onTextChange}
//                                     placeholder='Enter Pincode' />
//                             </div>

//                             <div className='col-md-6 mb-3'><label className='form-label'>Village / Area</label>
//                                 <select className='form-select' name='area'
//                                     value={property.address.area} onChange={onTextChange}>
//                                     <option value=''>Select Village</option>
//                                     {villages.map((village, index) => (
//                                         <option key={index} value={village.Name}>{village.Name}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className='col-md-6 mb-3'><label className='form-label'>City</label>
//                                 <input type='text' className='form-control' name='city'
//                                     value={property.address.city} readOnly />
//                             </div>

//                             <div className='col-md-6 mb-3'><label className='form-label'>State</label>
//                                 <input type='text' className='form-control' name='state'
//                                     value={property.address.state} readOnly />
//                             </div>

//                         </div>
//                     </form>
//                 </div>

//                 <div className='modal-footer'>
//                     <button type='button' className='btn btn-secondary' onClick={onClose}>Cancel</button>
//                     <button type='submit' form='addPropertyForm' className='btn btn-success px-4'>Add Property</button>
//                 </div>

//             </div>
//         </div>
//     </div>
// )
// }

// export default AddProperty

import React, { useState } from 'react'
import { getAddressByPincode } from '../../services/pincode'
import { addProperty } from '../../services/property'
import { toast } from 'react-toastify'

const AMENITY_OPTIONS = [
'WiFi', 'Parking', 'Laundry', 'AC', 'Power Backup',
'Housekeeping', 'Meals/Food', 'TV', 'Fridge', 'Security/CCTV'
]

const AddProperty = ({ show, onClose, onSuccess }) => {
const [villages, setVillages] = useState([])
const [property, setProperty] = useState({
name: '', totalRooms: '', amenity: [], contact: '', email: '', pgType: 'BOYS', propertyProfilePhoto: null, address:
{ area: '', city: '', state: '', pincode: '' }
})

const onTextChange = async (e) => {
    const { name, value } = e.target

    if (['area', 'city', 'state', 'pincode'].includes(name)) {

        const updatedAddress = {
            ...property.address,
            [name]: value,
        }

        setProperty({
            ...property,
            address: updatedAddress,
        })

        if (name === 'pincode' && value.length === 6) {
            const result = await getAddressByPincode(value)

            if (result && result.data[0].Status === 'Success') {
                const postOffice = result.data[0].PostOffice

                setVillages(postOffice)

                setProperty((prev) => ({
                    ...prev, address: {
                        ...prev.address, pincode: value, city: postOffice[0].District, state: postOffice[0].State,
                    },
                }))
            }
        }

    }
    else {
        setProperty({
            ...property,
            [name]: value,
        })
    }
}

const onAmenityToggle = (amenityName) => {
    setProperty((prev) => {
        const exists = prev.amenity.includes(amenityName)
        const updatedAmenities = exists
            ? prev.amenity.filter((a) => a !== amenityName)
            : [...prev.amenity, amenityName]
        return { ...prev, amenity: updatedAmenities }
    })
}

const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('name', property.name)
    formData.append('totalRooms', property.totalRooms)
    formData.append('amenity', property.amenity.join(', '))
    formData.append('contact', property.contact)
    formData.append('email', property.email)
    formData.append('pgType', property.pgType)

    formData.append('address.area', property.address.area)
    formData.append('address.city', property.address.city)
    formData.append('address.state', property.address.state)
    formData.append('address.pincode', property.address.pincode)

    if (property.propertyProfilePhoto) {
        formData.append('propertyProfilePhoto', property.propertyProfilePhoto)
    }

    const token = sessionStorage.getItem('token')

    const result = await addProperty(formData, token)

    if (result.status === 'success') {
        toast.success('Property added successfully')
        if (onSuccess) onSuccess()
        if (onClose) onClose()
    } else {
        toast.error(result.error || 'Failed to add property')
    }
}

if (!show) return null

return (
    <div
        className='modal d-block'
        tabIndex='-1'
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={(e) => {
            if (e.target === e.currentTarget && onClose) onClose()
        }}
    >
        <div className='modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered'>
            <div className='modal-content'>

                <div className='modal-header bg-primary text-white'>
                    <h3 className='mb-0'>Add New Property</h3>
                    <button
                        type='button'
                        className='btn-close btn-close-white'
                        onClick={onClose}
                    ></button>
                </div>

                <div className='modal-body'>
                    <form onSubmit={onSubmit} id='addPropertyForm'>

                        <div className='row'>

                            <div className='col-md-6 mb-3'><label className='form-label'>Property Name</label>
                                <input type='text' className='form-control' name='name' value={property.name}
                                    onChange={onTextChange} placeholder='Enter Property Name' required />
                            </div>

                            <div className='col-md-6 mb-3'><label className='form-label'>Contact Number</label>
                                <input type='tel' className='form-control' name='contact' value={property.contact}
                                    onChange={onTextChange} placeholder='Enter Contact Number' maxLength={10} required />
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Email Address</label>
                                <input type='email' className='form-control' name='email' value={property.email}
                                    onChange={onTextChange} placeholder='Enter Email Address' required />
                            </div>

                            <div className='col-md-6 mb-3'><label className='form-label'>PG Type</label>
                                <select className='form-select' name='pgType' value={property.pgType}
                                    onChange={onTextChange}><option value='BOYS'>Boys</option><option value='GIRLS'>Girls</option>
                                    <option value='COLIVING'>Co-Living</option></select>
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>PG Profile Photo</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={(e) => {
                                        setProperty({
                                            ...property,
                                            propertyProfilePhoto: e.target.files[0],
                                        })
                                    }}
                                />
                            </div>

                            <div className='col-12 mb-3'>
                                <label className='form-label d-block'>Amenities</label>
                                <div className='d-flex flex-wrap gap-3'>
                                    {AMENITY_OPTIONS.map((item) => (
                                        <div className='form-check' key={item}>
                                            <input
                                                type='checkbox'
                                                className='form-check-input'
                                                id={`amenity-${item}`}
                                                checked={property.amenity.includes(item)}
                                                onChange={() => onAmenityToggle(item)}
                                            />
                                            <label className='form-check-label' htmlFor={`amenity-${item}`}>{item}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr />
                        <h5 className='mb-3'>Address Details</h5>

                        <div className='row'>

                            <div className='col-md-6 mb-3'><label className='form-label'>Pincode</label>
                                <input type='text' className='form-control' name='pincode' maxLength={6}
                                    value={property.address.pincode} onChange={onTextChange}
                                    placeholder='Enter Pincode' />
                            </div>

                            <div className='col-md-6 mb-3'><label className='form-label'>Village / Area</label>
                                <select className='form-select' name='area'
                                    value={property.address.area} onChange={onTextChange}>
                                    <option value=''>Select Village</option>
                                    {villages.map((village, index) => (
                                        <option key={index} value={village.Name}>{village.Name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='col-md-6 mb-3'><label className='form-label'>City</label>
                                <input type='text' className='form-control' name='city'
                                    value={property.address.city} readOnly />
                            </div>

                            <div className='col-md-6 mb-3'><label className='form-label'>State</label>
                                <input type='text' className='form-control' name='state'
                                    value={property.address.state} readOnly />
                            </div>

                        </div>
                    </form>
                </div>

                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' onClick={onClose}>Cancel</button>
                    <button type='submit' form='addPropertyForm' className='btn btn-success px-4'>Add Property</button>
                </div>

            </div>
        </div>
    </div>
)
}

export default AddProperty