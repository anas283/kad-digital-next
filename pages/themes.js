import Head from 'next/head';
import Footer from '../components/Footer';
import Mockup from "../components/Mockup";
import MockupImages from "../components/MockupImages";
import Navbar from '../components/Navbar';

const Themes = () => {

  const meta = {
    title: "Themes",
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
        <div>
          <div className="container">
            <div className="mockup-section py-5">
              <h1 className="text-center">Themes</h1>
              <h5 className="text-center text-secondary">Choose the best one for your wedding</h5>
              <div className="row mt-3">
                {MockupImages.map((data, index) => {
                  return (
                    <div key={index} className="col-6 col-lg-3 my-3">
                      <Mockup 
                        name={data.name}
                        image={data.image}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Themes