import React from 'react'
import { Link } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import menu from "../content/navbar.json"

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: 'is-active',
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  }

  render() {
    return (
      <nav
        className="nav navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="nav-inner">
            {menu.logo &&
              <div className="nav-brand">
                <Link to="/" title="OpenInfra Labs Website Logo">
                  <img src={menu.logo} alt="OpenInfra Labs Website" />
                </Link>
                {/* Hamburger menu */}
              </div>
            }
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              role="button"
              tabIndex="0"
              onClick={() => this.toggleHamburger()}
              onKeyDown={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
            <div
              id="navMenu"
              className={`nav-content ${this.state.navBarActiveClass}`}
            >
              <ul className="nav-menu nobullet navbar-start has-text-centered">
                {menu.nav.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <li>
                        {data.link.match(/^https?:\/\//) ?
                          <OutboundLink href={data.link} target="_blank" rel="noopener noreferrer">{data.text}</OutboundLink>
                          :
                          <Link to={data.link}>
                            {data.text}
                          </Link>
                        }
                      </li>
                      
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
