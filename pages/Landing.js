import Link from "next/link";
import Mockup from "../components/Mockup";
import MockupImages from "../components/MockupImages";
import FeatherIcon from 'feather-icons-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
      </div>
      <div className="min-vh-100 mt-sm" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <div
            className="hero-section d-flex align-items-center container"
            style={{ height: "90vh" }}
          >
            <div className="row w-100 mx-auto">
              <div className="col-12 col-lg-6 d-flex align-items-center">
                <div>
                  <h1 className="title fw-600">
                    Create <span className="text-gradient">stunning</span> invitations in minutes.
                  </h1>
                  <h5 className="subtitle text-secondary col-12 col-lg-9 my-3">
                    Craft beautiful wedding cards that ensure your guests don't miss out on the special event!
                  </h5>
                  <Link href="/register" className="center-sm">
                    <button className="btn btn-dark rounded-pill px-4 mt-3">Get Started</button>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="image-box">
                  <img src="https://ik.imagekit.io/kaddigital/mockup-gradient.png" alt="mockup-hero"></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="features-section py-5">
            <div className="row">
              <div className="col-8 col-md-6 col-lg-3 mx-auto">
                <div className="feature-item mt-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="icon-box">
                      <FeatherIcon icon="map" size={24} />
                    </div>
                  </div>
                  <h5 className="fw-500 text-center fw-600">Map</h5>
                  <h6 className="text-secondary text-center">
                    Navigation using the Google Maps or Waze
                  </h6>
                </div>
              </div>
              <div className="col-8 col-md-6 col-lg-3 mx-auto">
                <div className="feature-item mt-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="icon-box">
                      <FeatherIcon icon="phone" size={24} />
                    </div>
                  </div>
                  <h5 className="fw-500 text-center fw-600">Call</h5>
                  <h6 className="text-secondary text-center">
                    Representatives to be contacted on the wedding day
                  </h6>
                </div>
              </div>
              <div className="col-8 col-md-6 col-lg-3 mx-auto">
                <div className="feature-item mt-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="icon-box">
                      <FeatherIcon icon="gift" size={24} />
                    </div>
                  </div>
                  <h5 className="fw-500 text-center fw-600">Gift</h5>
                  <h6 className="text-secondary text-center">
                    Receive gift from your wedding guest
                  </h6>
                </div>
              </div>
              <div className="col-8 col-md-6 col-lg-3 mx-auto">
                <div className="feature-item mt-5">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="icon-box">
                      <FeatherIcon icon="phone" size={24} />
                    </div>
                  </div>
                  <h5 className="fw-500 text-center fw-600">RVSP</h5>
                  <h6 className="text-secondary text-center">
                    Get responses from the invitation about attendance status
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mockup-section py-5">
            <h1 className="text-center">Choose your theme</h1>
            <h5 className="text-center text-secondary">Made for your special day</h5>
            <div className="row mt-4">
              {MockupImages.map((data, index) => {
                return (
                  <div 
                    key={index} 
                    className={index < 4 ? 'col-6 col-lg-3 mb-3':'d-none'}
                  >
                    <Mockup 
                      name={data.name}
                      image={data.image}
                    />
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link href="/themes">
                <button className="btn btn-dark mt-3 rounded-pill px-3">See all theme</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mockup-section py-5">
            <h1 className="text-center">Pricing</h1>
            <h5 className="text-center text-secondary">Always know what you will pay</h5>
            <div className="col-8 col-md-4 col-lg-3 mx-auto mt-4">
              <div className="card p-3">
                <h6 className="text-secondary text-center">Premium</h6>
                <h2 className="text-center">RM55</h2>
                <h6 className="text-secondary text-center">/one time</h6>
                <Link href="/register" className="center-sm d-flex justify-content-center"
                  style={{ textDecoration: 'none' }}
                >
                  <button className="btn btn-dark rounded-pill px-4 mt-3">Get Started</button>
                </Link>
                <div className="col-12 col-md-10 mx-auto mt-4">
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Unlimited Edit</h6>
                  </div>
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Google Maps & Waze</h6>
                  </div>
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Call & Whatsapp</h6>
                  </div>
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Receive gifts</h6>
                  </div>
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Guest RVSP</h6>
                  </div>
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Background music</h6>
                  </div>
                  <div className="d-flex flex-row my-2">
                    <FeatherIcon icon="check-circle" size={24} />
                    <h6 className="ms-2">Countdown</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Landing;
