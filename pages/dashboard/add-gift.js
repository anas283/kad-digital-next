import Head from "next/head"
import Dashboard from "./index"
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import api from '../../api';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useRouter } from "next/router";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const shortid = require('shortid');

const addGift = () => {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [userId, setUserId] = useState();
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(typeof window !== "undefined") {
      setUserId(localStorage.getItem('id'));
    }
  },[])

  const handleClickUpload = () => {
    inputRef.current.click();
  }

  const handleImage = (event) => {
    const files = event.target.files[0];
    setValue("image", files.name);
    setFile(files);
  }

  const onSubmit = async (body) => {
    if (!file) return;

    setLoading(true);

    let imageName = `images/${file.name}`;
    var idx = imageName.lastIndexOf(".");
    if (idx > -1)
      imageName = imageName.substr(0, idx) + "-" + shortid.generate() + imageName.substr(idx);
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // get and set image url
          setLoading(false);
          setImgUrl(downloadURL)

          // call api and create gift
          body.uid = userId;
          body.status = "Available";
          body.reserved_by = "";
          body.image = downloadURL;

          try {
            api.post("/api/gift/create",
              body
            )
            .then((res) => {
              if(res.data.status === 'success') {
                reset();
                router.push("/dashboard/gift");
                message.success("Gift added successfully");
              }
            })
          } catch (e) {
            if(e.response) {
              console.log(e.response.data.message);
            }
          }
        });
      }
    );
  }

  const meta = {
    title: "Add Gift",
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
      <div className="p-3 ml-sm">
        <div className="d-flex align-items-center">
          <h5 className="page-title">Add Gift</h5>
        </div>
        <div className="mt-2 col-12 col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <form>
              <div className="form-group">
                <label>Image</label>
                <div className="image-upload d-flex justify-content-center align-items-center mt-1"
                  onClick={handleClickUpload}
                >
                  {file &&
                    <img
                      src={URL.createObjectURL(file)}
                    />
                  }
                  {!file &&
                    <div className="d-flex flex-column">
                      <FeatherIcon icon="image" className="icon" />
                      <button type="button" className="btn btn-light my-2">Browse file</button>
                      <h6 className="text-small text-secondary">Maximum file size 2MB</h6>
                    </div>
                  }
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  name="myImage"
                  className="d-none"
                  accept="image/*"
                  onChange={(event) => handleImage(event)}
                />  
                <input
                  className="d-none"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />
                {errors.image && (
                  <p className="text-danger text-error mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
              <div className="form-group mt-2">
                <label>Gift Name</label>
                <input type="text"
                  className={
                    errors.name
                      ? "form-control mt-1 border-danger"
                      : "form-control mt-1"
                  }
                  {...register("name", {
                    required: "Gift Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-danger text-error mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="form-group mt-2">
                <label>Category</label>
                <input type="text"
                  className={
                    errors.category
                      ? "form-control mt-1 border-danger"
                      : "form-control mt-1"
                  }
                  {...register("category", {
                    required: "Category is required",
                  })}
                />
                {errors.category && (
                  <p className="text-danger text-error mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="form-group mt-2">
                <label>Link (optional)</label>
                <input type="text"
                  className="form-control mt-1"
                  {...register("link")}
                />
              </div>
              <button className="btn btn-purple btn-spinner mt-3 px-3"
                disabled={loading}
                onClick={handleSubmit(onSubmit)}
              >
                {loading &&
                  <div className="spinner">
                    <div className="spinner-border text-light" role="status"></div>
                  </div>
                }
                <div className="text">Add Gift</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default addGift