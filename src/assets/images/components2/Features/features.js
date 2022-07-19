import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Images
import img1 from "../../../assets/images/features-img-1.png";
import img2 from "../../../assets/images/features-img-2.png";

class Features extends Component {
  render() {
    return (
      <React.Fragment>
        {/* FEATURES START  */}

        <section className="section bg-light position-relative" id="features">
          <Container>
            <Row className=" align-items-center">
              <Col lg={6}>
                <img
                  src={img1}
                  alt="img1"
                  className="img-fluid mx-auto d-block"
                />
              </Col>
              <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
                <div className="features-content text-muted">
                  <h3 className="text-dark font-weight-bold feature-title mb-4">
                    Content Explorer
                  </h3>
                  <p className="f-15 mb-4">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti provident sunt similique.
                  </p>
                  <p className="f-15 mb-4">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit quia consequuntur.
                  </p>
                  <p className="f-15 mb-3">
                    <i className="remixicon-home-heart-line h5 mr-2 text-purple align-middle" />{" "}
                    I must explain to you as denouncing.
                  </p>
                  <p className="f-15 mb-3">
                    <i className="remixicon-pie-chart-line h5 mr-2 text-purple align-middle" />{" "}
                    On the other hand we denounce with righteous.
                  </p>
                  <p className="f-15 mb-3">
                    <i className="remixicon-bar-chart-line h5 mr-2 text-purple align-middle" />{" "}
                    The wise man therefore always matters.
                  </p>
                  <Link to="#" className="btn btn-outline-purple mt-4">
                    Try It Now{" "}
                    <i className="remixicon-arrow-right-s-fill ml-2" />
                  </Link>
                </div>
              </div>
            </Row>
          </Container>
        </section>
        <section className="section position-relative">
          <Container>
            <Row className=" align-items-center">
              <Col lg={5}>
                <div className="features-content text-muted">
                  <h3 className="text-dark font-weight-bold feature-title mb-4">
                    Data Canter &amp; Hosting
                  </h3>
                  <p className="f-15 mb-4">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti provident sunt similique.
                  </p>
                  <p className="f-15 mb-3">
                    <i className="remixicon-bank-line h5 mr-2 text-purple align-middle" />{" "}
                    I must explain to you as denouncing.
                  </p>
                  <p className="f-15 mb-3">
                    <i className="remixicon-links-line h5 mr-2 text-purple align-middle" />{" "}
                    On the other hand we denounce with righteous.
                  </p>
                  <p className="f-15 mb-3">
                    <i className="remixicon-stack-line h5 mr-2 text-purple align-middle" />{" "}
                    The wise man therefore always matters.
                  </p>
                  <Link to="#" className="btn btn-outline-purple mt-4">
                    Try It Now{" "}
                    <i className="remixicon-arrow-right-s-fill ml-2" />
                  </Link>
                </div>
              </Col>
              <div className="col-lg-6 offset-lg-1 mt-5 mt-lg-0">
                <img
                  src={img2}
                  alt="img2"
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Features;
