import { useForm } from "react-hook-form";
import api from '../api';
import { useState } from "react";
import Head from "next/head";

const ForgotPassword = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = async (values) => {
    try {
      await api.post('/api/auth/forgot-password', { 
        email: values.email,
      })
      .then((res) => {
        if(res.data.status === 'success') {
          setSent(true);
          reset();
        }
      })
    } catch (e) {
      if(e.response) {
        setError(e.response.data.message);
      }
    }
  }

  const meta = {
    title: "Forgot Password",
    description: "Craft beautiful wedding cards that ensure your guests don't miss out on the special event!",
    type: "website",
  }

  return (
    <>
      <Head>
        <title>{ meta.title }</title>
        <meta name="description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
      </Head>
      <div className="container py-5 vh-100 d-flex align-items-center">
        <div className="col-10 col-md-6 col-lg-5 mx-auto">
          {sent &&
            <div className="card p-4 border-0">
              <h4 className='fw-600 text-center'>
                Thanks, check your email for instructions to reset your password
              </h4>
              <div className="text-secondary text-center mt-2">
                If you haven't received an email in 5 minutes, 
                check your spam or <button onClick={() => setSent(false)} className="btn btn-resend p-0">resend</button>
              </div>
            </div>
          }
          {!sent &&
            <div className="card p-4 border-0">
              <h5>
                Enter the email address associated with your account
                and we'll send you a link to reset your password.
              </h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                { error &&   
                  <div className="alert alert-danger">
                    { error }
                  </div>
                }
                <div className='form-group mt-3'>
                  <label>Email</label>
                  <input type="email" className={ errors.email ? 'form-control mt-1 border-danger':'form-control mt-1' } 
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  <p className="text-danger text-error mt-1">
                    {errors.email && errors.email.message}
                  </p>
                </div>
                <div className='d-flex flex-column'>
                  <button type='submit' className='btn btn-dark mt-3'>Continue</button>
                </div>
              </form>
            </div> 
          }
        </div>
      </div>
    </>
  )
}

export default ForgotPassword