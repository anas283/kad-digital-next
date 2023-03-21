import Head from "next/head"
import Dashboard from "./index"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChooseTheme from "../../components/ChooseTheme";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { DatePicker, message, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import { Button, Steps } from 'antd';
import MockupImages from "../../components/MockupImages";
import { chooseSong, chooseTheme } from "../../store/themeReducer";
import Music from "../../components/Music";

import { loadStripe } from "@stripe/stripe-js"; 
import MusicCard from "../../components/MusicCard";

// const stripe_pk = 'pk_test_51MYJjlI9XINpdSHTYrO86MSWwLEGZnMGDULi3C32Xd04hU3Jc9A0lqN7U6wDIqFd8D7WQPxYcul4t2Iy2nVS28mh00YWChYXTJ';
const stripe_pk = 'pk_live_51MYJjlI9XINpdSHTXIbbrmTa89kVkt41HsVoJcK6OelcOsqXNyho9k2FZLn1jqqHtGxmz2CDPMKCuokKbWL0Hq7T00eU4VnBDk';

const steps = [
  {
    title: 'Choose Theme',
  },
  {
    title: 'Wedding Bride',
  },
  {
    title: 'Parents',
  },
  {
    title: 'Add Ons',
  },
];
const songs = Music();

dayjs.extend(customParseFormat);

const create = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const song = useSelector((state) => state.theme.song);
  const [userId, setUserId] = useState();
  const languages = ['Bahasa Melayu','English'];
  const [language, setLanguage] = useState(languages[0]);

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
  } = useForm();
  const { 
    fields: eventFields, 
    append: eventAppend, 
    remove: eventRemove 
  } = useFieldArray(
    { control, name: "events" }
  );
  const { 
    fields: contactFields, 
    append: contactAppend, 
    remove: contactRemove 
  } = useFieldArray(
    { control, name: "contacts" }
  );

  const format = "HH:mm";

  const songData = Music();
  
  useEffect(() => {
    dispatch(chooseTheme(MockupImages[0].image))
    dispatch(chooseSong(songs[0].url))
  },[dispatch])

  useEffect(() => {
    setValue("theme", theme);
    if (theme !== "") {
      trigger("theme");
    }
  }, [setValue, trigger, theme]);

  const product = { 
    name: "Kad Digital Premium", 
    price: 55, 
    productOwner: "Kad Digital", 
    description: 
      "Kad Kahwin Digital untuk memudahkan tetamu ke majlis perkahwinan anda.", 
    quantity: 1, 
  }; 

  const onSubmit = async (body) => {
    body.total_view = 0;
    body.music_url = song;
    body.uid = userId;

    if(language === 'Bahasa Melayu') {
      body.language = 'bm';
    }
    else if(language === 'English') {
      body.language = 'en';
    }

    localStorage.setItem('create_data', JSON.stringify(body));

    if(
      body.father_full_name !== '' &&
      body.google_maps_url !== '' &&
      body.men_long_name !== '' &&
      body.men_short_name !== '' &&
      body.mother_full_name !== '' &&
      body.waze_url !== '' &&
      body.wedding_address !== '' &&
      body.wedding_address_name !== '' &&
      body.wedding_date !== '' &&
      body.wedding_end_time !== '' &&
      body.wedding_start_time !== '' &&
      body.wedding_title !== '' &&
      body.women_long_name !== '' &&
      body.women_short_name !== ''
    ) {
      console.log(body);
      makePayment();
    }
    else {
      message.error('Please fill in required fields!')
    }
  };

  const makePayment = async () => { 
    const stripe = await loadStripe(stripe_pk); 
    const body = { product }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 

    let api_url = "";
    const url = window.location.origin;

    if(url === 'http://localhost:3000') {
      api_url = "http://localhost:8080";
    } else {
      api_url = "https://kad-digital.up.railway.app";
    }

    const response = await fetch( 
      api_url + "/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 

  const triggerValidation = async () => {
    const result = await trigger();
    console.log(result);
  }

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
    triggerValidation();
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const meta = {
    title: "Create Card",
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
          <h5 className="page-title">Create Card</h5>
        </div>
        <div className="mt-2">
          <div className="card p-4 border-0">
            <form>
              {/* {error && <div className="alert alert-danger">{error}</div>} */}

              <Steps current={current} items={items} />

              {steps[current].title === 'Choose Theme' &&
                <div>
                  <ChooseTheme />

                  <input
                    type="text"
                    className="form-control d-none"
                    {...register("theme", {
                      required: "Tema diperlukan",
                    })}
                  />
                  {errors.theme && (
                    <p className="text-danger text-error mt-1">
                      {errors.theme.message}
                    </p>
                  )}
                </div>
              }

              {steps[current].title === 'Wedding Bride' &&
                <div className="mt-4">
                  <h5>Maklumat Pengantin</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Pendek Lelaki</label>
                        <input
                          type="text"
                          className={
                            errors.men_short_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("men_short_name", {
                            required: "Nama Pendek Lelaki diperlukan",
                          })}
                        />
                        {errors.men_short_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.men_short_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Penuh Lelaki</label>
                        <input
                          type="text"
                          className={
                            errors.men_long_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("men_long_name", {
                            required: "Nama Penuh Lelaki diperlukan",
                          })}
                        />
                        {errors.men_long_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.men_long_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Pendek Perempuan</label>
                        <input
                          type="text"
                          className={
                            errors.women_short_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("women_short_name", {
                            required: "Nama Pendek Perempuan diperlukan",
                          })}
                        />
                        {errors.women_short_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.women_short_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Penuh Perempuan</label>
                        <input
                          type="text"
                          className={
                            errors.women_long_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("women_long_name", {
                            required: "Nama Penuh Perempuan diperlukan",
                          })}
                        />
                        {errors.women_long_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.women_long_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }

              {steps[current].title === 'Parents' &&
                <div className="mt-4">
                  <h5>Ibu & Bapa</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Penuh Bapa</label>
                        <input
                          type="text"
                          className={
                            errors.father_full_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("father_full_name", {
                            required: "Nama Penuh Bapa diperlukan",
                          })}
                        />
                        {errors.father_full_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.father_full_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Penuh Ibu</label>
                        <input
                          type="text"
                          className={
                            errors.mother_full_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("mother_full_name", {
                            required: "Nama Penuh Ibu diperlukan",
                          })}
                        />
                        {errors.mother_full_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.mother_full_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="separator"></div>
                  <h5>Hubungi</h5>
                  <div>
                    {contactFields.map((item, index) => (
                      <div key={item.id} className="row">
                        <div className="col-12 col-md-4 form-group mt-3">
                          <label>Nama Untuk Dihubungi</label>
                          <input
                            {...register(`contacts.${index}.name`)}
                            className="form-control mt-1"
                            autoFocus="off"
                          />
                        </div>
                        <div className="col-12 col-md-4 form-group mt-3">
                          <label>No. Telefon Untuk Dihubungi</label>
                          <input
                            {...register(`contacts.${index}.phone_number`)}
                            className="form-control mt-1"
                            autoFocus="off"
                          />
                        </div>
                        <div className="col-12 col-md-3 form-group mt-3">
                          <label>Hubungan</label>
                          <input
                            {...register(`contacts.${index}.info`)}
                            className="form-control mt-1"
                            autoFocus="off"
                            placeholder="Contoh: Ayah"
                          />
                        </div>
                        <div className="col-1 form-group d-flex flex-column mt-3">
                          <label>&nbsp;</label>
                          <button
                            type="button"
                            onClick={() => contactRemove(index)}
                            className="btn btn-danger"
                            style={{ width: "fit-content", marginTop: "6px" }}
                          >
                            <FeatherIcon icon="trash" size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {contactFields.length < 3 &&
                    <button
                      type="button"
                      className="btn btn-light mt-3"
                      onClick={() => contactAppend({ name: "", phone_number: "", info: "" })}
                    >
                      <FeatherIcon
                        icon="plus"
                        size={16}
                        style={{ marginTop: "-3px" }}
                        className="me-2"
                      />
                      Tambah orang
                    </button>
                  }

                  <div className="separator"></div>

                  <h5>Tempat & Waktu</h5>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Tarikh Majlis</label>
                        <div>
                          <Controller
                            control={control}
                            name="wedding_date"
                            rules={{ required: "Tarikh Majlis Diperlukan" }}
                            render={({ field: { onChange, ref, ...field } }) => (
                              <DatePicker
                                {...field}
                                id="wedding_date"
                                onChange={onChange}
                                error={!!errors.wedding_date}
                                className={
                                  !!errors.wedding_date
                                    ? "input-ant mt-1 border-danger"
                                    : "input-ant mt-1"
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <label>Masa</label>
                        <div className="row">
                          <div className="col-6">
                            <Controller
                              control={control}
                              name="wedding_start_time"
                              rules={{ required: "Masa Mula Diperlukan" }}
                              render={({ field: { onChange, ref, ...field } }) => (
                                <TimePicker
                                  {...field}
                                  id="wedding_start_time"
                                  onChange={onChange}
                                  error={!!errors.wedding_start_time}
                                  className={
                                    !!errors.wedding_start_time
                                      ? "input-ant mt-1 border-danger"
                                      : "input-ant mt-1"
                                  }
                                  format={format}
                                  placeholder="Mula"
                                />
                              )}
                            />
                          </div>
                          <div className="col-6">
                            <Controller
                              control={control}
                              name="wedding_end_time"
                              rules={{ required: "Masa Mula Diperlukan" }}
                              render={({ field: { onChange, ref, ...field } }) => (
                                <TimePicker
                                  {...field}
                                  id="wedding_end_time"
                                  onChange={onChange}
                                  error={!!errors.wedding_end_time}
                                  className={
                                    !!errors.wedding_end_time
                                      ? "input-ant mt-1 border-danger"
                                      : "input-ant mt-1"
                                  }
                                  format={format}
                                  placeholder="Tamat"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Alamat Tempat</label>
                        <textarea
                          type="text"
                          rows={4}
                          className={
                            errors.wedding_address
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("wedding_address", {
                            required: "Alamat Tempat diperlukan",
                          })}
                        />
                        {errors.wedding_address && (
                          <p className="text-danger text-error mt-1">
                            {errors.wedding_address.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Nama Tempat</label>
                        <input
                          type="text"
                          className={
                            errors.wedding_address_name
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("wedding_address_name", {
                            required: "Nama Tempat diperlukan",
                          })}
                        />
                        {errors.wedding_address_name && (
                          <p className="text-danger text-error mt-1">
                            {errors.wedding_address_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Kod Pakaian</label>
                        <input
                          type="text"
                          className={
                            errors.dress_code
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("dress_code", {
                            required: "Kod Pakaian diperlukan",
                          })}
                        />
                        {errors.dress_code && (
                          <p className="text-danger text-error mt-1">
                            {errors.dress_code.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Lokasi (Link URL Google Maps) 
                          <a className="btn btn-link btn-contoh p-0 m-0"
                            href="https://ik.imagekit.io/kaddigital/contoh-google-maps.png"
                            target="_blank"
                            rel="noreferrer"
                          >Contoh</a>
                        </label>
                        <input
                          type="text"
                          className={
                            errors.google_maps_url
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("google_maps_url", {
                            required: "Lokasi diperlukan",
                          })}
                        />
                        {errors.google_maps_url && (
                          <p className="text-danger text-error mt-1">
                            {errors.google_maps_url.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group mt-3">
                        <label>Lokasi (Link URL Waze)
                          <a className="btn btn-link btn-contoh p-0 m-0"
                            href="https://ik.imagekit.io/kaddigital/contoh-waze.png"
                            target="_blank"
                            rel="noreferrer"
                          >Contoh</a>
                        </label>
                        <input
                          type="text"
                          className={
                            errors.waze_url
                              ? "form-control mt-1 border-danger"
                              : "form-control mt-1"
                          }
                          {...register("waze_url", {
                            required: "Lokasi diperlukan",
                          })}
                        />
                        {errors.waze_url && (
                          <p className="text-danger text-error mt-1">
                            {errors.waze_url.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }

              {steps[current].title === 'Add Ons' &&
                <div className="mt-4">
                  <h5>Atur Cara</h5>
                  <div>
                    {eventFields.map((item, index) => (
                      <div key={item.id} className="row">
                        <div className="col-12 col-md-6 form-group mt-3">
                          <label>Nama Acara</label>
                          <input
                            {...register(`events.${index}.name`)}
                            className="form-control mt-1"
                            autoFocus="off"
                          />
                        </div>
                        <div className="col-12 col-md-5 form-group mt-3">
                          <label>Masa Acara</label>
                          <Controller
                            control={control}
                            name={`events.${index}.time`}
                            render={({ field: { onChange } }) => (
                              <TimePicker
                                id={`events.${index}.time`}
                                onChange={onChange}
                                className="input-ant mt-1"
                                format={format}
                              />
                            )}
                          />
                        </div>
                        <div className="col-1 form-group d-flex flex-column mt-3">
                          <label>&nbsp;</label>
                          <button
                            type="button"
                            onClick={() => eventRemove(index)}
                            className="btn btn-danger"
                            style={{ width: "fit-content", marginTop: "6px" }}
                          >
                            <FeatherIcon icon="trash" size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {eventFields.length < 3 &&
                    <button
                      type="button"
                      className="btn btn-light mt-3"
                      onClick={() => eventAppend({ name: "", time: "" })}
                    >
                      <FeatherIcon
                        icon="plus"
                        size={16}
                        style={{ marginTop: "-3px" }}
                        className="me-2"
                      />
                      Tambah acara
                    </button>
                  }

                  <div className="separator"></div>

                  <div className="d-flex flex-row">
                    <h5>Pilih Lagu</h5>
                    <div className="ms-3">
                      <Controller
                        control={control}
                        name="is_music"
                        defaultValue={true}
                        render={({
                          field: { onChange, value, ref },
                        }) => (
                          <Switch 
                            id="is_music"
                            checkedChildren="ON" 
                            unCheckedChildren="OFF" 
                            defaultChecked 
                            onChange={onChange}
                            checked={value}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="row pb-4 mt-2">
                    {songData.map((song, key) => {
                      return (
                        <div key={key} className="col-12 col-md-6 col-lg-4">
                          <MusicCard 
                            title={song.title}
                            url={song.url}
                          />
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <h5>Pilih Bahasa</h5>
                    <div className="dropdown mt-3">
                      <button className='btn btn-light px-3 pe-2' data-bs-toggle="dropdown" aria-expanded="false">
                        { language } 
                        <FeatherIcon icon="chevron-down" size={18} className="ms-2" />
                      </button>
                      <ul className="dropdown-menu border-0 shadow-sm">
                        {languages.map((language, key) => {
                          return (
                            <li
                              className="px-3 py-1 dropdown-item" 
                              key={key}
                              onClick={() => setLanguage(language)}
                              style={{ cursor: 'pointer' }}
                            >
                              { language }
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              }

              <div
                style={{
                  marginTop: 24,
                }}
              >
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={handleSubmit(onSubmit)}>
                    Pay Now - RM55
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: '0 8px',
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default create;