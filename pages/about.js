import withNavbar from "@/components/withNavbar";
import { useEffect } from "react";
import SearchBySpec from "@/components/searchBySpec";
import Footer from "@/components/Footer";
import Testimonial from "@/components/Testimonials";

function AboutPage() {
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row gx-5">
            <div
              className="col-lg-5 mb-5 mb-lg-0"
              style={{ minHeight: "500px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 rounded"
                  src="img/about.jpg"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mb-4">
                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                  About Us
                </h5>
                <h1 className="display-4">
                  Best Medical Care For Yourself and Your Family
                </h1>
              </div>
              <p>
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                dolor diam ipsum et, tempor voluptua sit consetetur sit.
                Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                clita duo justo et tempor consetetur takimata eirmod, dolores
                takimata consetetur invidunt magna dolores aliquyam dolores
                dolore. Amet erat amet et magna
              </p>
              <div className="row g-3 pt-3">
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-user-md text-primary mb-3"></i>
                    <h6 className="mb-0">
                      Qualified
                      <small className="d-block text-primary">Doctors</small>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-procedures text-primary mb-3"></i>
                    <h6 className="mb-0">
                      Emergency
                      <small className="d-block text-primary">Services</small>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-microscope text-primary mb-3"></i>
                    <h6 className="mb-0">
                      Accurate
                      <small className="d-block text-primary">Treatment</small>
                    </h6>
                  </div>
                </div>
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-dollar-sign text-primary mb-3"></i>
                    <h6 className="mb-0">
                      Low<small className="d-block text-primary">Prices</small>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5"
            style={{ maxWidth: "500px" }}
          >
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Services
            </h5>
            <h1 className="display-4">Excellent Medical Services</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-user-md text-white"></i>
                </div>
                <h4 className="mb-3">Experienced Doctors</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-dollar-sign text-white"></i>
                </div>
                <h4 className="mb-3">Low Cost</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-globe text-white"></i>
                </div>
                <h4 className="mb-3">Online Checkup</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                  rebum stet, justo elitr dolor amet sit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchBySpec />

      <Testimonial />

      <Footer />
    </>
  );
}

export default withNavbar(AboutPage);
