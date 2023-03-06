import React from "react";
import CardMenu from "../components/CardMenu";
import Greetings from "../components/Greetings";
import Program from "../components/Program";
import GuestBook from "../components/GuestBook";
import RvspForm from "../components/RvspForm";
import Countdown from "../components/Countdown";
import CardOpener from "../components/CardOpener";
import BrideName from "../components/BrideName";

const MagesticGold = ({ data, isLive, isCardOpen }) => {
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
          <div className="design-image magestic-gold-hero">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#EABF72'}
            />

            <img className="bg-image" src="https://ik.imagekit.io/kaddigital/magestic-gold-bg.png" alt="magestic-gold-bg"></img>
            <img className="flower-big-top" src="https://ik.imagekit.io/kaddigital/gold-flower-big-top.png" alt="flower" />
            <img className="flower-big-bottom" src="https://ik.imagekit.io/kaddigital/gold-flower-big-bottom.png" alt="flower" />
            <img className="leaf-top" src="https://ik.imagekit.io/kaddigital/gold-leaf-top.png" alt="flower" />
            <img className="leaf-bottom" src="https://ik.imagekit.io/kaddigital/gold-leaf-bottom.png" alt="flower" />

            <BrideName 
              color={'#EABF72'}
              data={data}
            />
          </div>

          <div className="test"></div>

          <div className="bg-magestic-gold vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings data={data} />
          </div>

          <div className="bg-magestic-gold vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program data={data} />

              <GuestBook data={data} />

              <Countdown data={data} />
            </div>
          </div>

          <div className="bg-magestic-gold rvsp-section px-4 d-flex align-items-center">
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
          <div className="design-image magestic-gold-hero">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#EABF72'}
            />
  
            <img className="bg-image" src="https://ik.imagekit.io/kaddigital/magestic-gold-bg.png" alt="magestic-gold-bg"></img>
            <img className="flower-big-top" src="https://ik.imagekit.io/kaddigital/gold-flower-big-top.png" alt="flower" />
            <img className="flower-big-bottom" src="https://ik.imagekit.io/kaddigital/gold-flower-big-bottom.png" alt="flower" />
            <img className="leaf-top" src="https://ik.imagekit.io/kaddigital/gold-leaf-top.png" alt="flower" />
            <img className="leaf-bottom" src="https://ik.imagekit.io/kaddigital/gold-leaf-bottom.png" alt="flower" />

            <BrideName 
              color={'#EABF72'}
            />
          </div>

          <div className="test"></div>

          <div className="bg-magestic-gold vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings />
          </div>

          <div className="bg-magestic-gold vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program />

              <GuestBook />

              <Countdown />
            </div>
          </div>

          <div className="bg-magestic-gold rvsp-section px-4 d-flex align-items-center">
            <RvspForm />
          </div>

          <CardMenu />
        </div>
      }
    </>
  )
}

export default MagesticGold;