const swaggerCombine = require('../src/swagger-combine');

const config = {
  swagger: '2.0',
  info: {
    title: 'Swagger Combine Replacing Example',
    version: '1.0.0'
  },
  apis: [
    {
      url: 'http://petstore.swagger.io/v2/swagger.json',
      paths: {
        replace: {
          '/pet/{petId}': '/pet/alive/{petId}'
        }
      }
    },
    {
      url: 'https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml',
      tags: {
        replace: {
          Users: 'People'
        }
      }
    }
  ]
};

swaggerCombine(config)
  .then(res => console.log(JSON.stringify(res, false, 2)))
  .catch(err => console.error(err));
