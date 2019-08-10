const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 4040;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const connection = mysql.createPool({
  host: 'remotemysql.com',
  user: 'c65k2kQp1t',
  password: 'sdt1a57qam',
  insecureAuth: true,
  database: 'c65k2kQp1t',
});

app.get('/', (req, res) => {
  res.header('Content-Security-Policy', 'img-src "self"');
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/authenticate', (req, res) => {
  const { email, password } = req.body;
  connection.query(`select * from user_db where email='${email}'`, (err, result) => {
    if (err) throw err;
    if (result.length) {
      if (result[0].Password === password) {
        res.send(result[0]);
      } else {
        res.send('Password error');
      }
    } else {
      res.send('Email error');
    }
  });
});

app.post('/postJobDetails', (req, res) => {
  const {
    jobDesc, location, band, noOfApp, skills, managerId, managerName, managerEmail, managerPhone,
  } = req.body;
  connection.query(`insert into job_posts (ManagerId, ManagerName, ManagerEmail, ManagerPhone, JobDesc, Location, Skills, Band, NoOfApp) values (${managerId}, '${managerName}', '${managerEmail}', '${managerPhone}', '${jobDesc}', '${location}', '${skills}', '${band}', ${noOfApp})`, (err) => {
    if (err) throw err;
    connection.query(`select JobId from job_posts where JobDesc='${jobDesc}'`, (err, result) => {
      if (err) throw err;
      res.send(`${result[0].JobId}`);
    });
  });
});

app.get('/fetchAllJobPosts', (req, res) => {
  connection.query('select * from job_posts', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/applyForJob', (req, res) => {
  const { jobId, userId } = req.body;
  connection.query(`select Applicants from job_posts where JobId=${jobId}`, (err, result) => {
    if (err) throw err;
    if (!result[0].Applicants) {
      connection.query(`update job_posts set Applicants='${userId}' where JobId=${jobId}`, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    } else if (result[0].Applicants.split(',').includes(String(userId))) {
      res.sendStatus(201);
    } else {
      const tempResult = result[0].Applicants.split(',');
      tempResult.push(userId);
      connection.query(`update job_posts set Applicants='${tempResult}' where JobId=${jobId}`, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    }
  });
});

app.post('/fetchAppliedJobs', (req, res) => {
  const { userId } = req.body;
  connection.query(`select JobId from job_posts where Applicants like '%${userId}%'`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/deleteJob', (req, res) => {
  const { jobId } = req.body;
  connection.query(`delete from job_posts where JobId=${jobId}`, (err1, result1) => {
    if (err1) throw err1;
    connection.query('select * from job_posts', (err2, result2) => {
      if (err2) throw err2;
      res.send(result2);
    });
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
