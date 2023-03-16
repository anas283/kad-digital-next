import { useEffect, useState } from "react";
import GetTimeMinute from '../helpers/GetTimeMinute';
import { useTranslation } from 'react-i18next';

const Program = ({ data }) => {
  const [events, setEvents] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if(data) {
      if(typeof data.events === 'string') {
        setEvents(JSON.parse(data.events));
      } else {
        setEvents(data.events);
      }
    }
  },[data])

  return (
    <>
      {(data && events.length > 0) &&     
        <div className="itinerary"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
          <h5 className="title-bold text-center">{ t('atur_cara') }</h5>
          <div className="col-9 mx-auto mt-4">
            {events.map((event, id) => {
              return (
                <div key={id} className="box d-flex flex-row">
                  <div className="col-4 time info-bold">{ GetTimeMinute(event.time) }</div>
                  <div className="col-8 detail">{ event.name }</div>
                </div>
              )
            })}
          </div>
        </div>
      }
      {!data &&
        <div className="itinerary"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          >
          <h5 className="title-bold text-center">{ t('atur_cara') }</h5>
          <div className="col-9 mx-auto mt-4">
            <div className="box d-flex flex-row">
              <div className="col-4 time info-bold">12:00 PM</div>
              <div className="col-8 detail">Ketibaan tetamu</div>
            </div>
            <div className="box d-flex flex-row">
              <div className="col-4 time info-bold">12:30 PM</div>
              <div className="col-8 detail">Jamuan makan</div>
            </div>
            <div className="box d-flex flex-row">
              <div className="col-4 time info-bold">1:00 PM</div>
              <div className="col-8 detail">Ketibaan pengantin</div>
            </div>
          </div>
        </div>
      }  
    </>
  );
};

export default Program;
