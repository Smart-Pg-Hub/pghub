import { NavLink } from 'react-router-dom'
import { FaBed, FaUsers, FaMoneyBillWave, FaStar, FaExclamationCircle } from 'react-icons/fa'


const PropertyTabs = () => {

    return (
        <div className='card shadow border-0 rounded-4 mb-3'>
            <div className='card-body'>
                <ul className='nav nav-pills justify-content-between'>

                    <li className='nav-item'>
                        <NavLink to={'room-management'} className={({ isActive }) => isActive ? 'nav-link active bg-primary text-white rounded-pill' : 'nav-link text-dark'}>
                            <FaBed className='me-2' />
                            Rooms
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='tenants' className={({ isActive }) => isActive ? 'nav-link active bg-primary text-white rounded-pill' : 'nav-link text-dark'}>
                            <FaUsers className='me-2' />
                            Tenants
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='rent-management' className={({ isActive }) => isActive ? 'nav-link active bg-primary text-white rounded-pill' : 'nav-link text-dark'}>
                            <FaMoneyBillWave className='me-2' />
                            Monthly Rent
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='complaints' className={({ isActive }) => isActive ? 'nav-link active bg-primary text-white rounded-pill' : 'nav-link text-dark'}>
                            <FaExclamationCircle className='me-2' />
                            Complaints
                        </NavLink>
                    </li>

                    <li className='nav-item'>
                        <NavLink to='reviews' className={({ isActive }) => isActive ? 'nav-link active bg-primary text-white rounded-pill' : 'nav-link text-dark'}>
                            <FaStar className='me-2' />
                            Reviews
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    )

}

export default PropertyTabs