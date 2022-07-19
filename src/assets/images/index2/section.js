import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";

//Import Image
import heroBgImg from "../../assets/images/hero-2-bg.png";

class Section extends Component {
  render() {
    return (
      <React.Fragment>
        {/* HERO START */}
        <section
          className="hero-2-bg position-relative"
          id="home"
          style={{ background: `url(${heroBgImg}) center center` }}
        >
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <h2 className="text-dark hero-2-title mb-4 line-height-1_4">
                  Make your Site Amazing &amp; Unique.
                </h2>
                <p className="text-muted f-15">
                  Donec pede justo fringilla vel aliquet nec vulputate eget arcu
                  in enim bibendum must explain you how sitye all this mistaken.
                </p>
                <button className="btn btn-purple mt-4">Get Started</button>
              </Col>
              <div className="col-lg-4 offset-lg-2">
                <div className="hero-2-registration-form mx-auto rounded bg-white">
                  <h5 className="form-title mb-4 text-center">
                    Get 30 days FREE Trial
                  </h5>
                  <div className="form-border w-25 mx-auto mb-4" />
                  <form className="registration-form">
                    <div className="form-group mb-4">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="text-muted f-15"
                      >
                        Your Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="text-muted f-15"
                      >
                        Your email*
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput2"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="text-muted f-15"
                      >
                        Password*
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleFormControlInput3"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-purple btn-block btn-sm text-uppercase"
                    >
                      Get Started
                    </button>
                  </form>
                </div>
              </div>
            </Row>
          </Container>
        </section>

        {/* HERO END  */}
      </React.Fragment>
    );
  }
}

export default Section;
