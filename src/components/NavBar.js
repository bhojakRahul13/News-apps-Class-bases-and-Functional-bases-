import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    country:"in"
    };
  }

  

  handleChange=(e)=> {
    this.setState({
      country: e.target.value
    });
    this.props.changeCountry(e.target.value)
  }
  

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              News-App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/business">
                    bussiness
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment">
                    entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health">
                    health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science">
                    science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports">
                    sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology">
                    technology
                  </Link>
                </li>
              </ul>
           
              <label className="text-white m-2" htmlFor="state">Select Your Country: </label>
              <select className="bg-dark text-white custom-select" value={this.state.country} onChange={this.handleChange}>
                <option defaultValue value="in">India</option>
                <option value="us">United States of America</option>
                <option value="jp">Japan</option>
              </select>
            </div>
             
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
