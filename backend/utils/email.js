import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yosmelkam@gmail.com',
    pass: 'yosef123isrumelkamu'
  }
});

const sendEmail = (to) => {
    console.log(to)
    let mailOptions = {
      from: '"Rental Management System" <imo60067035@gmail.com>', // Sender address
      to, 
      subject: 'Change password',
      text: 'Hello world?',
      html: '<b>Hello world?</b>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error:', error);
      }
      console.log('Message sent:', info);
    });
}
export default sendEmail;
