import React, { Component } from 'react';
import Link from 'next/link';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="menu-container">
        <div className="logo">
          <div className="logo-text-k">K</div>
          <div className="logo-text-no">nowledge</div>
          <div className="logo-text-point">Point</div>
        </div>
        <ul className="menu collapsible">
          <li>
            <Link href="/management">
              <a className="waves-effect waves-light">
                <i className="material-icons">personal_video</i> management
              </a>
            </Link>
          </li>
          <li>
            <Link href="/callhistory">
              <a className="waves-effect waves-light">
                <i className="material-icons">personal_video</i> history
              </a>
            </Link>
          </li>

          <li>
            <Link href="/represent">
              <a className="waves-effect waves-light">
                <i className="material-icons">personal_video</i> represent
              </a>
            </Link>
          </li>
          <li>
            <Link href="/workhistory">
              <a className="waves-effect waves-light">
                <i className="material-icons">personal_video</i> workHistory
              </a>
            </Link>
          </li>
        </ul>
        <div className="copyright">
          Copyright
          <br />
          2012(c)
          <br />
          All rights reserved
          <br />
          Knowledgepoint.co.LTD:;
        </div>
      </div>
    );
  }
}

export default NavBar;
