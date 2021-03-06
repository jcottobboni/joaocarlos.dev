import React, { Component } from 'react'
import jcottobboni from '../../content/images/me.jpeg'
import patreon from '../../content/thumbnails/patreon.png'
import kofi from '../../content/thumbnails/kofi.png'

export default class UserInfo extends Component {
  render() {
    return (
      <aside className="note">
        <div className="container note-container">
          <div className="flex-author">
            <div className="flex-avatar">
              <img className="avatar" src={jcottobboni} alt="João Carlos Ottobboni" />
            </div>
            <div>
              <p>
                {`I'm João Carlos, a web developer specializing in Ruby on Rails. I make
              open source coding projects and write for help others.`}
              </p>

              <div className="flex">
                <a
                  href="https://ko-fi.com/jcottobboni"
                  className="donate-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={kofi} className="coffee-icon" alt="Coffee icon" />
                  Buy me a coffee!
                </a>
                <a
                  className="patreon-button"
                  href="https://www.patreon.com/jcottobboni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={patreon} height="50" width="50" /> Patreon
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}
