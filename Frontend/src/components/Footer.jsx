import React from 'react'

function Footer() {
  return (
    <footer className='bg-dark text-light py-3 mt-auto'>
      <div className='container d-flex justify-content-between align-items-center flex-wrap'>
        <p className='mb-0'>
          &copy; {new Date().getFullYear()} <strong>PGHub</strong>. All Rights
          Reserved.
        </p>
        <p className='mb-0'>Premium Living Spaces</p>
      </div>
    </footer>
  )
}

export default Footer
