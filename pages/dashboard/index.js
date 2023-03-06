import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Dashboard = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  let name;
  if(typeof window !== "undefined") {
    name = JSON.parse(localStorage.getItem('name'));
  }

  const logout = () => {
    localStorage.clear();
  }

  return (
    <>
      <div className='row'>
        <div className='col-20'>
          <div className='sidebar'>
            <div className='header'>
              <div className='logo'>
                <img src="https://ik.imagekit.io/kaddigital/logo.png" alt="kad-digital-logo" />
              </div>
            </div>
            <div className='menu'>
              <h6 className="label ms-3">Menu</h6>
              <div className='mt-3'>
                <Link 
                  href="/dashboard/overview"
                  className={router.pathname == "/dashboard/overview" ? "option active" : "option"}
                  >
                  <FeatherIcon icon="home" size={20} />
                  <h6 className="option-name">Overview</h6>
                </Link>
                <Link 
                  href="/dashboard/cards"
                  className={(router.pathname == "/dashboard/cards" || router.pathname == "/dashboard/create" || router.pathname == "/dashboard/edit") ? "option active" : "option"}
                  >
                  <FeatherIcon icon="layers" size={20} />
                  <h6 className="option-name">Card</h6>
                </Link>
                <Link 
                  href="/dashboard/guest"
                  className={router.pathname == "/dashboard/guest" ? "option active" : "option"}
                  >
                  <FeatherIcon icon="file-text" size={20} />
                  <h6 className="option-name">Guests</h6>
                </Link>
                <Link 
                  href="/dashboard/feedback" 
                  className={router.pathname == "/dashboard/feedback" ? "option active" : "option"}
                  >
                  <FeatherIcon icon="message-square" size={20} />
                  <h6 className="option-name">Feedback</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='col-80 min-vh-100'>
          <div className="main-wrapper d-flex flex-column">
            <div className='header px-4 d-flex align-items-center'>
              <button className='btn menu-btn' onClick={() => setIsOpen(!isOpen)}>
                <FeatherIcon icon="menu" size={30} />
              </button>
              <div
                className={isOpen ? 'side-menu-db side-menu-open-db shadow':'side-menu-db shadow'}
              >
                <button className='btn close-btn' onClick={() => setIsOpen(!isOpen)}>
                  <FeatherIcon icon="x" size={30} />
                </button>
                <div className='min-vh-100'>
                <div className='sidebar'>
                  <div className='header'>
                    <div className='logo'>
                      <img src="https://ik.imagekit.io/kaddigital/logo.png" alt="kad-digital-logo" />
                    </div>
                  </div>
                  <div className='menu'>
                    <h6 className="label ms-3">Menu</h6>
                    <div className='mt-3' onClick={() => setIsOpen(false)}>
                      <Link 
                        href="/dashboard/overview"
                        className={router.pathname == "/dashboard/overview" ? "option active" : "option"}
                        >
                        <FeatherIcon icon="home" size={20} />
                        <h6 className="option-name">Overview</h6>
                      </Link>
                      <Link 
                        href="/dashboard/cards"
                        className={router.pathname == "/dashboard/cards" ? "option active" : "option"}
                        >
                        <FeatherIcon icon="layers" size={20} />
                        <h6 className="option-name">Card</h6>
                      </Link>
                      <Link 
                        href="/dashboard/guest"
                        className={router.pathname == "/dashboard/guest" ? "option active" : "option"}
                        >
                        <FeatherIcon icon="file-text" size={20} />
                        <h6 className="option-name">Guests</h6>
                      </Link>
                      <Link 
                        href="/dashboard/feedback" 
                        className={router.pathname == "/dashboard/feedback" ? "option active" : "option"}
                        >
                        <FeatherIcon icon="message-square" size={20} />
                        <h6 className="option-name">Feedback</h6>
                      </Link>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className='d-flex justify-content-end w-100'>
                <div>
                  <div className="dropdown">
                    <button className='btn rounded-pill px-4' data-bs-toggle="dropdown" aria-expanded="false">
                      { name } 
                      <FeatherIcon icon="user" color="" size={18} className="ms-2 mb-1" />
                    </button>
                    <ul className="dropdown-menu border-0 shadow-sm">
                      {/* <li><Link href="/account" className="dropdown-item">Account</Link></li> */}
                      <li><Link href="/" className="dropdown-item" onClick={logout}>Logout</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              { children }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard