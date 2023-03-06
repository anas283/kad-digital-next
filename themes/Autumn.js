import React from "react";
// import "../styles/Demo.css";
// import "../styles/Themes.css";
import CardMenu from "../components/CardMenu";
import Greetings from "../components/Greetings";
import Program from "../components/Program";
import GuestBook from "../components/GuestBook";
import RvspForm from "../components/RvspForm";
import Countdown from "../components/Countdown";
import CardOpener from "../components/CardOpener";
import BrideName from "../components/BrideName";

const Autumn = ({ data, isLive, isCardOpen }) => {
  return (
    <>
      {(isLive && data.length !== 0) &&
        <div 
          className={
            isCardOpen ? 
              'design-opened design-wrapper col-12 col-md-4 mx-auto':
              'design-wrapper col-12 col-md-4 mx-auto'
          }
        >
          <div className="design-image autumn-hero">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#914F39'}
            />

            <img className="bg-image" src="https://ik.imagekit.io/kaddigital/autumn-bg.png" alt="autumn-bg"></img>
            <img className="flower-top" src="https://ik.imagekit.io/kaddigital/autumn-flower-top.png" alt="flower" />
            <img className="flower-bottom" src="https://ik.imagekit.io/kaddigital/autumn-flower-bottom.png" alt="flower" />
            <img className="leaf-top" src="https://ik.imagekit.io/kaddigital/autumn-leaf-top.png" alt="flower" />
            <img className="leaf-bottom" src="https://ik.imagekit.io/kaddigital/autumn-leaf-bottom.png" alt="flower" />

            <BrideName 
              color={'#914F39'}
              data={data}
            />
          </div>

          <div className="test"></div>

          <div className="bg-autumn vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings data={data} />
          </div>

          <div className="bg-autumn vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program data={data} />

              <GuestBook data={data} />

              <Countdown data={data} />
            </div>
          </div>

          <div className="bg-autumn rvsp-section px-4 d-flex align-items-center">
            <RvspForm data={data} />
          </div>

          <CardMenu data={data} />
        </div>
      }
      {!isLive &&
        <div 
          className={
            isCardOpen ? 
              'design-opened design-wrapper col-12 col-md-4 mx-auto':
              'design-wrapper col-12 col-md-4 mx-auto'
          }
        >
          <div className="design-image autumn-hero">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#914F39'}
            />
  
            <img className="bg-image" src="https://ik.imagekit.io/kaddigital/autumn-bg.png" alt="autumn-bg"></img>
            <img className="flower-top" src="https://ik.imagekit.io/kaddigital/autumn-flower-top.png" alt="flower" />
            <img className="flower-bottom" src="https://ik.imagekit.io/kaddigital/autumn-flower-bottom.png" alt="flower" />
            <img className="leaf-top" src="https://ik.imagekit.io/kaddigital/autumn-leaf-top.png" alt="flower" />
            <img className="leaf-bottom" src="https://ik.imagekit.io/kaddigital/autumn-leaf-bottom.png" alt="flower" />

            <BrideName 
              color={'#914F39'}
            />
          </div>

          <div className="test"></div>

          <div className="bg-autumn vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings />
          </div>

          <div className="bg-autumn vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program />

              <GuestBook />

              <Countdown />
            </div>
          </div>

          <div className="bg-autumn rvsp-section px-4 d-flex align-items-center">
            <RvspForm />
          </div>

          <CardMenu />
        </div>
      }
    </>
  )
}

export default Autumn;