import { useCallback, useEffect, useState } from 'react'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { Drawer } from 'antd'
// import SampleQR from "../images/sample-qr.png";
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useDispatch, useSelector } from 'react-redux';
import { pauseMusic } from '../store/themeReducer';
import { Modal } from 'antd';
import api from '../api';

import RiceCookerImg from '../public/rice-cooker.png';
import SteamIronImg from '../public/iron.png';
import OvenImg from '../public/oven.jpeg';
import Image from 'next/image';
import Link from 'next/link';

const CardMenu = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [gift, setGift] = useState([]);
  const [selectedGift, setSelectedGift] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const isPause = useSelector(state => state.theme.isPause);

  useEffect(() => {
    if(data) {
      getGiftData(data.uid);

      if(typeof data.contacts === 'string') {
        setContacts(JSON.parse(data.contacts));
      } else {
        setContacts(data.contacts);
      }
    } else {
      const giftData = [
        {
          image: RiceCookerImg,
          name: "Rice Cooker",
        },
        {
          image: SteamIronImg,
          name: "Steam Iron",
        },
        {
          image: OvenImg,
          name: "Oven",
        }
      ]
      setGift(giftData)
    }
  },[data])

  const getGiftData = useCallback(async (userId) => {
    if(userId) {
      try {
        api.get('/api/gift/get/' + userId).then((res) => {
          if(res.data.status === 'success') {
            if(res.data.data.length !== 0) {
              setGift(res.data.data);
            }
          }
        })
      } catch (e) {
        if(e.response) {
          console.log(e.response.data.message);
        }
      }
    }
  },[])

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

  const reserveGift = async () => {
    const guest = localStorage.getItem('guest');

    if(guest) {
      let body = {
        id: selectedGift.id,
        uid: data.uid,
        status: "Reserved",
        reserved_by: guest
      }

      try {
        api.put('/api/gift/reserve', body).then((res) => {
          if(res.data.status === 'success') {
            getGiftData(body.uid);
          }
        })
      } catch (e) {
        if(e.response) {
          console.log(e.response.data.message);
        }
      }
    } else {
      setIsModalErrorOpen(true);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    reserveGift();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Reserve Gift')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="gift" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Gift</h6>
              </div>
            </div>
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
                {contacts.length === 0 &&
                  <div className="text-center">
                    No contact available
                  </div>
                }
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
            {modalTitle === 'Reserve Gift' &&
              <div className='menu-content'>
                {gift.length === 0 &&
                  <div className="text-center">
                    No gift available
                  </div>
                }
                {gift.map((gift, key) => {
                  return (
                    <div key={key} 
                      className={gift.status === 'Reserved' ? 
                      'menu-item d-flex justify-content-between opacity-50'
                      :
                      'menu-item d-flex justify-content-between'
                      }
                    >
                      <div className='d-flex flex-row'>
                        <img
                          src={ gift.image }
                          alt="rice-cooker"
                          className='menu-logo'
                        />
                        <div className='d-flex align-items-center ms-3'>
                          <h6 className='menu-name gift-name mt-2'>{ gift.name }</h6>
                        </div>
                      </div>
                      <div className='d-flex align-items-center'>
                        {gift.link &&
                          <Link href={gift.link} target='_blank' className="btn btn-light px-2 rounded-pill me-2">
                            <FeatherIcon icon="link" size={16} style={{ marginTop: '-3px' }} />
                          </Link>
                        }
                        {gift.status === 'Available' &&
                          <button onClick={() => { setSelectedGift(gift);showModal() }} className='btn btn-dark rounded-pill'>
                            Reserve
                          </button>
                        }
                        {gift.status === 'Reserved' &&
                          <button onClick={() => { setSelectedGift(gift);showModal() }} className='btn btn-dark rounded-pill'
                            disabled>
                            { gift.status }
                          </button>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </Drawer>

          <Modal 
            title="Reserve gift" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
            okText="Confirm" centered
          >
            <p>
              Are you sure you want to reserve <b>{ selectedGift.name }</b>?
              You can't undo this action.
            </p>
          </Modal>

          <Modal 
            title="Unable to reserve" open={isModalErrorOpen} 
            onOk={() => setIsModalErrorOpen(false)} 
            onCancel={() => setIsModalErrorOpen(false)} 
            centered
          >
            <p>
              Please fill in RVSP form before reserve a gift
            </p>
          </Modal>
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
            <div className="col d-flex justify-content-center">
              <div className='menu' onClick={() => showDrawer('Reserve Gift')}>
                <div className='d-flex justify-content-center'>
                  <FeatherIcon icon="gift" size={20} className="icon" />
                </div>
                <h6 className="card-title text-center text-secondary mt-1">Gift</h6>
              </div>
            </div>
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
            {modalTitle === 'Reserve Gift' &&
              <div className='menu-content'>
                {gift.map((gift, key) => {
                  return (
                    <div key={key} className='menu-item d-flex justify-content-between'>
                      <div className='d-flex flex-row'>
                        <Image
                          src={ gift.image }
                          alt="rice-cooker"
                          className='menu-logo'
                        />
                        <div className='d-flex align-items-center ms-3'>
                          <h6 className='menu-name mt-2'>{ gift.name }</h6>
                        </div>
                      </div>
                      <div className='d-flex align-items-center'>
                        <button onClick={() => { setSelectedGift(gift);showModal() }} className='btn btn-dark rounded-pill'>Reserve</button>
                      </div>
                    </div>
                  )
                })}
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

          <Modal 
            title="Reserve gift" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
            okText="Confirm" centered
          >
            <p>
              Are you sure you want to reserve <b>{ selectedGift.name }</b>?
              You can't undo this action.
            </p>
          </Modal>
        </div>
      }
    </>
  )
}

export default CardMenu