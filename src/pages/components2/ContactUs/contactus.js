import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class ContactUs extends Component {
  render() {
    return (
      <React.Fragment>
        {/* CTA START  */}
        <section className="section cta-content position-relative bg-gradient">
          <div className="bg-cta-overlay" />
          <Container className="container">
            <Row className="row align-items-center">
              <Col lg={6}>
                <h3 className="text-white mb-3">
                  Become a part of Modzy bussiness community today
                </h3>
                <p className="text-white-50 f-15 mb-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti.
                </p>
              </Col>
              <Col lg={5}>
                <div className="cta-btn text-right mt-5 mt-lg-0">
                  <Link to="#" className="btn btn-light">
                    Contact Us
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* CTA END  */}
      </React.Fragment>
    );
  }
}

export default ContactUs;
