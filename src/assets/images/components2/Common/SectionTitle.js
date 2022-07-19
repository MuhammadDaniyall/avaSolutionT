import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class SectionTitle extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className="justify-content-center">
          <Col lg="7">
            <div className="text-center title mb-4">
              <h5 className="font-weight-bold text-uppercase text-dark">
                {this.props.title}
              </h5>
              <p className="text-muted">{this.props.description}</p>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default SectionTitle;
