import Loader from "./Loader";
import { useState, useEffect } from "react";

export default function Testimonial() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const updateSlide = () => {
    let slides = document.querySelectorAll(".slides");
    let dots = document.querySelectorAll(".dot");
    slides.forEach((slide) => {
      slide.classList.remove("active");
      if (slide.id == `slide-${currentSlide}`) slide.classList.add("active");
    });
    dots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.id == `dot-${currentSlide}`) dot.classList.add("active");
    });
  };
  useEffect(() => {
    setCurrentSlide(1);
    setLoading(false);
  }, []);
  useEffect(() =>{
    if(loading) return;
    let dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        setCurrentSlide(Number(dot.id.split("-")[1]));
      });
    });
  },[loading])
  useEffect(() => {
    updateSlide();
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide === 3 ? 1 : currentSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid py-5 ">
          <div className="container">
            <div
              className="text-center mx-auto mb-5"
              style={{ maxWidth: "500px" }}
            >
              <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                Testimonial
              </h5>
              <h1 className="display-4">Patients Say About Our Services</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div id="slide-1" className="slides active">
                  <div className="testimonial-item text-center">
                    <div className="position-relative mb-5">
                      <img
                        className="img-fluid rounded-circle mx-auto"
                        src="img/testimonial-1.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                      </div>
                    </div>
                    <p className="fs-4 fw-normal">
                      Dolores sed duo clita tempor justo dolor et stet lorem
                      kasd labore dolore lorem ipsum. At lorem lorem magna ut
                      et, nonumy et labore et tempor diam tempor erat. Erat
                      dolor rebum sit ipsum.
                    </p>
                    <hr className="w-25 mx-auto" />
                    <h3>Patient Name</h3>
                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                  </div>
                </div>
                <div id="slide-2" className="slides">
                  <div className="testimonial-item text-center">
                    <div className="position-relative mb-5">
                      <img
                        className="img-fluid rounded-circle mx-auto"
                        src="img/testimonial-2.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                      </div>
                    </div>
                    <p className="fs-4 fw-normal">
                      Dolores sed duo clita tempor justo dolor et stet lorem
                      kasd labore dolore lorem ipsum. At lorem lorem magna ut
                      et, nonumy et labore et tempor diam tempor erat. Erat
                      dolor rebum sit ipsum.
                    </p>
                    <hr className="w-25 mx-auto" />
                    <h3>Patient Name</h3>
                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                  </div>
                </div>
                <div id="slide-3" className="slides">
                  <div className="testimonial-item text-center">
                    <div className="position-relative mb-5">
                      <img
                        className="img-fluid rounded-circle mx-auto"
                        src="img/testimonial-3.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                      </div>
                    </div>
                    <p className="fs-4 fw-normal">
                      Dolores sed duo clita tempor justo dolor et stet lorem
                      kasd labore dolore lorem ipsum. At lorem lorem magna ut
                      et, nonumy et labore et tempor diam tempor erat. Erat
                      dolor rebum sit ipsum.
                    </p>
                    <hr className="w-25 mx-auto" />
                    <h3>Patient Name</h3>
                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                  </div>
                </div>
                <div className="text-center" id="dots">
                  <button id="dot-1" className="dot active"></button>
                  <button id="dot-2" className="dot"></button>
                  <button id="dot-3" className="dot"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
