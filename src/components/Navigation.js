import React, { Component } from 'react'
import { Link } from 'gatsby'
import raven_shield_white from '../images/raven_shield_white.png'
import sun from '../images/sun.svg'
import moon from '../images/moon.svg'
import kofi from '../../content/thumbnails/kofi.png'
import ThemeContext from '../context/ThemeContext'

export default class Navigation extends Component {
  static contextType = ThemeContext

  state = {
    scrolled: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  render() {
    const { scrolled } = this.state
    const { menuLinks } = this.props
    const theme = this.context

    return (
      <nav className={scrolled ? 'nav scroll' : 'nav'}>
        <div className="nav-container">
          <div className="brand">
            <Link to="/">
              <img src={raven_shield_white} className="favicon" alt="Ravenclaw Crest by Whitney Rosenberg from the Noun Project" />
              <span className="text">João Carlos Ottobboni</span>
            </Link>
          </div>
          <div className="links">
            {menuLinks.map(link => (
              <Link key={link.name} to={link.link} activeClassName="active">
                {link.name}
              </Link>
            ))}
            <a target="_blank" rel="noopener noreferrer" href="https://ko-fi.com/jcottobboni">
              <img src={kofi} alt="Kofi" className="kofi" />
            </a>
            <div className="cta">
              <button className="dark-switcher" onClick={theme.toggleDark}>
                {theme.dark ? (
                  <span>
                    <img src={sun} className="theme-icon" alt="Light Mode" />
                  </span>
                ) : (
                  <span>
                    <img src={moon} className="theme-icon" alt="Dark Mode" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
