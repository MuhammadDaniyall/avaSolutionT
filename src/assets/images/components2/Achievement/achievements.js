import React, { Component } from "react";
import { Spring, config } from "react-spring/renderprops";

import CounterBg from "../../../assets/images/counter-bg.jpg";
import { Container, Row } from "reactstrap";

class Achievement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startCount: false,
    };
  }

  handleScroll = async () => {
    if (window.scrollY > 1500) {
      await this.setState({ startCount: true });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <React.Fragment>
        {/* COUNTER START  */}
        <section
          className="section position-relative"
          style={{ background: `url(${CounterBg}) center center` }}
        >
          <div className="bg-overlay" />
          <Container className="container">
            <Row className="justify-content-center">
              <div className="col-lg-6">
                <div className="title text-center mb-5">
                  <h2 className="font-weight-medium line-height-1_6 text-white">
                    Shopic Powers Ambitious Entrepreneurs All Our The World
                  </h2>
                </div>
              </div>
            </Row>
            <Row id="counter">
              <div className="col-lg-4">
                <div className="text-center text-white mt-4">
                  <h1>
                    <span className="counter-value mt-4" data-count={358620}>
                      {this.state.startCount ? (
                        <Spring
                          from={{ number: 0 }}
                          to={{ number: 358620 }}
                          delay="1000"
                          config={config.molasses}
                        >
                          {(props) => <div>{props.number.toFixed()}</div>}
                        </Spring>
                      ) : (
                        0
                      )}
                    </span>
                  </h1>
                  <p>Business Powered By Modzy</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-center text-white mt-4">
                  <h1>
                    <span className="counter-value mt-4" data-count={1052046}>
                      {this.state.startCount ? (
                        <Spring
                          from={{ number: 0 }}
                          to={{ number: 1052046 }}
                          delay="1000"
                          config={config.molasses}
                        >
                          {(props) => <div>{props.number.toFixed()}</div>}
                        </Spring>
                      ) : (
                        0
                      )}
                    </span>
                  </h1>
                  <p>Active Users</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-center text-white mt-4">
                  <h1>
                    <span className="counter-value mt-4" data-count={450}>
                      {this.state.startCount ? (
                        <Spring
                          from={{ number: 0 }}
                          to={{ number: 450 }}
                          delay="1000"
                          config={config.molasses}
                        >
                          {(props) => <div> ${props.number.toFixed()}+</div>}
                        </Spring>
                      ) : (
                        0
                      )}
                    </span>
                  </h1>
                  <p>Sold On Modzy</p>
                </div>
              </div>
            </Row>
          </Container>
        </section>

        {/* COUNTER END  */}
      </React.Fragment>
    );
  }
}

export default Achievement;
