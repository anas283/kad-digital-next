import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openCard } from '../store/themeReducer';
// import "../styles/Themes.css";

const CardOpener = ({ color, bgColor }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isCardOpen = useSelector((state) => state.theme.isCardOpen);

  const open = () => {
    setIsOpen(true);

    setTimeout(() => {
      dispatch(openCard(true));
    }, 800);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isCardOpen ? "auto" : "hidden";
    }
  },[isCardOpen])

  return (
    <>
      <div 
        className={isOpen ? 'card-opened card-opener':'card-opener'}
        onClick={open}  
      >
        <div className='left-box shadow'>
          <div className='info'>
            Click to open
          </div>
        </div>
        <div className='circle'
          style={{
            color: color,
            backgroundColor: bgColor
          }}
        >
          <h6 className='bride-name'>K&D</h6>
        </div>
        <div className='right-box shadow'></div>
      </div>
    </>
  )
}

export default CardOpener;