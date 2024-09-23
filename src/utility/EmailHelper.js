const nodemailer=require("nodemailer");


const EmailSend=async (EmailTo,EmailText,EmailSubject)=>{

          let transPorter = nodemailer.createTransport({
              host:"mail.teamrabbil.com",
              post:"25",
              secure:"false",
              auth:{user:"info@teamrabbil.com",pass:"~sR4[bhaC[Qs"},
              tls:{rejectUnauthorized:false}
          })

        let mailOption={
            from:'Mern Ecommerce Solution <info@teamrabbil.com>',
            to:EmailTo,
            subject:EmailSubject,
            text:EmailText
        }
        return await transPorter.sendMail(mailOption)

}

module.exports=EmailSend;