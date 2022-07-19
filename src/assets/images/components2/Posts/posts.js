import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Section Title
import SectionTitle from "../Common/SectionTitle";

import { Link } from "react-router-dom";

//Images
import Image1 from "../../../assets/images/post/img-1.jpg";
import Image2 from "../../../assets/images/post/img-2.jpg";
import Image3 from "../../../assets/images/post/img-3.jpg";
import postBG from "../../../assets/images/post-bg.png";

class Posts extends Component {
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
        {/* LETEST POST START */}
        <section
          className="section bg-light"
          id="news"
          style={{ background: `url(${postBG}) center center` }}
        >
          <Container>
            <SectionTitle
              title="Latest Post"
              description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed consequuntur as sequi nesciunt."
            />
            <Row className="row">
              <Col lg={4}>
                <div className="post-content bg-white rounded mt-4">
                  <img
                    src={Image1}
                    alt="Image1"
                    className="img-fluid mx-auto d-block"
                  />
                  <div className="p-4">
                    <ul className="list-inline f-14">
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-user-3-line mr-2" />
                        Admin
                      </li>
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-heart-2-line mr-2" />
                        Like
                      </li>
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-question-answer-line mr-2" />
                        Comments
                      </li>
                    </ul>
                    <p className="font-weight-medium f-13 text-purple text-uppercase">
                      # Travel
                    </p>
                    <Link to="#" className="text-dark font-weight-medium h5">
                      The Best Traveling Place
                    </Link>
                    <p className="text-muted f-14 mt-3 mb-4">
                      Nemo enim ipsam voluptatem a that voluptas sit aspernatur
                      consequuntur...
                    </p>
                    <Link to="#" className="text-dark f-14">
                      View Details{" "}
                      <i className="remixicon-arrow-right-line ml-1" />
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="post-content bg-white rounded mt-4">
                  <img
                    src={Image2}
                    alt="Image2"
                    className="img-fluid mx-auto d-block"
                  />
                  <div className="p-4">
                    <ul className="list-inline f-14">
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-user-3-line mr-2" />
                        Admin
                      </li>
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-heart-2-line mr-2" />
                        Like
                      </li>
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-question-answer-line mr-2" />
                        Comments
                      </li>
                    </ul>
                    <p className="font-weight-medium f-13 text-purple text-uppercase">
                      # Event
                    </p>
                    <Link to="#" className="text-dark font-weight-medium h5">
                      Most Popular Events
                    </Link>
                    <p className="text-muted f-14 mt-3 mb-4">
                      Quis autem vel eum iure reprehenderit qui in ea voluptate
                      velit esse quam...
                    </p>
                    <Link to="#" className="text-dark f-14">
                      View Details{" "}
                      <i className="remixicon-arrow-right-line ml-1" />
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className="post-content bg-white rounded mt-4">
                  <img
                    src={Image3}
                    alt="Image3"
                    className="img-fluid mx-auto d-block"
                  />
                  <div className="p-4">
                    <ul className="list-inline f-14">
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-user-3-line mr-2" />
                        Admin
                      </li>
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-heart-2-line mr-2" />
                        Like
                      </li>
                      <li className="list-inline-item text-muted mr-3">
                        <i className="remixicon-question-answer-line mr-2" />
                        Comments
                      </li>
                    </ul>
                    <p className="font-weight-medium f-13 text-purple text-uppercase">
                      # News
                    </p>
                    <Link to="#" className="text-dark font-weight-medium h5">
                      Letest News Post
                    </Link>
                    <p className="text-muted f-14 mt-3 mb-4">
                      Et harum quidem rerum facilis est et expedita distinctio
                      nam libero tempore...
                    </p>
                    <Link to="#" className="text-dark f-14">
                      View Details{" "}
                      <i className="remixicon-arrow-right-line ml-1" />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* LETEST POST END */}
      </React.Fragment>
    );
  }
}

export default Posts;
