import { useEffect, useState } from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { Drawer } from 'antd'
// import SampleQR from "../images/sample-qr.png";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useDispatch, useSelector } from 'react-redux';
import { pauseMusic } from '../store/themeReducer';

const CardMenu = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const isPause = useSelector(state => state.theme.isPause);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if(data) {
      if(typeof data.contacts === 'string') {
        setContacts(JSON.parse(data.contacts));
      } else {
        setContacts(data.contacts);
      }
    }
  },[data])

  const showDrawer = (title) => {
    setOpen(false);
    setTimeout(() => {
      setModalTitle(title);
      setOpen(true);
    }, 50);
  };

  const onClose = () => {
    setOpen(false);
  };

  useScrollPosition(({ currPos }) => {
    const isShow = currPos.y < -50
    if (isShow !== showMenu) setShowMenu(isShow)
  }, [showMenu])

  const pause = () => {
    dispatch(pauseMusic(!isPause));
  }

  const setCalendar = () => {
    // const title = "Walimatul Urus: " + data.men_short_name + " dan " + data.women_short_name;
    // const start_date = new Date(data.wedding_date);
    // const end_date = new Date(data.wedding_date);
    // // let url = "";

    // if (start_date !== '') {
    //   var dates = start_date.toISOString() + "Z";
    //   if (end_date !== '') {
    //     dates = dates + "/" + end_date.toISOString() + "Z";
    //   }
    //   dates = dates.replace(/-/g, "");
    // }

    // url = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURI(title)}&dates=${dates}`;
    // window.open(url, "_blank");
  }

  return (
    <>
      {data && 
        <div className={ showMenu ? 'card-menu d-flex align-items-center':'card-hide card-menu d-flex align-items-center' }>
          <div className="row m-0 w-100">
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Wedding Map')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="map-pin" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Map</h6>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Contact')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="phone" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Contact</h6>
              </div>
            </div>
            {/* <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Set Wedding Reminder')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="calendar" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Calendar</h6>
              </div>
            </div> */}
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={pause}>
                <div className='d-flex justify-content-center'>
                  {!isPause &&
                    <FeatherIcon icon="pause-circle" size={20} className="icon" />
                  }
                  {isPause &&
                    <FeatherIcon icon="play-circle" size={20} className="icon" />
                  }
                </div>
                <h6 className="card-title text-center text-secondary mt-1">
                  { !isPause ? 'Pause':'Play' }
                </h6>
              </div>
            </div>
          </div>

          <Drawer
            title={modalTitle}
            placement="bottom"
            closable={true}
            onClose={onClose}
            open={open}
            size="default"
          >
            {modalTitle === 'Wedding Map' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className='d-flex flex-row'>
                    <img className='menu-logo' src="https://ik.imagekit.io/kaddigital/google-maps.png" alt="google-maps" />
                    <div className='d-flex align-items-center ms-3'>
                      <h6 className='menu-name mt-2'>Google Maps</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <a
                      href={data.google_maps_url}
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-dark rounded-pill'
                    >
                      Open
                    </a>
                  </div>
                </div>
                <div className='menu-item d-flex justify-content-between mt-2'>
                  <div className='d-flex flex-row'>
                    <img className='menu-logo' src="https://ik.imagekit.io/kaddigital/waze.png" alt="waze" />
                    <div className='d-flex align-items-center ms-3'>
                      <h6 className='menu-name mt-2'>Waze</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <a 
                      href={data.waze_url}
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-dark rounded-pill'
                    >
                      Open
                    </a>
                  </div>
                </div>
              </div>
            }
            {modalTitle === 'Contact' &&
              <div className='menu-content'>
                {contacts.map((contact,key) => {
                  return (
                    <div key={key} className='menu-item d-flex justify-content-between'>
                      <div className='d-flex flex-row'>
                        <div>
                          <h6 className='menu-name mt-2'>{ contact.name }</h6>
                          <h6 className='menu-subtitle text-secondary'>{ contact.info }</h6>
                        </div>
                      </div>
                      <div className='d-flex align-items-center'>
                        <a 
                          href={'https://api.whatsapp.com/send?phone=' + contact.phone_number + '&text=Hi'}
                          target="_blank"
                          rel="noreferrer"
                          className='btn btn-outline-dark rounded-pill me-2'
                        >
                          Whatsapp
                        </a>
                        <a 
                          href={'tel:' + contact.phone_number}
                          target="_blank"
                          rel="noreferrer"
                          className='btn btn-dark rounded-pill'
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            }
            {modalTitle === 'Set Wedding Reminder' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className='d-flex flex-row'>
                    <img className='menu-logo' src="https://ik.imagekit.io/kaddigital/google-calendar.png" alt="google-calendar" />
                    <div className='d-flex align-items-center ms-3'>
                      <h6 className='menu-name mt-2'>Google Calendar</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <button onClick={setCalendar} className='btn btn-dark rounded-pill'>Set</button>
                  </div>
                </div>
              </div>
            }
            {/* {modalTitle === 'Send money gift' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className="d-flex flex-column">
                    <img className='qr-image w-75 mx-auto' src={SampleQR} alt="qr" />
                    <p className="text-secondary mt-3 text-center">
                      Scan DuitNow QR to send money gift to the bride
                    </p>
                  </div>
                </div>
              </div>
            } */}
          </Drawer>
        </div>
      }
      {!data && 
        <div className={ showMenu ? 'card-menu d-flex align-items-center':'card-hide card-menu d-flex align-items-center' }>
          <div className="row m-0 w-100">
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Wedding Map')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="map-pin" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Map</h6>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Contact')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="phone" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Contact</h6>
              </div>
            </div>
            {/* <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Set Wedding Reminder')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="calendar" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Calendar</h6>
              </div>
            </div> */}
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={pause}>
                <div className='d-flex justify-content-center'>
                  {!isPause &&
                    <FeatherIcon icon="pause-circle" size={20} className="icon" />
                  }
                  {isPause &&
                    <FeatherIcon icon="play-circle" size={20} className="icon" />
                  }
                </div>
                <h6 className="card-title text-center text-secondary mt-1">
                  { !isPause ? 'Pause':'Play' }
                </h6>
              </div>
            </div>
          </div>

          <Drawer
            title={modalTitle}
            placement="bottom"
            closable={true}
            onClose={onClose}
            open={open}
            size="default"
          >
            {modalTitle === 'Wedding Map' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className='d-flex flex-row'>
                    <img className='menu-logo' src="https://ik.imagekit.io/kaddigital/google-maps.png" alt="google-maps" />
                    <div className='d-flex align-items-center ms-3'>
                      <h6 className='menu-name mt-2'>Google Maps</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <a
                      href="https://goo.gl/maps/43L7ohdXrZduDLMv9"
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-dark rounded-pill'
                    >
                      Open
                    </a>
                  </div>
                </div>
                <div className='menu-item d-flex justify-content-between mt-2'>
                  <div className='d-flex flex-row'>
                    <img className='menu-logo' src="https://ik.imagekit.io/kaddigital/waze.png" alt="wazw" />
                    <div className='d-flex align-items-center ms-3'>
                      <h6 className='menu-name mt-2'>Waze</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <a
                      href="https://www.waze.com/en/live-map/directions/my/selangor/shah-alam/villamay-shah-alam?navigate=yes&place=ChIJOR7Q02ZSzDERVTYwsmlYTj8&utm_campaign=default&utm_medium=lm_share_location&utm_source=waze_website"
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-dark rounded-pill'
                    >
                      Open
                    </a>
                  </div>
                </div>
              </div>
            }
            {modalTitle === 'Contact' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className='d-flex flex-row'>
                    <div>
                      <h6 className='menu-name mt-2'>Azman</h6>
                      <h6 className='menu-subtitle text-secondary'>Ayah</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <a 
                      href='https://api.whatsapp.com/send?phone=0123456789&text=Hi'
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-outline-dark rounded-pill me-2'
                    >
                      Whatsapp
                    </a>
                    <a 
                      href='tel:0123456789'
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-dark rounded-pill'
                    >
                      Call
                    </a>
                  </div>
                </div>
                <div className='menu-item d-flex justify-content-between'>
                  <div className='d-flex flex-row'>
                    <div>
                      <h6 className='menu-name mt-2'>Fatimah</h6>
                      <h6 className='menu-subtitle text-secondary'>Ibu</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <a 
                      href='https://api.whatsapp.com/send?phone=0123456789&text=Hi'
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-outline-dark rounded-pill me-2'
                    >
                      Whatsapp
                    </a>
                    <a 
                      href='tel:0123456789'
                      target="_blank"
                      rel="noreferrer"
                      className='btn btn-dark rounded-pill'
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            }
            {modalTitle === 'Set Wedding Reminder' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className='d-flex flex-row'>
                    <img className='menu-logo' src="https://ik.imagekit.io/kaddigital/google-calendar.png" alt="google-calendar" />
                    <div className='d-flex align-items-center ms-3'>
                      <h6 className='menu-name mt-2'>Google Calendar</h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <button className='btn btn-dark rounded-pill'>Set</button>
                  </div>
                </div>
              </div>
            }
            {modalTitle === 'Send money gift' &&
              <div className='menu-content'>
                <div className='menu-item d-flex justify-content-between'>
                  <div className="d-flex flex-column">
                    <img className='qr-image w-75 mx-auto' src={SampleQR} alt="qr" />
                    <p className="text-secondary mt-3 text-center">
                      Scan DuitNow QR to send money gift to the bride
                    </p>
                  </div>
                </div>
              </div>
            }
          </Drawer>
        </div>
      }
    </>
  )
}

export default CardMenu