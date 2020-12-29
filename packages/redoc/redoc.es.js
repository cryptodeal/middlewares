/**
 * ReDoc documentation page for Swagger
 * @param {object} options Options of documentation
 * @param {String=} options.title Title of documentation page
 * @param {String=} options.path Path of documentation page
 * @param {String=} options.url URL of Swagger file
 * @default options.title nanoexpress - ReDoc
 * @default options.path /docs
 *
 * @example
 * app.use(redoc())
 */
export default function redoc(config = {}) {
  config = {
    title: 'nanoexpress - ReDoc',
    path: '/docs/',
    ...config
  };

  // eslint-disable-next-line consistent-return
  return async function redocHandler(req, res) {
    if (config.url === undefined) {
      config.url = `http://${
        req.headers ? req.headers.origin : req.getHeader('host')
      }/docs/swagger.json`;
    }

    if (req.path === config.path) {
      return res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${config.title}</title>
        <!-- needed for adaptive design -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://quizizz.com/favicon.ico"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
          rel="stylesheet"
          async
        />

        <!--
        ReDoc doesn't change outer page styles
        -->
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <redoc
          spec-url="${config.url}"
          expand-responses="all"
        ></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js" async></script>
      </body>
    </html>
    `);
    }
  };
}
