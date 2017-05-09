Swagger Combine
===============

Combines multiple Swagger configurations into one dereferenced schema.

## Install

```sh
$ npm install --save swagger-combine
```

## Usage

```js
const swaggerCombine = require('swagger-combine');

swaggerCombine('config/swagger.json')
    .then(combinedSchema => console.log(JSON.stringify(combinedSchema)))
    .catch(err => console.error(err));
```

**swagger-combine** returns a promise by default. Alternatively a callback can be passed as second argument:

```js
swaggerCombine('config/swagger.json', (err, res) => {
  if (err) console.error(err);

  console.log(JSON.stringify(res));
});
```

### Middleware

```js
const swaggerCombine = require('swagger-combine');
const app = require('express')();

app.get('/swagger.json', swaggerCombine.middleware('config/swagger.json'));
app.get('/swagger.yaml', swaggerCombine.middleware('config/swagger.json', { format: 'yaml' }));
app.listen(3333);
```

The middleware runs the combine function on every request. Since swagger documentations tend not to change that frequently, the use of a caching mechanism like [apicache](https://github.com/kwhitley/apicache) is encouraged in conjungtion with this middleware.

## Configuration

**swagger-combine** requires one configuration schema which resembles a standard swagger schema except for an additional `apis` field. The default path for this file is `config/swagger.json`.
The schema can be passed to **swagger-combine** as a file path, a URL or a JS object.

### Basic Configuration

**swagger.json**

```json
{
  "swagger": "2.0",
  "info": {
    "title": "Basic Swagger Combine Example",
    "version": "1.0.0"
  },
  "apis": [
    {
      "url": "http://petstore.swagger.io/v2/swagger.json"
    },
    {
      "url": "https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml"
    }
  ]
}
```

**swagger.yaml**

```yaml
swagger: '2.0'
info:
  title: Basic Swagger Combine Example
  version: 1.0.0
apis:
  - url: 'http://petstore.swagger.io/v2/swagger.json'
  - url: 'https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml'
```

*All example configurations are located in the `examples` folder.*


### Filtering Paths

Paths can be filtered by using an array of paths to `exclude` or `include`. 

```json
{
  "swagger": "2.0",
  "info": {
    "title": "Swagger Combine Filtering Example",
    "version": "1.0.0"
  },
  "apis": [
    {
      "url": "http://petstore.swagger.io/v2/swagger.json",
      "paths": {
        "exclude": [
          "/pet/{petId}"
        ]
      }
    },
    {
      "url": "https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml",
      "paths": {
        "include": [
          "/users/{userId}/publications"
        ]
      }
    }
  ]
}
```

### Renaming Paths

Paths can be renamed by specifying the path to rename and the new path name as key/value pairs in `paths.rename`.

```json
{
  "swagger": "2.0",
  "info": {
    "title": "Swagger Combine Replacing Example",
    "version": "1.0.0"
  },
  "apis": [
    {
      "url": "http://petstore.swagger.io/v2/swagger.json",
      "paths": {
        "rename": {
          "/pet/{petId}": "/pet/alive/{petId}"
        }
      }
    },
    {
      "url": "https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml"
    }
  ]
}
```

### Renaming Tags

Tags can be renamed in the same manner as paths, using the `tags.rename` field.

```json
{
  "swagger": "2.0",
  "info": {
    "title": "Swagger Combine Replacing Example",
    "version": "1.0.0"
  },
  "apis": [
    {
      "url": "http://petstore.swagger.io/v2/swagger.json"
    },
    {
      "url": "https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml",
      "tags": {
        "rename": {
          "Users": "People"
        }
      }
    }
  ]
}
```

### Path Security

Security can be specified per path using the `paths.security` field.

```json
{
  "swagger": "2.0",
  "info": {
    "title": "Swagger Combine Security Example",
    "version": "1.0.0"
  },
  "apis": [
    {
      "url": "http://petstore.swagger.io/v2/swagger.json",
      "paths": {
        "security": {
          "/store/order": {
            "petstore_auth": [
              "write:pets",
              "read:pets"
            ]
          }
        }
      }
    },
    {
      "url": "https://api.apis.guru/v2/specs/medium.com/1.0.0/swagger.yaml"
    }
  ]
}
```