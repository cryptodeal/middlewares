/* eslint-disable import/no-unresolved, node/no-missing-import, eslint-comments/disable-enable-pair */
import nanoexpress from 'nanoexpress';
import swaggerUi from '../swagger-ui.js';

const app = nanoexpress({
  swagger: {
    openapi: '3.0.0',
    info: {
      title: 'nanoexpress-swagger-example',
      version: '1.0.0',
      description: 'An Swagger example'
    },
    host: 'localhost:4000',
    basePath: '/'
  }
});

app.get(
  '/',
  {
    summary: 'Hello world',
    description: 'Hello world route',
    contentType: 'application/json',
    schema: {
      headers: false,
      query: {
        description: 'Hello world query',
        type: 'object',
        properties: {
          query1: { description: 'Query1', type: 'string' }
        }
      },
      params: {
        description: 'Hello world parameters',
        type: 'object',
        properties: {
          param1: { description: 'Param1', type: 'string' }
        }
      },
      body: {
        description: 'Hello world body',
        type: 'object',
        properties: {
          body1: { type: 'string' }
        }
      },
      response: {
        description: 'Hello world response',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  async () => ({ hello: 'world' })
);

app.use(swaggerUi());

app.listen(4040);
