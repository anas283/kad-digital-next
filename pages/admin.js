import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import api from '../api'
import GetDayNumber from '../helpers/GetDayNumber';
import GetMonth from '../helpers/GetMonth';
import GetYear from '../helpers/GetYear';

const Admin = () => {
  const router = useRouter();
  const password = router.query.password;
  const [isAdmin, setIsAdmin] = useState(false);
  const [feedback, setFeedback] = useState([]);
  
  useEffect(() => {
    if(password === 'chicken-chop') {
      setIsAdmin(true);

      const getCardsById = async () => {
        try {
          await api.get('/api/feedback/get').then((res) => {
            if(res.data.status === 'success') {
              console.log(res.data.data);
              setFeedback(res.data.data)
            }
          })
        } catch (e) {
          if(e.response) {
          }
        }
      }
      getCardsById();
    } else {
    }
  },[password])

  return (
    <>
      {isAdmin &&
        <div className='vh-100'>
          <div className='col-11 col-lg-10 mx-auto my-5'>
            <h4>Feedback</h4>
            <div className="card card-rvsp shadow-sm border-0 mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.length === 0 &&
                    <tr>
                      <td colSpan={6}>
                        <div className="text-center text-secondary py-3">
                          No data to display
                        </div>
                      </td>
                    </tr>
                  }
                  {feedback.map((data,index) => {
                    return (
                      <tr key={index}>
                        <td>{ index+1 }</td>
                        <td>{ data.subject }</td>
                        <td>{ data.message }</td>
                        <td>
                          { GetDayNumber(data.created_on) + ' ' }
                          { GetMonth(data.created_on) + ' ' }
                          { GetYear(data.created_on) }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Admin