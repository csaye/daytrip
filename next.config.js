// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)

const withTM = require('next-transpile-modules')([
  // Need to specify all @fullcalendar modules separately
  // with next-transpile-modules^6.x …
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid'
])

module.exports = withTM({
  reactStrictMode: true,
})
