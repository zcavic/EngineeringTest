# EngineeringTest

# Architecture 

System design

![alt text](https://github.com/zcavic/EngineeringTest/blob/main/Documentation/WD_SystemDesign-Page-1.drawio.png?raw=true)

Architecture 

![alt text](https://github.com/zcavic/EngineeringTest/blob/main/Documentation/WD_SystemDesign-Page-2.drawio.png?raw=true)

Component diagram

![alt text](https://github.com/zcavic/EngineeringTest/blob/main/Documentation/WD_SystemDesign-Page-3.drawio.png?raw=true)

Sequential diagram of uploading video process

![alt text](https://github.com/zcavic/EngineeringTest/blob/main/Documentation/WD_SystemDesign-Page-4.drawio.png?raw=true)

Video processor state machine

![alt text](https://github.com/zcavic/EngineeringTest/blob/main/Documentation/WD_SystemDesign-Page-5.drawio.png?raw=true)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Docker

- Building an image

```bash
$ docker-compose build
```

- Running containers

```bash
$ docker-compose up
```

- Running containers with scale (round-robin)

```bash
$ docker-compose up --scale worker=3
```

- Stopping containers

```bash
$ docker-compose down
```
