import { useForm } from "react-hook-form";
import api from '../api';
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const ResetPassword = () => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const router = useRouter();
  const token = router.query.token;
  const email = router.query.email;
  const [sent, setSent] = useState(false);

  const onSubmit = async (values) => {
    if(token && email && values.password == values.confirm_password) {
      try {
        await api.post('/api/auth/reset-password', { 
          token: token,
          email: email,
          password: values.password,
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
    else {
      setError('Password does not match!')
    }
  }

  const meta = {
    title: "Reset Password",
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
          {sent &&
            <div className="card p-4 border-0">
              <h4 className='fw-600 text-center mt-3'>Successfully reset password!</h4>
              <p className="text-secondary text-center">
                You can now use your new password to log in to your account.
              </p>
              <Link href="/login" className='d-flex justify-content-center' style={{ textDecoration: 'none' }}>
                <button className='btn btn-dark mt-2 w-100'>Login</button>
              </Link>
            </div>
          }
          {!sent &&
            <div className="card p-4">
              <h5>
                Reset Password
              </h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                { error &&   
                  <div className="alert alert-danger">
                    { error }
                  </div>
                }
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
                <div className='form-group mt-3'>
                  <label>Confirm Password</label>
                  <input type="password" className={ errors.confirm_password ? 'form-control mt-1 border-danger':'form-control mt-1' } 
                    {...register("confirm_password", {
                      required: "Confirm Password is required"
                    })}
                  />
                  <p className="text-danger text-error mt-1">
                    {errors.confirm_password && errors.confirm_password.message}
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

export default ResetPassword