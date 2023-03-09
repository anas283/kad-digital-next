import Head from "next/head"
import { useEffect, useState } from "react";
import Dashboard from "./index"
import FeatherIcon from 'feather-icons-react';
import Link from "next/link";
import api from '../../api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MockupImages from "../../components/MockupImages";

const cards = () => {
  const [cards, setCards] = useState([]);
  const [copyText, setCopyText] = useState('hell');
  const [themeName, setThemeName] = useState('');
  const [cardRoute, setCardRoute] = useState('');
  const [userId, setUserId] = useState();

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  useEffect(() => {
    if(userId) {
      try {
        api.post('/api/card/get/' + userId).then((res) => {
          if(res.data.status === 'success') {
            if(res.data.data.length !== 0) {
              let data = [];
              data.push(res.data.data);
              setCards(data);
    
              const cardData = res.data.data;
              for(let i=0; i<MockupImages.length; i++) {
                if(cardData.theme === MockupImages[i].image) {
                  setThemeName(MockupImages[i].name);
                }
              }
    
              const _data = res.data.data;
              const men = _data.men_short_name.toLowerCase();
              const women = _data.women_short_name.toLowerCase();
              const url = window.location.host + '/wedding/' + men + '-' + women;
              setCardRoute('/wedding/' + men + '-' + women);
              setCopyText(url);
            }
          }
        })
      } catch (e) {
        if(e.response) {
          console.log(e.response.data.message);
        }
      }
    }
  },[userId, themeName])

  const formatDate = (date) => {
    let newDate = new Date(date).toLocaleDateString('en-GB', {
      day : 'numeric',
      month : 'short',
      year : 'numeric'
    })
    return newDate;
  }

  const meta = {
    title: "Card",
    description: "Craft beautiful wedding cards that ensure your guests don't miss out on the special event!",
    type: "website",
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
        {cards.length !== 0 &&
          <div className="p-3 pb-0">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="page-title">Card</h5>
              {/* <Link href="/dashboard/create" className="btn btn-purple px-4" style={{ marginTop: '-8px' }}>
                <FeatherIcon icon="plus" size={16} className="plus-icon" />
                Create card
              </Link> */}
            </div>
          </div>
        }
        <div className="d-flex flex-wrap p-3 pt-0 mt-2">
          {cards.map((data,index) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 pe-2 pb-2" key={index}>
                <div className="card card-theme border-0 p-3">
                  <div className="theme-image">
                    <Link href={cardRoute} target="_blank">
                      <img src={data.theme} alt={data.theme} />
                    </Link>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="fw-500 mt-3">
                        { data.men_short_name } & { data.women_short_name }
                      </h6>
                      <h6 className="card-date fw-300 text-secondary">
                        { data.wedding_address_name }
                      </h6>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <div>
                        <span className="badge rounded-pill bg-success mt-3">
                          { formatDate(data.wedding_date) }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-1">
                    <CopyToClipboard text={copyText}
                      onCopy={() => {
                        message.success('Copied')
                      }}>
                      <button className="btn btn-purple px-4 mt-2 me-2">Copy URL</button>
                    </CopyToClipboard>
                    <Link href={cardRoute} target="_blank" className="btn btn-light px-4 mt-2 me-2">Visit</Link>
                    <Link href='/dashboard/edit' className="btn btn-light px-4 mt-2">Edit</Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {cards.length === 0 &&
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="p-3">
              <div className="empty-card">
                <div className="d-flex justify-content-center align-items-center">
                  <FeatherIcon icon="plus-circle" color="#1467EA" size={50} />
                </div>
                <h4 className="title text-center mt-3">Create new card</h4>
                <h6 className="subtitle text-center col-10 mx-auto">
                  Please click button below to create your first wedding card
                </h6>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Link href="/dashboard/create" className="btn btn-purple px-4">
                  Create card
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    </Dashboard>
  )
}

export default cards