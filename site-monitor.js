const fs = require("fs");
const axios = require("axios");
const nodemailer = require("nodemailer");
const readlineSync = require("readline-sync");
const config = JSON.parse(fs.readFileSync("./config.json"));

const email = config.email;
const pass = readlineSync.question(`Enter the password for ${email}: `, {
  hideEchoBack: true
});

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "nkoike1998@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

console.log(pass);

// main();
