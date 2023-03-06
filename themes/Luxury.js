import React from "react";
import CardMenu from "../components/CardMenu";
import Greetings from "../components/Greetings";
import Program from "../components/Program";
import GuestBook from "../components/GuestBook";
import RvspForm from "../components/RvspForm";
import Countdown from "../components/Countdown";
import CardOpener from "../components/CardOpener";
import BrideName from "../components/BrideName";

const Luxury = ({ data, isLive, isCardOpen }) => {
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
          <div className="design-image luxury-hero bg-luxury">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#CDA657'}
            />

            <img className="flower-left" src="https://ik.imagekit.io/kaddigital/luxury-flower-left.png" alt="flower" />
            <img className="flower-right" src="https://ik.imagekit.io/kaddigital/luxury-flower-right.png" alt="flower" />

            <BrideName 
              color={'#CDA657'}
              data={data}
            />
          </div>

          <div className="test"></div>

          <div className="bg-luxury vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings data={data} />
          </div>

          <div className="bg-luxury vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program data={data} />

              <GuestBook data={data} />

              <Countdown data={data} />
            </div>
          </div>

          <div className="bg-luxury rvsp-section px-4 d-flex align-items-center">
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
          <div className="design-image luxury-hero bg-luxury">
            <CardOpener 
              className="card-opener"
              color={'white'}
              bgColor={'#CDA657'}
            />
  
            <img className="flower-left" src="https://ik.imagekit.io/kaddigital/luxury-flower-left.png" alt="flower" />
            <img className="flower-right" src="https://ik.imagekit.io/kaddigital/luxury-flower-right.png" alt="flower" />

            <BrideName 
              color={'#CDA657'}
            />
          </div>

          <div className="test"></div>

          <div className="bg-luxury vh-100 greetings-section p-5 d-flex align-items-center">
            <Greetings />
          </div>

          <div className="bg-luxury vh-100 px-4 d-flex align-items-center">
            <div className="w-100">
              <Program />

              <GuestBook />

              <Countdown />
            </div>
          </div>

          <div className="bg-luxury rvsp-section px-4 d-flex align-items-center">
            <RvspForm />
          </div>

          <CardMenu />
        </div>
      }
    </>
  )
}

export default Luxury;