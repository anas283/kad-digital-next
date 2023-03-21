import Head from "next/head"
import Dashboard from "./index"
import { message } from "antd";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from '../../api';

const feedback = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userId, setUserId] = useState();

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  const onSubmit = async (body) => {
    body.uid = userId;
    try {
      await api.post("/api/feedback/create",
        body
      )
      .then((res) => {
        if(res.data.status === 'success') {
          reset();
          message.success("Thank you for your feedback");
        }
      })
    } catch (e) {
      if(e.response) {
        console.log(e.response.data.message);
      }
    }
  }

  const meta = {
    title: "Feedback",
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
      <div className="p-3 ml-sm w-100-sm">
        <div className="d-flex align-items-center">
          <h5 className="page-title">Feedback</h5>
        </div>
        <div className="mt-2 col-12 col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <form>
              <div className="form-group">
                <label>Subject</label>
                <input type="text"
                  className={
                    errors.subject
                      ? "form-control mt-1 border-danger"
                      : "form-control mt-1"
                  }
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                />
                {errors.subject && (
                  <p className="text-danger text-error mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div className="form-group mt-2">
                <label>Your message</label>
                <textarea type="text" rows={5}
                  className={
                    errors.message
                      ? "form-control mt-1 border-danger"
                      : "form-control mt-1"
                  }
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
                {errors.message && (
                  <p className="text-danger text-error mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button className="btn btn-purple mt-3 px-4"
                onClick={handleSubmit(onSubmit)}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default feedback