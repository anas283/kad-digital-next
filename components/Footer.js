import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer text-white pt-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="col-12 col-lg-8">
                <img className="logo" src="https://ik.imagekit.io/kaddigital/kad-digital-logo-white.png" alt="logo" />
                <h6 className="description text-secondary my-4">
                  Craft beautiful wedding cards that ensure your guests don't miss out on the special event!
                </h6>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <h6 className="menu-title">Links</h6>
              <div className="menu-links d-flex flex-column">
                <Link href="/" className="link text-secondary my-2">Home</Link>
                <Link href="/themes" className="link text-secondary my-2">Themes</Link>
                <Link href="/contact" className="link text-secondary my-2">Contact Us</Link>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <h6 className="menu-title">Account</h6>
              <div className="menu-links d-flex flex-column text-secondary">
                <Link href="/login" className="link text-secondary my-2">Login</Link>
                <Link href="/register" className="link text-secondary my-2">Register</Link>
              </div>
            </div>  
          </div>
          <div className="copyright text-secondary pt-3 mt-4">
            © Copyright 2023, All Rights Reserved by Kad Digital
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
