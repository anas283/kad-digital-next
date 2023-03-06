import GetDay from '../helpers/GetDay';
import GetDayNumber from '../helpers/GetDayNumber';
import GetMonth from '../helpers/GetMonth';
import GetYear from '../helpers/GetYear';
import GetTime from '../helpers/GetTime';

const Greetings = ({ data }) => {
  return (
    <>
      {data &&
        <div>
          <div className="pb-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
            <h5 className="parents-full-name text-center d-flex flex-column my-4">
              <span>{ data.father_full_name }</span>
              <span>&</span>
              <span>{ data.mother_full_name }</span>
            </h5>
            <h6 className="text-center fw-300 py-2">
              Dengan segala hormatnya mempersilakan tuan/puan ke majlis perkahwinan
              anakanda kami
            </h6>
            <h5 className="bride-full-name text-center d-flex flex-column my-4">
              <span>{ data.men_long_name }</span>
              <span>&</span>
              <span>{ data.women_long_name }</span>
            </h5>
          </div>
    
          <div className="pt-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
            <div className="mt-5 my-3">
              <h6 className="text-center fw-300">Tarikh</h6>
              <h6 className="info-bold text-center">
                { GetDay(data.wedding_date) + ', ' }
                { GetDayNumber(data.wedding_date) + ' ' }
                { GetMonth(data.wedding_date) + ' ' }
                { GetYear(data.wedding_date) }
              </h6>
            </div>
            <div className="my-4">
              <h6 className="text-center fw-300">Masa</h6>
              <h6 className="info-bold text-center">
                { GetTime(data.wedding_start_time) + ' - ' }
                { GetTime(data.wedding_end_time) }
              </h6>
            </div>
            <div className="my-4">
              <h6 className="text-center fw-300">Tempat</h6>
              <h6 className="info-bold text-center">
                { data.wedding_address_name }
              </h6>
            </div>
            <div className="my-4">
              <h6 className="text-center fw-300">Kod Pakaian</h6>
              <h6 className="info-bold text-center">
                { data.dress_code }
              </h6>
            </div>
          </div>
        </div>
      }
      {!data &&
        <div>
          <div className="pb-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
            <h5 className="parents-full-name text-center d-flex flex-column my-4">
              <span>Dato Yusof Bin Rejab</span>
              <span>&</span>
              <span>Datin Shafina Binti Fairus</span>
            </h5>
            <h6 className="text-center fw-300 py-2">
              Dengan segala hormatnya mempersilakan tuan/puan ke majlis perkahwinan
              anakanda kami
            </h6>
            <h5 className="bride-full-name text-center d-flex flex-column my-4">
              <span>Kamal Bin Dato Yusof</span>
              <span>&</span>
              <span>Diana Binti Saiful</span>
            </h5>
          </div>
    
          <div className="pt-3"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            >
            <div className="mt-5 my-3">
              <h6 className="text-center fw-300">Tarikh</h6>
              <h6 className="info-bold text-center">
                Isnin, 10 Julai 2023
              </h6>
            </div>
            <div className="my-4">
              <h6 className="text-center fw-300">Masa</h6>
              <h6 className="info-bold text-center">
                11:00 AM - 5:00 PM
              </h6>
            </div>
            <div className="my-4">
              <h6 className="text-center fw-300">Tempat</h6>
              <h6 className="info-bold text-center">
                Villamay Shah Alam
              </h6>
            </div>
            <div className="my-4">
              <h6 className="text-center fw-300">Kod Pakaian</h6>
              <h6 className="info-bold text-center">
                Tradisional
              </h6>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Greetings;
