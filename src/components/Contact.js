import React, { Component } from 'react'
import NewsletterForm from './NewsletterForm'

export default class Contact extends Component {
  render() {
    return (
      <>
        <h1>Stay in Touch</h1>
        <p>
        ...
        </p>
        <NewsletterForm />
        <p>You can also find me around the web.</p>
        <ul>
          <li>
            <strong>GitHub</strong>:{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jcottobboni">
              jcottobboni
            </a>
          </li>
          <li>
            <strong>Twitter</strong>:{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/jcottobboni">
              jcottobboni
            </a>
          </li>
          <li>
            <strong>Feed</strong>: <a href="https://www.jcottobboni.com/rss.xml">RSS</a>
          </li>
        </ul>
      </>
    )
  }
}
