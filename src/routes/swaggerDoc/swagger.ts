import paths from './paths';
import tags from './tags';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'backend-boilerplate api Documentation',
    description: 'backend-boilerplate api Documentation in swagger',
    termsOfService: 'https://www.linkedin.com/in/zuberkhan034/',
    contact: {
      name: 'Zuber Khan',
      email: 'zuberkhan034@gmail.com',
      url: 'https://www.linkedin.com/in/zuberkhan034/',
    },
  },
  servers: [
    {
      url: 'http://localhost:8002/',
      description: 'Local Server',
    },
    {
      url: 'http://localhost:8002/', // replace it with deployed server url
      description: 'Production Server',
    },
  ],
  tags: tags,
  paths: paths,

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
export { apiDocumentation };
