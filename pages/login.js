import { useForm } from "react-hook-form";
import api from '../api';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";

const Login = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      await api.post('/api/auth/signin', { 
        email: values.email,
        password : values.password
      })
      .then((res) => {
        if(res.data.status === 'success') {
          // localStorage.setItem('token', res.data.data.token);
          let user = res.data.data;
          localStorage.setItem('id', user.id);
          let name = user.firstname + ' ' + user.lastname;
          localStorage.setItem('name', JSON.stringify(name));
          router.push('/dashboard/overview');
          Cookies.set("token", res.data.data.token);
        }
      })
    } catch (e) {
      if(e.response) {
        setError(e.response.data.message);
      }
    }
  }

  const meta = {
    title: "Login",
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
          <div className='d-flex justify-content-center mb-4'>
            <Link href={'/'}>
              <img src="https://ik.imagekit.io/kaddigital/logo.png" alt="kad-digital-logo" 
                style={{ width: '130px' }}
              />
            </Link>
          </div>
          <div className="card p-4">
            <h4 className='fw-600'>Login</h4>
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
              <div className='d-flex flex-column'>
                <button type='submit' className='btn btn-dark mt-2'>Login</button>
              </div>
            </form>
          </div>
          <Link href="/register">
            <button className="btn btn-link mt-2 w-100 text-dark">Create new account</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login