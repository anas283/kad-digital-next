import Link from 'next/link'
import { useState } from 'react';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-kd">
      <div className='container py-3'>
        <div className="d-flex justify-content-between d-flex align-items-center">
          <div className="col">
            <Link href="/">
              <img className='logo' src="https://ik.imagekit.io/kaddigital/logo.png" alt="kad-digital-logo" />
            </Link>
          </div>
          <div className="col d-flex justify-content-end">
            <div className="navigation d-flex flex-row d-flex align-items-center">
              <Link href="/" className="menu p-2 ms-4">Home</Link>
              <Link href="/themes" className="menu p-2 ms-4">Themes</Link>
              <Link href="/contact" className="menu p-2 ms-4">Contact Us</Link>
              <div className="menu ms-5">
                <Link href="/login">
                  <button className="btn btn-outline-dark rounded-pill px-4">Login</button>
                </Link>
              </div>
            </div>
          </div>
          <button className='btn menu-btn' onClick={() => setIsOpen(!isOpen)}>
            <FeatherIcon icon="menu" size={30} />
          </button>
          <div
            className={isOpen ? 'side-menu side-menu-open p-3 shadow-sm':'side-menu p-3 shadow-sm'}
          >
            <button className='btn close-btn' onClick={() => setIsOpen(!isOpen)}>
              <FeatherIcon icon="x" size={30} />
            </button>
            <div className='min-vh-100 d-flex justify-content-center align-items-center'>
              <div className="d-flex flex-column">
                <Link href="/" className="menu">Home</Link>
                <Link href="/themes" className="menu">Themes</Link>
                <Link href="/contact" className="menu">Contact Us</Link>
                <div className="menu d-flex justify-content-center">
                  <Link href="/login">
                    <button className="btn btn-login btn-outline-dark rounded-pill px-4">Login</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar