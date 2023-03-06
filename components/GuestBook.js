import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import api from '../api';
import { refreshGuest } from "../store/themeReducer";

const GuestBook = ({ data }) => {
  const [wishes, setWishes] = useState([]);
  const isRefreshGuest = useSelector(state => state.theme.isRefreshGuest);
  const dispatch = useDispatch();
  const router = useRouter();
  const name = router.query.name;

  const getGuestWishes = useCallback(async () => {
    try {
      await api.get('/api/attendance/get-latest/' + data.id).then((res) => {
        if(res.data.status === 'success') {
          var filtered_data = res.data.data.filter(function(item) {
            return item.message !== '' && item.is_show === 1;
          });
          setWishes(filtered_data);
        }
      })
    } catch (e) {
      if(e.response) {
        console.log(e.response.data.message);
      }
    }
  },[data?.id])

  useEffect(() => {
    getGuestWishes();
  },[getGuestWishes,data?.id])

  useEffect(() => {
    getGuestWishes();
    dispatch(refreshGuest(false))
  },[dispatch, getGuestWishes, isRefreshGuest])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      {wishes.length !== 0 &&
        <div className="guest-book pt-5"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          >
          <h5 className="title-bold text-center fw-600">Ucapan</h5>
    
          <Slider {...settings} className="guest-book-swiper">
            {wishes.map((wish,key) => {
              return (
                <div key={key} className="wish-content d-flex justify-content-center align-items-center">
                  <div>
                    <h6 className="guest-wish text-center">
                      { wish.message }
                    </h6>
                    <h6 className="guest-name fw-300 text-center">- { wish.name }</h6>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      }
      {(wishes.length === 0 && name === 'demo') &&
        <div className="guest-book pt-5"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          >
          <h5 className="title-bold text-center fw-600">Ucapan</h5>
    
          <Slider {...settings} className="guest-book-swiper">
            <div className="wish-content d-flex justify-content-center align-items-center">
              <div>
                <h6 className="guest-wish text-center">
                  Tahniah guys, semoga kekal hingga ke anak cucu. I wish you both
                  the best!
                </h6>
                <h6 className="guest-name fw-300 text-center">- Amirul</h6>
              </div>
            </div>
            <div className="wish-content d-flex justify-content-center align-items-center">
              <div>
                <h6 className="guest-wish text-center">
                  Selamat pengantin baru sahabatku, selamat menjalani kehidupan berumah tangga
                </h6>
                <h6 className="guest-name fw-300 text-center">- Siti</h6>
              </div>
            </div>
            <div className="wish-content d-flex justify-content-center align-items-center">
              <div>
                <h6 className="guest-wish text-center">
                  OMG, tak sangka orang dah nak kahwin
                </h6>
                <h6 className="guest-name fw-300 text-center">- Ali</h6>
              </div>
            </div>
          </Slider>
        </div>
      }
    </>
 
  );
};

export default GuestBook;
