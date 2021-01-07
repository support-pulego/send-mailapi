var nodemailer = require('nodemailer');
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//start app 
const port = process.env.PORT || 8081;

app.post('/signup', async (req, res) => {

    var transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.googlemail.com",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: "support@pulego.co.za",
            pass: "Pu13g0T3ch#"
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Support" <support@bbbee>',
        to: 'sibusiso@pulego.co.za',
        subject: 'Hello ✔',
        text: 'Tsheko Testing',
        html: '<b>Hello Everything</b>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

        //send response
        res.send({
            status: true,
            message: 'Message sent: ' + info.response
        });
    });

});

app.post("/send-email", async (req, res) => {

    var transporter = nodemailer.createTransport({
        pool: true,
        host: "smtp.googlemail.com",
        port: 465,
        secure: true, //use TLS
        auth: {
            user: "support@pulego.co.za",
            pass: "Pu13g0T3ch#"
        }
    });
    var body = req.body;

    var mailOptions = {
        from: '"support" <support@bbbee>',
        to: body.to,
        subject: body.subject,
        html: body.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }

        res.send({
            message: "success",
            status: true
        });
    });

});

app.listen(port, () =>
    console.log(`Send mail API listening on port ${port}`));
