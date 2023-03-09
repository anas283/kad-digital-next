import Head from "next/head"
import Dashboard from "./index"
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useEffect, useState } from "react";
import api from '../../api';

const overview = () => {

  const [attendance, setAttendance] = useState([]);
  const [totalGuest, setTotalGuest] = useState(0);
  const [totalWishes, setTotalWishes] = useState(0);
  const [card, setCard] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  useEffect(() => {
    const getCard = async () => {
      try {
        await api.post('/api/card/get/' + userId).then((res) => {
          if(res.data.status === 'success') {
            setCard(res.data.data);
            // setCardId(res.data.data.id)

            if(res.data.data.id !== undefined) {
              getAttendance(res.data.data.id);
              localStorage.setItem('card_id', res.data.data.id)
            }
          }
        })
      } catch (e) {
        if(e.response) {
          // console.log(e.response.data.message);
        }
      }
    }
    getCard();

    const getAttendance = async (cardId) => {
      try {
        await api.get('/api/attendance/get-latest/' + cardId)
        .then((res) => {
          if(res.data.status === 'success') {
            const guest = res.data.data;
            let total_guest = 0; 
            let total_wishes = 0; 

            for(let i=0; i<guest.length; i++) {
              total_guest += guest[i].total_guest;

              if(guest[i].message) {
                total_wishes++;
              }
            }
            setTotalGuest(total_guest);
            setTotalWishes(total_wishes);
            setAttendance(res.data.data);
          }
        })
      } catch (e) {
        if(e.response) {
          // console.log(e.response.data.message);
        }
      }
    }
  },[userId])

  const meta = {
    title: "Overview",
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
      <div className="overview-section p-3 ml-sm">
        <div className="d-flex align-items-center">
          <h5 className="page-title">Overview</h5>
        </div>
        <div className="mt-2">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 p-4 mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="value">{ card.total_view ? card.total_view : 0 }</h3>
                    <h6 className="label">Total View</h6>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="icon-box icon-blue">
                      <FeatherIcon icon="activity" size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 p-4 mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="value">{ totalGuest }</h3>
                    <h6 className="label">Total Guest</h6>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="icon-box icon-green">
                      <FeatherIcon icon="user" size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 p-4 mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="value">{ totalWishes }</h3>
                    <h6 className="label">Total Wishes</h6>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="icon-box icon-red">
                      <FeatherIcon icon="message-square" size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="d-flex align-items-center">
            <h5 style={{ fontSize: '18px', fontWeight: '600' }}>Latest Guest</h5>
          </div>
          <div className="mt-2">
            <div className="card card-rvsp shadow-sm border-0">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Message</th>
                    <th scope="col">Total Guest</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length === 0 &&
                    <tr>
                      <td colSpan={5}>
                        <div className="text-center text-secondary py-3">
                          No data to display
                        </div>
                      </td>
                    </tr>
                  }
                  {attendance.map((data,index) => {
                    return (
                      <tr key={index}>
                        <td>{ index+1 }</td>
                        <td>{ data.name }</td>
                        <td>
                          <div className="text-ellipsis" style={{ width: '250px' }}>
                            { data.message ? data.message : '-' }
                          </div>
                        </td>
                        <td>{ data.total_guest }</td>
                        <td>
                          { data.status === 'Hadir' &&
                            <span className="badge rounded-pill bg-success">
                              { data.status }
                            </span>
                          }
                          { data.status === 'Tidak Hadir' &&
                            <span className="badge rounded-pill bg-danger">
                              { data.status }
                            </span>
                          }
                          { data.status === 'Tidak Pasti' &&
                            <span className="badge rounded-pill bg-warning">
                              { data.status }
                            </span>
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default overview