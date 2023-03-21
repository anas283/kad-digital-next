import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Price = () => {

  const meta = {
    title: "Pricing",
    description: "Craft beautiful wedding cards that ensure your guests don't miss out on the special event!",
    type: "website",
  }

  return (
    <>
      <Head>
        <title>{ meta.title }</title>
        <meta name="description" content={ meta.description } />
        <meta property="og:title" content={ meta.title } />
        <meta property="og:description" content={ meta.description } />
      </Head>
      <Navbar />
      <div className="min-vh-100">
      <div className="container">
          <div className="mockup-section py-5">
            <h1 className="text-center">Pricing</h1>
            <h5 className="text-center text-secondary">Always know what you will pay</h5>
            <div className="col-8 col-md-4 col-lg-3 mx-auto mt-4">
              <div class="card p-3">
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
  )
}

export default Price;