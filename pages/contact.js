import Head from 'next/head';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Contact = () => {

  const meta = {
    title: "Contact Us",
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
              <h1 className="text-center">
                Love to hear from you, <br/>
                Get in touch 👋🏻
              </h1>
              <form 
                className='col-12 col-md-8 col-ld-8 mx-auto mt-4'
                action="https://formsubmit.co/kaddigital7@gmail.com" method="POST"
              >
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <div className="form-group mt-2">
                      <label>Your name</label>
                      <input type="text" name='name' className="form-control mt-1" required />
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className="form-group mt-2">
                      <label>Your email</label>
                      <input type="email" name='email' className="form-control mt-1" required />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className="form-group mt-2">
                    <label>Message</label>
                    <textarea type="text" name='message' className="form-control mt-1" rows={5} required />
                  </div>
                </div>
                <div>
                  <button type='submit' className='btn btn-dark px-4 mt-4'>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact;