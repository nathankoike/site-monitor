const fs = require("fs");
const axios = require("axios");
const nodemailer = require("nodemailer");
const config = JSON.parse(fs.readFileSync("./config.json"));

const message =
  "The RegEx you defined has been matched on the desired site, and the program has now terminated.\n\nThank you for using Site Monitor!";

const regex = eval(config.regex);

// used to control the while loop in the main function
let loop = true;
let res = { data: "" };

async function notify() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.applicationEmail,
      pass: config.applicationPass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Site Monitor" <${config.applicationEmail}>`,
    to: `${config.targetEmail}`,
    subject: "Site Update Detected",
    text: message,
    html: `<p>${message}</p>`
  });

  console.log("Message sent: %s", info.messageId);
}

async function main() {
  while (loop) {
    await setTimeout(() => {
      if (res.data.match(regex)) {
        notify();
        loop = false;
      }

      console.log(i++);
    }, 1000);

    res = await axios.get(config.url);
  }
}

main();
