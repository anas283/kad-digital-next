import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Link from 'next/link';

const Cancel = () => {
  return (
    <>
      <div className='container px-2 vh-100 d-flex justify-content-center align-items-center'>
        <div className='col-11 col-md-6 col-lg-4 mx-auto'> 
          <div className='card p-4'>
            <div className='d-flex justify-content-center'>
              <FeatherIcon icon="x-circle" color={"red"} size={50} />
            </div>
            <h4 className='text-center mt-2'>Payment Failed</h4>  
            <h6 className='text-center text-secondary'>
              Your payment was not successfully processed. Please try again.
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

export default Cancel;