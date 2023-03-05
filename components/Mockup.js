import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { chooseTheme } from "../store/themeReducer";

const Mockup = (data) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if(typeof window !== "undefined") {
      console.log(window.location.origin);
      setUrl(window.location.origin)
    }
  },[])

  const choose = (e) => {
    e.preventDefault()
    dispatch(chooseTheme(data.image))
    localStorage.setItem('demo_theme', data.name);

    const go_url = url + '/wedding/demo';
    window.open(go_url, "_blank"); 
  }

  return (
    <a href={url + '/wedding/demo'} target="_blank" rel="noreferrer" className="mockup-item mt-4" onClick={choose}>
      <div className="d-flex justify-content-center">
        <img className="w-75" src={ data.image } alt="mockup"></img>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <button className="btn btn-dark mt-3 rounded-pill px-3">
            View design
          </button>
        </div>
      </div>
    </a>
  );
};

export default Mockup;