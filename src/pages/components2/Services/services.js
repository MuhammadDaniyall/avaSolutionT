import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Section Title
import SectionTitle from "../Common/SectionTitle";
import ServiceBox from "./service-box";
import { Link } from "react-router-dom";

class Services extends Component {
  state = {
    services: [
      {
        title: "Awesome Support",
        icon: "pe-7s-exapnd2",
        description: "Nemo enim ipsam voluptatem quia voluptas.",
        link: "#",
      },
      {
        title: "Goal Business",
        icon: "pe-7s-world",
        description: "These cases are site perfectly simple and easy.",
        link: "#",
      },
      {
        title: "Digital Design",
        icon: "pe-7s-paint-bucket",
        description: "At vero eos et accusamus iusto odio dignissimos.",
        link: "#",
      },
      {
        title: "Dynamic Growth",
        icon: "pe-7s-graph1",
        description: "Temporibus autem quibusdam et aut officiis debitis.",
        link: "#",
      },
    ],
    services1: [
      {
        title: "Digital Design",
        icon: "pe-7s-paint-bucket",
        description:
          "At vero eos et accusamus iusto odio dignissimos qui blanditiis voluptatum.",
        link: "#",
      },
      {
        title: "Solutions Business",
        icon: "pe-7s-rocket",
        description:
          "Et harum quidem rerum facilis est et expedita distinctio libero tempore soluta.",
        link: "#",
      },
      {
        title: "Dynamic Growth",
        icon: "pe-7s-graph1",
        description:
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe.",
        link: "#",
      },
    ],
  };
  render() {
    return (
      <React.Fragment>
        {/* SERVICE START  */}
        <section id="service" className="section position-relative">
          <Container>
            <SectionTitle
              title="Cloud Service"
              description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed consequuntur as sequi nesciunt."
            />

            <Row className="align-items-center">
              <Col lg={5}>
                <div className="service-2-content mt-4">
                  <h3 className="text-dark line-height-1_4 font-weight-medium">
                    This Is Increase your Marketing Performance
                  </h3>
                  <p className="text-muted mt-4 f-15">
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and give you a the master-builder of
                    human happiness.
                  </p>
                  <div className="mb-4">
                    <Link to="#" className="btn btn-outline-purple mt-4">
                      Learn More
                    </Link>
                  </div>
                </div>
              </Col>
              <div className="col-lg-6 offset-lg-1">
                <div className="row">
                  <ServiceBox services={this.state.services} />
                </div>
              </div>
            </Row>
          </Container>
        </section>

        {/* SERVICE END  */}
      </React.Fragment>
    );
  }
}

export default Services;
