import React from "react";
import CardMenu from "../components/CardMenu";
import Greetings from "../components/Greetings";
import Program from "../components/Program";
import GuestBook from "../components/GuestBook";
import RvspForm from "../components/RvspForm";
import Countdown from "../components/Countdown";
import CardOpener from "../components/CardOpener";
import BrideName from "../components/BrideName";

const OceanBlue = ({ data, isLive, isCardOpen }) => {
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
          <div className="design-image ocean-blue-hero">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#4D78AD'}
            />

            <img className="bg-image" src="https://ik.imagekit.io/kaddigital/ocean-blue-bg.png" alt="ocean-blue-bg"></img>
            <img className="flower-big-top" src="https://ik.imagekit.io/kaddigital/blue-flower-big-top.png" alt="flower" />
            <img className="flower-big-bottom" src="https://ik.imagekit.io/kaddigital/blue-flower-big-bottom.png" alt="flower" />
            <div className="blue-frame-box">
              <img className="blue-frame" src="https://ik.imagekit.io/kaddigital/blue-frame.png" alt="flower" />
              <img className="flower-frame-top" src="https://ik.imagekit.io/kaddigital/blue-flower-small-top.png" alt="flower" />
              <img className="flower-frame-bottom" src="https://ik.imagekit.io/kaddigital/blue-flower-small-bottom.png" alt="flower" />
            </div>

            <BrideName 
              color={'#4D749C'}
              data={data}
            />
          </div>

          <div className="bg-ocean-blue vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings data={data} />
          </div>

          <div className="bg-ocean-blue vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program data={data} />

              <GuestBook data={data} />
              
              <Countdown data={data} />
            </div>
          </div>

          <div className="bg-ocean-blue rvsp-section px-4 d-flex align-items-center">
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
          <div className="design-image ocean-blue-hero">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#4D78AD'}
            />

            <img className="bg-image" src="https://ik.imagekit.io/kaddigital/ocean-blue-bg.png" alt="ocean-blue-bg"></img>
            <img className="flower-big-top" src="https://ik.imagekit.io/kaddigital/blue-flower-big-top.png" alt="flower" />
            <img className="flower-big-bottom" src="https://ik.imagekit.io/kaddigital/blue-flower-big-bottom.png" alt="flower" />
            <div className="blue-frame-box">
              <img className="blue-frame" src="https://ik.imagekit.io/kaddigital/blue-frame.png" alt="flower" />
              <img className="flower-frame-top" src="https://ik.imagekit.io/kaddigital/blue-flower-small-top.png" alt="flower" />
              <img className="flower-frame-bottom" src="https://ik.imagekit.io/kaddigital/blue-flower-small-bottom.png" alt="flower" />
            </div>

            <BrideName 
              color={'#4D749C'}
            />
          </div>

          <div className="bg-ocean-blue vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings />
          </div>

          <div className="bg-ocean-blue vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program />

              <GuestBook />
              
              <Countdown />
            </div>
          </div>

          <div className="bg-ocean-blue rvsp-section px-4 d-flex align-items-center">
            <RvspForm />
          </div>

          <CardMenu />
        </div>
      }
    </>
  );
};

export default OceanBlue;
