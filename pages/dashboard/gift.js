import Head from "next/head"
import { useCallback, useEffect, useState } from "react";
import Dashboard from "./index"
import FeatherIcon from 'feather-icons-react';
import Link from "next/link";
import api from '../../api';
import { Button, message, Modal } from 'antd';
import { storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";

const gift = () => {
  const [gift, setGift] = useState([]);
  const [userId, setUserId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftName, setGiftName] = useState([]);
  const [cardExist, setCardExist] = useState(false);

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  useEffect(() => {
    getCardData(userId);
  },[userId])

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

  const getCardData = useCallback(async (userId) => {
    if(userId) {
      try {
        api.post('/api/card/get/' + userId).then((res) => {
          if(res.data.status === 'success') {
            if(res.data.data.length !== 0) {
              getGiftData(userId);
              setCardExist(true);
            } else {
              setCardExist(false);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const deleteGift = async () => {
    try {
      await api.delete("/api/gift/delete/" + giftName.id)
      .then((res) => {
        if(res.data.status === 'success') {
          setIsModalOpen(false);
          deleteImageFromFirebase(giftName.image);
          message.success("Gift deleted successfully");
          setGift([]);
          getGiftData(userId);
        }
      })
    } catch (e) {
      if(e.response) {
        console.log(e.response.data.message);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const meta = {
    title: "Gift",
    description: "Craft beautiful wedding cards that ensure your guests don't miss out on the special event!",
    type: "website",
  }

  const deleteImageFromFirebase = (refUrl) => { 
    const imageRef = ref(storage, refUrl)
    deleteObject(imageRef)
      .catch((error) => {
        console.log("Failed to delete image: ", error)
      })
  }

  return (
    <Dashboard>
      <Head>
        <title>{ meta.title }</title>
        <meta name="description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
      </Head>
      <div className="h-100 ml-sm">
        {gift.length !== 0 &&
          <div className="p-3 pb-0">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="page-title">Gift</h5>
              <Link href="/dashboard/add-gift" className="btn btn-purple px-4" style={{ marginTop: '-8px' }}>
                <FeatherIcon icon="plus" size={16} className="plus-icon" />
                Add gift
              </Link>
            </div>
          </div>
        }
        <div className="d-flex flex-wrap p-3 pt-0 mt-2">
          {gift.map((data,index) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 pe-2 pb-2" key={index}>
                <div className="card card-theme gift-item border-0 p-3">
                  <div className="gift-image">
                    <img src={data.image} alt={data.image} />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="fw-500 mt-3">
                        { data.name }
                      </h6>
                      <h6 className="fw-500 text-secondary description">
                        { data.category }
                      </h6>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <div>
                        {data.status === 'Available' &&
                          <span className="badge rounded-pill bg-success mt-3">
                            { data.status }
                          </span>
                        }
                        {data.status === 'Reserved' &&
                          <span className="badge rounded-pill bg-warning mt-3">
                            { data.status } by { data.reserved_by }
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-1">
                    <Link href={'/dashboard/edit-gift/' + data.id} className="btn btn-light px-4 mt-2">Edit</Link>
                    <button className="btn btn-light px-3 mt-2 ms-2"
                      onClick={() => {
                        setGiftName({
                          id: data.id,
                          name: data.name,
                          image: data.image,
                        });
                        showModal();
                      }}
                    >
                      <FeatherIcon icon="trash" size={16} style={{ marginTop: '-3px' }} />
                    </button>
                    {data.link &&
                      <Link href={data.link} target='_blank' className="btn btn-light px-3 mt-2 ms-2">
                        <FeatherIcon icon="link" size={16} style={{ marginTop: '-3px' }} />
                      </Link>
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Modal title="Delete gift?"
          open={isModalOpen} onOk={deleteGift} onCancel={handleCancel}
          okText="Delete"
        >
          <p>
            Are you sure you want to delete <b>{ giftName.name }</b>?
            You can't undo this action.
          </p>
        </Modal>
        {(gift.length === 0 && cardExist) &&
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="p-3">
              <div className="empty-card">
                <div className="d-flex justify-content-center align-items-center">
                  <FeatherIcon icon="gift" color="#1467EA" size={50} />
                </div>
                <h4 className="title text-center mt-3">Add new gift</h4>
                <h6 className="subtitle text-center col-10 mx-auto">
                  Please click button below to add your first wedding gift
                </h6>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Link href="/dashboard/add-gift" className="btn btn-purple px-4">
                  Add gift
                </Link>
              </div>
            </div>
          </div>
        }
        {!cardExist &&
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="p-3">
              <div className="empty-card">
                <div className="d-flex justify-content-center align-items-center">
                  <FeatherIcon icon="gift" color="#1467EA" size={50} />
                </div>
                <h4 className="title text-center mt-3">No gift found</h4>
                <h6 className="subtitle text-center col-10 mx-auto">
                  You can add gift after you create wedding card
                </h6>
              </div>
            </div>
          </div>
        }
      </div>
    </Dashboard>
  )
}

export default gift