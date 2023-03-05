import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseTheme } from "../store/themeReducer";
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const MockupCard = (data) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const choose = (e) => {
    e.preventDefault()
    dispatch(chooseTheme(data.image))
  }

  return (
    <div className={
      theme === data.image ? 'card card-selected mockup-card px-4 pb-3 mt-4':'card mockup-card px-4 pb-3 mt-4'} 
      onClick={choose}
    >
      <div className="icon-check"> 
        <FeatherIcon icon="check" size={13} />
      </div>
      <div className="mt-4">
        <div className="d-flex justify-content-center">
          <img className="w-75" src={ data.image } alt="mockup"></img>
        </div>
        <h6 className="text-center mt-2">{ data.name_long }</h6>
      </div>
    </div>
  );
};

export default MockupCard;