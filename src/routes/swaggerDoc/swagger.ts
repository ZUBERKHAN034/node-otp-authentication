import paths from './paths';
import tags from './tags';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'node-otp-authentication : (One-Time Password Login) api Documentation',
    description: 'NOTE: You can switch between local and production sever by left side [Severs] dropdowns options.',
    termsOfService: 'https://github.com/ZUBERKHAN034/node-otp-authentication',
    contact: {
      name: 'Zuber Khan',
      email: 'zuberkhan034@gmail.com',
      url: 'https://www.linkedin.com/in/zuberkhan034/',
    },
  },
  servers: [
    {
      url: 'https://node-otp-authentication.onrender.com/', // replace it with deployed server url
      description: 'Production Server',
    },
    {
      url: 'http://localhost:8002/',
      description: 'Local Server',
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
