import { message } from 'antd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useEffect } from 'react';
import Link from 'next/link';
import api from "../api";

const Success = () => {

  useEffect(() => {
    const create_data = JSON.parse(localStorage.getItem('create_data'));
    console.log(create_data);

    if(create_data) {
      try {
        api.post("/api/card/create",
          create_data
        )
        .then((res) => {
          if (res.data.status === "success") {
            console.log('card created!');
            message.success("Card created succesfully")
            localStorage.removeItem('create_data');
          }
        });
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.message);
        }
      }
    }
  })

  return (
    <>
      <div className='container px-2 vh-100 d-flex justify-content-center align-items-center'>
        <div className='col-11 col-md-6 col-lg-4 mx-auto'> 
          <div className='card p-4'>
            <div className='d-flex justify-content-center'>
              <FeatherIcon icon="check-circle" color={"#2BD598"} size={50} />
            </div>
            <h4 className='text-center mt-2'>Payment Successful</h4>  
            <h6 className='text-center text-secondary'>
              Your payment has been processed.
            </h6>
            <div className='d-flex justify-content-center mt-3'>
              <Link href="/dashboard/cards" className='btn btn-dark'>Back</Link>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default Success;