
<img src="https://github.com/SagnikH/pair-programming/blob/master/logo.png" />

<h3 align= "center"> A collaborative code editor, for your mock interviews & coding assessments </h3>
</br>

**NOTE: Our app uses cookies to authorize users, please allow cookies to use our app**

## Motivation

We found it inconvenient, that for any mock interview we needed to have a gmeet, an editor and a question set open on multiple tabs for a single purpose. This lead us to the idea of an all in one solution for mock interviews.

## Features

- Collaborative editing
- Video calling
- Archiving one's progress
- Secure login using Google Oauth2


## Dependencies(tech-stack)

Client-side | Server-side
--- | ---
@monaco-editor/react: ^4.3.1    | @googleapis/oauth2: ^0.2.0
@reduxjs/toolkit: ^1.6.2        | automerge: ^1.0.1-preview.6
automerge: ^1.0.1-preview.6     | cors: ^2.8.5
peerjs: ^1.3.2                  | dotenv: ^10.0.0
bootstrap: ^5.1.3               | express: ^4.17.1
react-bootstrap: ^2.0.3         | jsonwebtoken: ^8.5.1
react: ^17.0.2                  | cheerio: ^1.0.0-rc.10
react-router-dom: ^6.0.2        | mongoose: ^6.0.13
react-redux: ^7.2.6             | puppeteer: ^12.0.1
socket.io-client: ^4.4.0        | socket.io: ^4.4.0
dotenv: ^10.0.0                 | cookie-parser: ^1.4.6

## Prerequisites
- [MongoDB](https://docs.atlas.mongodb.com)
- [Node: ^16.x](https://nodejs.org/en)
- [npm](https://nodejs.org/en/download/package-manager)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### CLIENT
- `REACT_APP_SERVER_URL` - http://localhost:4000

#### SERVER
- `CLIENT_URL` - http://localhost:3000
- `CLIENT_ID` - Google Oauth2 Client ID credential
- `CLIENT_SECRET` - Google Oauth2 Client Secret Key credential
- `CALLBACK_URL` - Callback URL provided in Google Oauth2 credentials
- `MONGODB_URI` - Connection String provided by Mongodb Atlas
- `JWT_PRIVATE_KEY` - Private key for Jsonwebtoken encryption
- `PORT` - 4000 (Port on which the server runs) 




## Run Locally

Clone the project

```
  git clone https://github.com/SagnikH/pair-programming.git
```

Install dependencies

```bash
  cd client/
  npm install
```
```bash
  cd server/
  npm install
  npm install -D
```

Start the server ( PORT: 4000 )

```
  npm run dev
```

Start the client ( PORT : 3000 )

```
  npm start
```

## Future plans
- Integrate language switching option
- Sent invite links via social media platforms
- Admin access control features
- Online compiler

## Contributors

- [@Sagnik Haldar](https://github.com/SagnikH)
- [@Subodh Singh](https://github.com/subodh0201)
- [@Sattam Bandyopadhyay](https://github.com/bsattam)
- [@Ronak Sanpui](https://github.com/SanpuiRonak)

## Special thanks
- [@Soumitri Chattopadhyay](https://github.com/soumitri2001)

## Feedback

If you have any feedback, please reach out to us at peerprogramming.apes@gmail.com


## License

[Apache](https://choosealicense.com/licenses/apache-2.0/)

