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

# REST API

This API is for the video uploading. The file should be named 'file'. If the upload is successful, the video will be processed by the Scan, Edit, Prepare, and Finish service.

```bash
POST /start
```

This API returns list of all uploaded files with their id’s

```bash
GET /files
```

This API returns the information (JSON object) about the particular file.

```bash
GET /files/:fileId/status
```

This API returns the information (JSON object) about the particular file.

# How to run application

Install docker and runn command from Docker paragraph.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

P.S.
Currently the application support only upload video action. For testing other API use postman.

# Docker

- Building an image

```bash
$ docker-compose build
```

- Running containers

```bash
$ docker-compose up
```

- Stopping containers

```bash
$ docker-compose down
```
