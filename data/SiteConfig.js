const config = {
  siteTitle: 'João Carlos Ottobboni',
  siteTitleShort: 'João Ottobboni',
  siteTitleAlt: 'João Carlos Ottobboni',
  siteLogo: '/logos/jcottobboni.jpg',
  siteUrl: 'https://www.joaocarlos.dev',
  repo: 'https://github.com/jcottobboni/joaocarlos.dev',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'João Carlos Ottobboni is web developer and writer specializing in Ruby on Rails.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-42068484-1',
  postDefaultCategoryID: 'Tech',
  commentsApi: 'https://joao-comments-api.herokuapp.com/comments',
  userName: 'joao',
  userEmail: 'jcottobboni@gmail.com',
  userTwitter: 'jcottobboni',
  menuLinks: [
    {
      name: 'Me',
      link: '/me/',
    },
    {
      name: 'Articles',
      link: '/blog/',
    },
    {
      name: 'Contact',
      link: '/contact/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config
