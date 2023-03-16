import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Countdown = ({ data }) => {
  const [countdown, setCountdown] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Set the date we're counting down to
    var countDownDate;
    if(data) {
      countDownDate = new Date(data.wedding_date).getTime();
    }
    else {
      var date = new Date();
      date.setDate(date.getDate()+25);
      countDownDate = new Date(date).getTime();
    }

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const countdown = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      }
      setCountdown(countdown)

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);
  },[data])

  return (
    <>
      {countdown &&
        <div className="countdown-section mt-5 pt-5"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
          <h5 className="title-bold text-center">{ t('menghitung_hari') }</h5>
          <div className="col-10 mx-auto mt-4">
            <div className='row'>
              <div className='col p-1'>
                <div className='card border-0 shadow-sm p-2'>
                  <h5 className='title'>{ countdown.days }</h5>
                  <h6 className='subtitle'>{ t('hari') }</h6>
                </div>
              </div>
              <div className='col p-1'>
                <div className='card border-0 shadow-sm p-2'>
                  <h5 className='title'>{ countdown.hours }</h5>
                  <h6 className='subtitle'>{ t('jam') }</h6>
                </div>
              </div>
              <div className='col p-1'>
                <div className='card border-0 shadow-sm p-2'>
                  <h5 className='title'>{ countdown.minutes }</h5>
                  <h6 className='subtitle'>{ t('minit') }</h6>
                </div>
              </div>
              <div className='col p-1'>
                <div className='card border-0 shadow-sm p-2'>
                  <h5 className='title'>{ countdown.seconds }</h5>
                  <h6 className='subtitle'>{ t('saat') }</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Countdown;