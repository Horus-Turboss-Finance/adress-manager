<div align="center">
  <h1>Cash Eyes (adress register & discovery api documentation)</h1>
  <h6>Ce repository contien toutes les routes (et routines) du micro service d'adress de Cash Eyes.</h6>
</div>

### Table des matières.
- [Packages](#packages)
  - [Dev-packages](#dev-packages)
  - [Packages](#packages-1)
- [Backend installation](#backend-installation)
- [Démarer le backend de l'application](#démarer-le-backend-de-lapplication)
- [API](#api)
  - [Ajouter un service](#ajouter-un-service)
    - [URL](#url)
    - [Request Parameters :](#request-parameters-)
    - [*Exemple de requête*](#exemple-de-requête)
    - [Response Parameters :](#response-parameters-)
    - [*Exemple de réponse*](#exemple-de-réponse)
  - [Get service](#get-service)
    - [URL](#url-1)
    - [Request Parameters :](#request-parameters--1)
    - [*Exemple de requête*](#exemple-de-requête-1)
    - [Response Parameters :](#response-parameters--1)
    - [*Exemple de réponse*](#exemple-de-réponse-1)
  - [Update service](#update-service)
    - [URL](#url-2)
    - [Request Parameters :](#request-parameters--2)
    - [*Exemple de requête*](#exemple-de-requête-2)
    - [Response Parameters :](#response-parameters--2)
    - [*Exemple de réponse*](#exemple-de-réponse-2)
  - [Delete service](#delete-service)
    - [URL](#url-3)
    - [Request Parameters :](#request-parameters--3)
    - [*Exemple de requête*](#exemple-de-requête-3)
    - [Response Parameters :](#response-parameters--3)
    - [*Exemple de réponse*](#exemple-de-réponse-3)
- [About :](#about-)

## Packages
### Dev-packages
- `@commitlint/cli` - Un module très utile pour la normalisation des noms de commit git [^1].
- `@commitlint/config-conventional`  - configuration conventionnel de commitlint [^2]. 
- `@types/express` - Définitions des types du module express [^3].
- `@types/jest` - Définitions des types du module jest [^4].
- `@types/node` - Définitions des types du module nodejs [^5].
- `@types/supertest` - Définitions des types du module supertest [^6].
- `@typescript-eslint/eslint-plugin` - Un plugin ESLint qui fournit des règles de contrôle pour les bases de code TypeScript [^7].
- `@typescript-eslint/parser` - Un analyseur ESLint qui exploite TypeScript ESTree pour permettre à ESLint d'analyser le code source TypeScript [^8].
- `eslint` - ESLint est un outil permettant d'identifier et de signaler les schémas trouvés dans le code ECMAScript/JavaScript [^9].
- `eslint-plugin-jest` - ESLint plugin for Jest [^10].
- `husky` - Husky améliore vos commits et plus encore [^11].
- `jest` - Des tests JavaScript délicieux [^12].
- `nodemon` - nodemon est un outil qui redémarre automatiquement l'application node lorsque des changements sont détectés [^13].
- `supertest` - Module pour teste HTTP [^14].
- `ts-jest` - Un transformateur Jest avec le support de la carte source qui vous permet d'utiliser Jest pour tester des projets écrits en TypeScri [^15].
- `ts-node` - Exécution TypeScript et REPL pour node.js, avec support source map et ESM natif [^16].
- `typescript` - Javascript avec typage fort [^17].

### Packages
- `axios` - packages pour les requêtes [^18].
- `checks` - fonctions pour vérifier le typage [^19].
- `constraint` - fonction de contrainte (surtout texte) [^20].
- `dateformat` - fonction de modifications sur la date [^21].
- `dotenv` - Dotenv est un module à dépendance zéro qui charge les variables d'environnement d'un fichier .env dans process.env [^22].
- `error-handler` - fonctions des gestions des réponses et erreurs [^23].
- `express` - Framework web minimaliste, rapide et sans opinion pour Node.js [^24].
- `log` - class pour les logs in app [^25].
- `mongoose` - Mongoose est un outil de modélisation d'objets MongoDB conçu pour fonctionner dans un environnement asynchrone [^26].
- `signed-service` - Signature des services [^27].


## Backend installation

**1. Packages**

```shell
npm install
```

**2. Créer les fichiers de configuration**

```shell
cd ./config
nano .env
```

```env
# Dans le fichier `.env`
PORTAPP=Int # Port d'écoute de la machine

WEBHOOKERROR=String # L'url pour le webhook discord (avertir des erreurs)
URLDB=String # l'uri de mongodb (avec une db en fin de uri)
```

## Démarer le backend de l'application
Pour démarer le backend vous avez besoin de faire les étapes précédemment expliquées puis les commandes suivantes.
```shell
npm run build
npm run prod
# OR
npm start
```

## API
### Ajouter un service
#### URL
```http
POST /service
```

#### Request Parameters : 
| Parameter  | Type     | 
| :--------- | :------: |
| `port`     | `INT`    |
| `adressIP` | `String` |
| `service`  | `String` |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/service',
        method: 'POST',
        body: {
            port : process.env.port, 
            adressIP : app.ip,
            service : "MAIL"
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 201,
  data : 'Service enregistrée'
}
```

### Get service
#### URL
```http
GET /service
```

#### Request Parameters : 
| Parameter  |   Type   | Description             |
| :--------- | :------: | :---------------------- |
| `service`  | `String` | Votre service recherché |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/service`,
        method: 'GET',
        body: {
            service : "MAIL",
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","service" : "MAIL", "port" : 3000, "adressIP" : "127.0.0.1", "status" : 1}]'
}
```


### Update service
#### URL
```http
PUT /service
```

#### Request Parameters : 
| Parameter  | Type     |
| :--------- | :------: | 
| `port`     | `INT`    | 
| `adressIP` | `String` |
| `service`  | `String` | 
| `status`   | `INT` | 

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'PUT',
        body: {
            port : 3000,
            adressIP : "127.0.0.1",
            service : "MAIL",
            status : 0,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 201,
  data : 'Service bien modifié'
}
```


### Delete service
#### URL
```http
DELETE /service
```

#### Request Parameters : 
| Parameter  | Type     |
| :--------- | :------: | 
| `adressIP` | `String` |
| `service`  | `String` |
| `port`     | `INT` |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'DELETE',
        body: {
            adressIP : "127.0.0.1",
            service : "MAIL",
            port : 3000,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : "Service supprimé des annuaires"
}
```

------------
## About :
- `CHANGELOG` [source](./CHANGELOG.md)

Ref :
[^1]: [Url du dépot `@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli)
[^2]: [Url du dépot `@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional)
[^3]: [Url du dépot `@types/express`](https://www.npmjs.com/package/@types/express)
[^4]: [Url du dépot `@types/jest`](https://www.npmjs.com/package/@types/jest)
[^5]: [Url du dépot `@types/node`](https://www.npmjs.com/package/@types/node)
[^6]: [Url du dépot `@types/supertest`](https://www.npmjs.com/package/@types/supertest)
[^7]: [Url du dépot `@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
[^8]: [Url du dépot `@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
[^9]: [Url du dépot `eslint`](https://www.npmjs.com/package/eslint)
[^10]: [Url du dépot `eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest)
[^11]: [Url du dépot `husky`](https://www.npmjs.com/package/husky)
[^12]: [Url du dépot `jest`](https://www.npmjs.com/package/jest)
[^13]: [Url du dépot `nodemon`](https://www.npmjs.com/package/nodemon)
[^14]: [Url du dépot `supertest`](https://www.npmjs.com/package/supertest)
[^15]: [Url du dépot `ts-jest`](https://www.npmjs.com/package/ts-jest)
[^16]: [Url du dépot `ts-node`](https://www.npmjs.com/package/ts-node)
[^17]: [Url du dépot `typescript`](https://www.npmjs.com/package/typescript)
[^18]: [Url du dépot `axios`](https://www.npmjs.com/package/axios)
[^19]: [Url du dépot `checks`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/checks)
[^20]: [Url du dépot `constraint`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/constraint)
[^21]: [Url du dépot `dateformat`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/dateformat)
[^22]: [Url du dépot `dotenv`](https://www.npmjs.com/package/dotenv)
[^23]: [Url du dépot `error-handler`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/error-handler)
[^24]: [Url du dépot `express`](https://www.npmjs.com/package/express)
[^25]: [Url du dépot `log`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/log)
[^26]: [Url du dépot `mongoose`](https://www.npmjs.com/package/mongoose)
[^27]: [Url du dépot `signed-service`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/signed-service)