import swaggerUiDist from 'swagger-ui-dist';

/**
 * Swagger UI Frontend middleware
 * @param {object} config Swagger UI Frontend middleware config
 * @param {String=} options.title Title of documentation page
 * @param {String=} options.path Path of Swagger front page
 * @param {String=} options.url URL of Swagger file
 * @default options.title nanoexpress - Swagger UI
 * @default options.path /docs/
 *
 * @example
 * app.use('/swagger-ui-dist', swaggerUi())
 * // or
 * app.get('/swagger-ui-dist', swaggerUi())
 */
export default function swaggerUiFrontend(config = {}) {
  if (config.title === undefined) {
    config.title = 'nanoexpress - Swagger UI';
  }
  if (config.path === undefined) {
    config.path = '/docs';
  }
  if (config.fsPath === undefined) {
    config.fsPath = swaggerUiDist.absolutePath();
  }
  // eslint-disable-next-line consistent-return
  return async function swaggerUiFrontendHandler(req, res) {
    if (config.url === undefined) {
      config.url = `//${
        req.headers !== undefined ? req.headers.host : req.getHeader('host')
      }/docs/swagger.json`;
    }

    if (req.path.indexOf('/swagger-ui') !== -1) {
      return res.sendFile(
        `${config.fsPath}${req.path.substr(req.path.lastIndexOf('/'))}`
      );
    }
    if (req.path === config.path) {
      return res.end(`
      <!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${config.title}</title>
<link rel="stylesheet" type="text/css" href="./swagger-ui.css" >
    <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
    <style>
      html
      {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
      }

      *,
      *:before,
      *:after
      {
        box-sizing: inherit;
      }

      body
      {
        margin:0;
        background: #fafafa;
      }
    </style>
  </head>

  <body>
    <div id="swagger-ui"></div>

    <script src="./swagger-ui-bundle.js"> </script>
    <script src="./swagger-ui-standalone-preset.js"> </script>
    <script>
    window.onload = function() {
      // Begin Swagger UI call region
      const ui = SwaggerUIBundle({
        url: window.location.protocol + "${config.url}",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      })
      // End Swagger UI call region

      window.ui = ui
    }
  </script>
  </body>
</html>`);
    }
  };
}
