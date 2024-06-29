const mysql = require('mysql');
const express = require('express');
const bodyp = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password (usually empty for XAMPP)
  database: 'share_spot'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
});

const app = express();
const staticpath = path.join(__dirname, "../frontend");
console.log(staticpath);

app.use(bodyp.urlencoded({ extended: false }));
app.use(express.static(staticpath, { index: "index.html" }));
app.get("/",(req,res)=>{
  res.sendFile("../frontend/index.html")
});
const otp = Math.floor(100000 + Math.random() * 900000);
console.log(otp)

app.post("/sign_in", (req, res) => {
  const { v_uname, v_pwd } = req.body;
  const q1 = "SELECT pass FROM user_details WHERE uname=?";
  const value = [v_uname];
  connection.query(q1, value, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from the database:', error.stack);
      res.status(500).send('Error fetching data from the database');
      return;
    }

    if (results.length > 0) {
      const dbPassword = results[0].pass;
      if (dbPassword === v_pwd) {
        res.send('Login successful');
      } else {
        res.send('Incorrect password');
      }
    } else {
      res.send('User not found');
    }
  });
});

app.post("/email_send", (req, res) => {
  const { name, email, uname, password, mob_no } = req.body;
  console.log({ name, email, uname, password, mob_no });
  // Inserting into table
  const query1 = "INSERT INTO user_details (full_name, email, mobile_no, uname, pass) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, mob_no, uname, password];
  console.log(email);
  connection.query(query1, values, (error, results, fields) => {
    if (error) throw error;
    console.log('Results:', results);
  });

  res.set("content-type", "text/html");
  
  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jeelbpala0125@gmail.com',
      pass: 'jcvnlaqxaowruewk'
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'jeelbpala0125@gmail.com',
    to: email,
    subject: 'OTP for Logging in Share_spot',
    text: `YOUR OTP : ${otp}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  // res.redirect("/otp"); // Redirect to the OTP page
});
console.log(staticpath)
app.get("/otp", (req, res) => {
  res.sendFile(path.join(staticpath, "html/otp.html")); // Serve the OTP page
});

app.post("/otp_verify", (req, res) => {
  const { otp1 } = req.body;
  console.log(otp1)
  if (otp1 == otp) {
    console.log("VERIFIED");
    res.redirect("/"); // Redirect to option.html after OTP verification
  } else {
    console.log("Wrong OTP");
    res.status(400).send('Wrong OTP'); // Send error response for wrong OTP
  }
});

// app.get("/home",(req,res)=>{
//   res.sendFile("../frontend/index.html")
// })
app.listen(7000, () => {
  console.log("Listening on port 7000");
});

// Close the connection when the app stops
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.stack);
    } else {
      console.log('Database connection closed');
    }
    process.exit();
  });
});