import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChooseTheme from "../../components/ChooseTheme";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import api from "../../api";
import { DatePicker, TimePicker, Switch } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Button, message, Steps } from 'antd';
import { chooseSong, chooseTheme } from "../../store/themeReducer";
import MusicCard from "../../components/MusicCard";
import Music from "../../components/Music";
import { useRouter } from "next/router";
import Dashboard from ".";
import Head from "next/head";

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

dayjs.extend(customParseFormat);

const EditTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const song = useSelector((state) => state.theme.song);
  const [userId, setUserId] = useState();
  const languages = ['Bahasa Melayu','English'];
  const [language, setLanguage] = useState(languages[0]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    trigger,
  } = useForm();
  const router = useRouter();
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
  const [weddingDate, setWeddingDate] = useState('');
  const [weddingStartTime, setWeddingStartTime] = useState('');
  const [weddingEndTime, setWeddingEndTime] = useState('');
  const [timeArray, setTimeArray] = useState([]);
  const [cardId, setCardId] = useState(0);
  const [totalView, setTotalView] = useState(0);
  const songData = Music();

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  const insertCardData = useCallback((data) => {
    dispatch(chooseTheme(data.theme));

    setCardId(data.id);

    setTotalView(data.total_view);
    setValue('men_short_name', data.men_short_name);
    setValue('men_long_name', data.men_long_name);
    setValue('women_short_name', data.women_short_name);
    setValue('women_long_name', data.women_long_name);

    setValue('father_full_name', data.father_full_name);
    setValue('mother_full_name', data.mother_full_name);

    let contacts = data.contacts;
    if(contacts) {
      if(typeof data.contacts === 'string') {
        contacts = JSON.parse(contacts);

        for (let i = 0; i < contacts.length; i++) {
          contactAppend({ 
            name: contacts[i].name, 
            phone_number: contacts[i].phone_number, 
            info: contacts[i].info, 
          })
        }
      } else {
        for (let i = 0; i < contacts.length; i++) {
          contactAppend({ 
            name: contacts[i].name, 
            phone_number: contacts[i].phone_number, 
            info: contacts[i].info, 
          })
        }
      }
    }

    setValue('wedding_date', dayjs(data.wedding_date));
    setValue('wedding_start_time', dayjs(data.wedding_start_time));
    setValue('wedding_end_time', dayjs(data.wedding_end_time));

    setWeddingDate(data.wedding_date);
    setWeddingStartTime(data.wedding_start_time);
    setWeddingEndTime(data.wedding_end_time);
    
    setValue('wedding_address', data.wedding_address);
    setValue('wedding_address_name', data.wedding_address_name);
    setValue('google_maps_url', data.google_maps_url);
    setValue('waze_url', data.waze_url);
    setValue('dress_code', data.dress_code);
    setValue('music_url', data.music_url);
    setValue('is_music', data.is_music);
    dispatch(chooseSong(data.music_url));

    const newTime = [];

    let events = data.events;
    if(events) {
      if(typeof data.events === 'string') {
        events = JSON.parse(events);

        for (let i = 0; i < events.length; i++) {
          const date = new Date(events[i].time)
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const time = hours + ':' + minutes + ':' + seconds;

          eventAppend({ 
            name: events[i].name, 
            time: events[i].time 
          })
          newTime.push(time)
        }
      } else {
        for (let i = 0; i < events.length; i++) {
          const date = new Date(events[i].time)
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
          const time = hours + ':' + minutes + ':' + seconds;

          eventAppend({ 
            name: events[i].name, 
            time: events[i].time 
          })
          newTime.push(time)
        }
      }
    }

    if(data.language === 'bm') {
      setLanguage('Bahasa Melayu');
    }
    else if(data.language === 'en') {
      setLanguage('English');
    }

    setTimeArray(newTime)
  },[contactAppend,dispatch,eventAppend,setValue])

  useEffect(() => {
    const getCards = async () => {
      try {
        await api.post('/api/card/get/' + userId).then((res) => {
          if(res.data.status === 'success') {
            insertCardData(res.data.data);
          }
        })
      } catch (e) {
        if(e.response) {
          console.log(e.response.data.message);
        }
      }
    }
    getCards();
  },[insertCardData, userId])

  useEffect(() => {
    setValue("theme", theme);
    if (theme !== "") {
      trigger("theme");
    }
  }, [setValue, trigger, theme]);

  const onSubmit = async (body) => {
    body.uid = userId;
    body.total_view = totalView;    
    body.music_url = song;

    if(language === 'Bahasa Melayu') {
      body.language = 'bm';
    }
    else if(language === 'English') {
      body.language = 'en';
    }

    console.log(body);
    try {
      await api
        .put("/api/card/update/" + cardId,
          body
        )
        .then((res) => {
          if (res.data.status === "success") {
            router.push("/dashboard/cards");
            message.success("Card updated succesfully")
          }
        });
    } catch (e) {
      if (e.response) {
        message.error('Please fill in the required field!')
      }
    }
  };

  const triggerValidation = async () => {
    await trigger();
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
    title: "Edit Card",
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
          <div className="card border-0 shadow-sm p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                defaultValue={dayjs(weddingDate)}
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
                                  defaultValue={dayjs(weddingStartTime)}
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
                                  defaultValue={dayjs(weddingEndTime)}
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
                                defaultValue={dayjs(timeArray[index], 'HH:mm:ss')}
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
                    Submit
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
  );
};

export default EditTheme;