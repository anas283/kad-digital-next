import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import api from '../api';
import Link from 'next/link';
import Head from 'next/head';

const Register = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const onSubmit = async (values) => {
    try {
      await api.post('/api/auth/signup', { 
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password : values.password
      })
      .then((res) => {
        if(res.data.status === 'success') {
          setIsCreated(true);
        }
      })
    } catch (e) {
      if(e.response) {
        setError(e.response.data.message);
      }
    }
  }

  const meta = {
    title: "Register",
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
        <div className="col-10 col-md-6 col-lg-4 mx-auto">
          { isCreated ? 
            <div className="card p-4">
              <div className='d-flex justify-content-center'>
                <FeatherIcon icon="check-circle" color="" size={40} />
              </div>
              <h4 className='fw-600 text-center mt-3'>Account created!</h4>
              <p className="text-secondary text-center">
                Click button below to login into your account
              </p>
              <Link href="/login" className='d-flex justify-content-center' style={{ textDecoration: 'none' }}>
                <button className='btn btn-dark mt-2 w-100'>Login</button>
              </Link>
            </div>
          : 
            <div>
              <div className='d-flex justify-content-center mb-4'>
                <Link href={'/'}>
                  <img src="https://ik.imagekit.io/kaddigital/logo.png" alt="kad-digital-logo" 
                    style={{ width: '130px' }}
                  />
                </Link>
              </div>
              <div className="card p-4">
                <h4 className='fw-600'>Create new account</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                  { error &&   
                    <div className="alert alert-danger">
                      { error }
                    </div>
                  }
                  <div className='form-group mt-3'>
                    <label>First Name</label>
                    <input type="text" className={ errors.firstname ? 'form-control mt-1 border-danger':'form-control mt-1' } 
                      {...register("firstname", {
                        required: "First Name is required"
                      })}
                    />
                    <p className="text-danger text-error mt-1">
                      {errors.firstname && errors.firstname.message}
                    </p>
                  </div>
                  <div className='form-group mt-3'>
                    <label>Last Name</label>
                    <input type="text" className={ errors.lastname ? 'form-control mt-1 border-danger':'form-control mt-1' } 
                      {...register("lastname", {
                        required: "Last Name is required"
                      })}
                    />
                    <p className="text-danger text-error mt-1">
                      {errors.lastname && errors.lastname.message}
                    </p>
                  </div>
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
                  <div className='form-group mt-3'>
                    <label>Password</label>
                    <input type="password" className={ errors.password ? 'form-control mt-1 border-danger':'form-control mt-1' } 
                      {...register("password", {
                        required: "Password is required"
                      })}
                    />
                    <p className="text-danger text-error mt-1">
                      {errors.password && errors.password.message}
                    </p>
                  </div>
                  <div className='d-flex justify-content-start'>
                    <button type='submit' className='btn btn-dark mt-2 w-100'>Register</button>
                  </div>
                </form>
              </div>
            </div>
          } 
        </div>
      </div>
    </>
  )
}

export default Register