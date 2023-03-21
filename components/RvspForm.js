import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import api from '../api'
import { refreshGuest } from "../store/themeReducer";
import { useTranslation } from 'react-i18next';

const RvspForm = ({ data }) => {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const statusList = ["Hadir","Tidak Hadir","Tidak Pasti"];
  
  const [status, setStatus] = useState("Hadir");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    values.card_id = data.id;
    values.uid = data.uid;
    values.status = status;

    localStorage.setItem('guest', values.name)

    try {
      await api.post('/api/attendance/create', { 
        card_id: values.card_id,
        uid: values.uid,
        name: values.name,
        message: values.message,
        status: values.status,
        total_guest: Number(values.total_guest),
        email: values.email,
        is_show: true
      })
      .then((res) => {
        if(res.data.status === 'success') {
          console.log(res.data);
          dispatch(refreshGuest(true))
          setSuccess("Terima kasih kerana mengisi kehadiran!");
          resetMessage();
          reset();
        }
      })
    } catch (e) {
      if(e.response) {
        setError(e.response.data.message);
        resetMessage();
      }
    }
  }

  const resetMessage = () => {
    setTimeout(() => {
      setSuccess('');
      setError('')
    }, 5000);
  }

  return (
    <>
      {data &&
        <div className="card p-4 w-100 border-0 shadow-sm"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          >
          <h5 className="text-center text-black fw-600">RVSP</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mt-3">
              <label>{ t('nama') }</label>
              <input type="text" className={ errors.name ? 'form-control mt-1 border-danger':'form-control mt-1' }
                {...register("name", {
                  required: "Nama diperlukan",
                })}
              />
              {errors.name && (
                <p className="text-danger text-error mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>{ t('bilangan_hadiran') }</label>
              <input type="number" className={ errors.total_guest ? 'form-control mt-1 border-danger':'form-control mt-1' }
                {...register("total_guest", {
                  required: "Bilangan Kehadiran diperlukan",
                })}
              />
              {errors.total_guest && (
                <p className="text-danger text-error mt-1">
                  {errors.total_guest.message}
                </p>
              )}
            </div>
            <div className="form-group mt-2">
              <label>{ t('ucapan') }</label>
              <textarea type="text" className="form-control mt-1" rows="5"
                {...register("message")}
              />
            </div>
            <div className="form-group mt-2">
              <label>{ t('sahkan_kehadiran') }</label>
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle w-100 mt-1 text-start" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  { t(status) }
                </button>
                <ul className="dropdown-menu">
                  {statusList.map((status, key) => {
                    return (
                      <li key={key} onClick={() => setStatus(status)}>
                        <div className="dropdown-item">{ t(status) }</div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <button type="submit" className="btn btn-dark mt-4 w-100">{ t('hantar') }</button>
            { error &&   
              <div className="alert alert-danger mt-3">
                { error }
              </div>
            }
            { success &&   
              <div className="alert alert-success mt-3">
                { success }
              </div>
            }
          </form>
        </div>
      }
      {!data &&
        <div className="card p-4 w-100 border-0 shadow-sm"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          >
          <h5 className="text-center text-black fw-600">RVSP</h5>
          <form>
            <div className="form-group mt-3">
              <label>{ t('nama') }</label>
              <input type="text" className="form-control mt-1"></input>
            </div>
            <div className="form-group mt-3">
              <label>{ t('bilangan_hadiran') }</label>
              <input type="text" className="form-control mt-1"></input>
            </div>
            <div className="form-group mt-2">
              <label>{ t('ucapan') }</label>
              <textarea
                type="text"
                className="form-control mt-1"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group mt-2">
              <label>{ t('sahkan_kehadiran') }</label>
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle w-100 mt-1 text-start"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  { t('Hadir') }
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <div className="dropdown-item">{ t('Hadir') }</div>
                  </li>
                  <li>
                    <div className="dropdown-item">{ t('Tidak Hadir') }</div>
                  </li>
                  <li>
                    <div className="dropdown-item">{ t('Tidak Pasti') }</div>
                  </li>
                </ul>
              </div>
            </div>
            <button className="btn btn-dark mt-4 w-100">{ t('hantar') }</button>
          </form>
        </div>
      }
    </>

  );
};

export default RvspForm;
