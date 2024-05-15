import User from '@/models/user.models';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any) => {
    try {

        const hashToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(
                userId,
                {
                    $set:{
                        verifyToken:hashToken,
                        verifyTokenExpiry: Date.now()+3600000
                    }
                }
            )
        } else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(
                userId,
                {
                    $set:{
                        forgotPasswordToken:hashToken,
                        forgotPasswordTokenExpiry: Date.now()+3600000
                    }
                }
            )
        }
         
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c1d1be8a151f3d",
              pass: "1b1904b391cdc3"
            }
        });

        const mailOptions = {
            from: 'www.aditya117@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}