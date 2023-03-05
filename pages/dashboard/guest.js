import Head from "next/head"
import Dashboard from "./index"
import FeatherIcon from 'feather-icons-react';
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "antd";
import api from '../../api';

const guest = () => {
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [cardId, setCardId] = useState();

  useEffect(() => {
    if(typeof window !== "undefined") {
      setCardId(localStorage.getItem('card_id'));
    }
  },[])

  const getTotalAttendance = useCallback(async () => {
    try {
      await api.get('/api/attendance/get-total/' + cardId)
      .then((res) => {
        if(res.data.status === 'success') {
          setTotal(res.data.total)
        }
      })
    } catch (e) {
      if(e.response) {
        console.log(e.response.data.message);
      }
    }
  },[cardId])

  const getAttendance = useCallback(async (_page, _limit) => {
    try {
      await api.get('/api/attendance/get/' + cardId + '/page=' + _page + '&limit=' + _limit)
      .then((res) => {
        if(res.data.status === 'success') {
          setAttendance(res.data.data);
        }
      })
    } catch (e) {
      if(e.response) {
        console.log(e.response.data.message);
      }
    }
  },[cardId])

  useEffect(() => {
    getTotalAttendance();
    getAttendance(page, limit);
  },[getTotalAttendance, getAttendance, page, limit])

  const hideMessage = async (bool, id) => {
    try {
      await api.put('/api/attendance/update/' + id, {
        is_show: bool
      }).then((res) => {
        if(res.data.status === 'success') {
          getAttendance(page, limit);
        }
      })
    } catch (e) {
      if(e.response) {
        console.log(e.response.data.message);
      }
    }
  } 

  const updatePage = (page) => {
    setPage(page);
    getAttendance(page, limit);
  }

  const meta = {
    title: "Guest",
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
      <div className="p-3 ml-sm">
        <div className="d-flex align-items-center">
          <h5 className="page-title">Guests</h5>
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
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 &&
                  <tr>
                    <td colSpan={6}>
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
                        <div 
                          className={data.is_show === 0 ? 'opacity-50 text-ellipsis':'text-ellipsis'}
                          style={{ width: '250px' }}
                        >
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
                      <td>
                        <button className="btn btn-light btn-hide"
                          onClick={() => hideMessage(!data.is_show, data.id)}
                        >
                          {data.is_show === 1 &&
                            <FeatherIcon icon="eye" size={14} className="icon" />
                          }
                          {data.is_show === 0 &&
                            <FeatherIcon icon="eye-off" size={14} className="icon" />
                          }
                          <h6>{ data.is_show ? 'Hide':'Show' }</h6>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="pb-3 d-flex justify-content-center">
              <Pagination 
                current={page}
                defaultCurrent={page} 
                total={total} 
                onChange={updatePage}
              />
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default guest