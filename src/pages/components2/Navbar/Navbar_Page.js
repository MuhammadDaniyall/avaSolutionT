import React, { Component } from "react";
import {
  Container,
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import { Link } from "react-router-dom";
// import ScrollspyNav from "./scrollSpy";
import logo from '../../../assets/images/logo png.png';

//Import Stickey Header
import StickyHeader from "react-sticky-header";

import logolight from "../../../assets/images/logo-light.png";
import logodark from "../../../assets/images/logo-dark.png";

class NavbarPage extends Component {
  prevScrollpos = 0;

  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: "home", navheading: "Home" },
        { id: 2, idnm: "service", navheading: "Services" },
        { id: 3, idnm: "features", navheading: "Features" },
        // { id: 4, idnm: "client", navheading: "Clients" },
        // { id: 5, idnm: "news", navheading: "News" },
      ],
      isOpen: false,
      topPos: "0",
      isOpenMenu: false,
      navCenterClass: "",
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.handleScrollMenu = this.handleScrollMenu.bind(this);
  }

  handleScrollMenu = async () => {
    let currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      await this.setState({ topPos: "0" });
    } else {
      await this.setState({ topPos: "-420px" });
    }
    this.prevScrollpos = currentScrollPos;

    if (window.innerWidth <= 768) {
      await this.setState({ navCenterClass: "" });
    } else {
      await this.setState({
        navCenterClass: "navbar-nav mx-auto navbar-center",
      });
    }
  };

  componentDidMount() {
    this.prevScrollpos = window.pageYOffset;
    window.addEventListener("scroll", this.handleScrollMenu);
    if (window.innerWidth <= 768) {
      this.setState({ navCenterClass: "" });
    } else {
      this.setState({ navCenterClass: "navbar-nav mx-auto navbar-center" });
    }
  }

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  toggle = async () => {
    await this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
    let targetId = this.state.navItems.map((item) => {
      return item.idnm;
    });
    return (
      <React.Fragment>
        <StickyHeader
          header={
            <Navbar
              className={`navbar navbar-expand-lg fixed-top navbar-custom${
                this.props.isStickyNav === true
                  ? `sticky sticky-light`
                  : ` navbar-light`
              }`}
              id="navbar"
              style={{ top: this.state.topPos }}
            >
              <Container>
                <NavbarBrand href="/" className="logo">
                  <img
                    src={logo}
                    alt=""
                    className="logo"
                    height={32}
                  />
                </NavbarBrand>

                <NavbarToggler
                  className="navbar-toggler"
                  type="button"
                  aria-label="Toggle navigation"
                  onClick={this.toggle}
                >
                  <i className="remixicon-menu-fill" />
                </NavbarToggler>
                <Collapse
                  id="navbarCollapse"
                  isOpen={this.state.isOpenMenu}
                  navbar
                >
                  {/* <ScrollspyNav
                    scrollTargetIds={targetId}
                    scrollDuration="150"
                    headerBackground="false"
                    activeNavClass="active"
                    navCenterClass={this.state.navCenterClass}
                  > */}
                    <Nav
                      navbar
                      className="navbar-nav mx-auto navbar-center"
                      id="mySidenav"
                    >
                      {this.state.navItems.map((item, key) => (
                        <NavItem
                          key={key}
                          className={
                            item.navheading === "Home"
                              ? "nav-item active"
                              : "nav-item"
                          }
                        >
                          <NavLink href={"#" + item.idnm} className="nav-link">
                            {" "}
                            {item.navheading}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  {/* </ScrollspyNav> */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="#" className="nav-link">
                        <i className="remixicon-facebook-line f-16" />
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="#" className="nav-link">
                        <i className="remixicon-twitter-line f-16" />
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="#" className="nav-link">
                        <i className="remixicon-instagram-line f-16" />
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </Container>
            </Navbar>
          }
          stickyOffset={-100}
        ></StickyHeader>
      </React.Fragment>
    );
  }
}

export default NavbarPage;
