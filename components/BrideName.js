// import "../styles/Demo.css";
// import "../styles/Themes.css";
import GetDayNumber from '../helpers/GetDayNumber';
import GetMonth from '../helpers/GetMonth';
import GetYear from '../helpers/GetYear';

const BrideName = ({ data, color }) => {
  return (
    <>
      {data &&      
        <div className="main-content bride-content">
          <div>
            <h6 className="main-title">
              Walimatul Urus
            </h6>
            <h4 className="bride-name text-center text-curve d-flex flex-column my-4"
              style={{ color: color }}  
            >
              <span>{ data.men_short_name }</span>
              <span>&</span>
              <span>{ data.women_short_name }</span>
            </h4>
            <div className="date-info d-flex flex-row">
              <h6 className='month'>
                { GetMonth(data.wedding_date) }
              </h6>
              <h6 className='day'
                style={{ color: color }} 
              >
                { GetDayNumber(data.wedding_date) }
              </h6>
              <h6 className='year'>
                { GetYear(data.wedding_date) }
              </h6>
            </div>
          </div>
        </div>
      }
      {!data &&      
        <div className="main-content bride-content">
          <div>
            <h6 className="main-title">
              Walimatul Urus
            </h6>
            <h4 className="bride-name text-center text-curve d-flex flex-column my-4"
              style={{ color: color }}  
            >
              <span>Kamal</span>
              <span>&</span>
              <span>Diana</span>
            </h4>
            <div className="date-info d-flex flex-row">
              <h6 className='month'>Ogos</h6>
              <h6 className='day'
                style={{ color: color }} 
              >
                18
              </h6>
              <h6 className='year'>2023</h6>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default BrideName;