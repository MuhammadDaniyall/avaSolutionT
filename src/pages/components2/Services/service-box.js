import React, { Component } from "react";
import { Link } from "react-router-dom";

class ServiceBox extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.services.map((service, key) => (
          <div className="col-md-6" key={key}>
            <div className="service-box mt-4">
              <i className={`${service.icon} text-purple h1 service-icon`} />
              <h5 className="text-dark font-weight-medium service-title f-18 mb-3 mt-5">
                {service.title}
              </h5>
              <p className="text-muted mb-4 f-14">{service.description}</p>
              <Link to={service.link} className="text-purple">
                <i className="remixicon-arrow-right-fill h4" />
              </Link>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default ServiceBox;
