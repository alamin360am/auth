import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplates.js";
// import { mailtrapClient, sender } from "./mailtrap.config.js";

import dotenv from "dotenv"

import Mailjet from "node-mailjet";

dotenv.config();
// import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';

// export const sendVerificationEmail = async(email, verificationToken) =>{
//     const recipient = [{email}];

//     try {
//         const respond = await mailtrapClient.send({
//             from: sender,
//             to: recipient,
//             subject: "Verify your email",
//             html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//             category: "Email Verification"
//         });

//         console.log("email send successful", respond);
        
//     } catch (error) {
//         console.error(error);

//         throw new Error("Error sending verification email:" , error);
        
        
//     }
// }

const mailjet = Mailjet.apiConnect(
    process.env.MJ_API, 
    process.env.MJ_SECRET
);

export const sendVerificationEmail = async(email, verificationToken) =>{
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "alaminrahmatullah567@gmail.com",
                        Name: ""
                    },
                    To: [
                        {
                            Email: email,
                            Name: "Recipient Name"
                        }
                    ],
                    Subject: "Verify Your Email",
                    TextPart: "text",
                    HTMLPart: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                }
            ]
        });

    try {
        const result = await request;
        console.log('Email sent successfully');
        
        // res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        // res.status(500).send('Error sending email');
    }

}

export const sendResetEmail = async(res, email, url) =>{
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "alaminrahmatullah567@gmail.com",
                        Name: "Al Amin"
                    },
                    To: [
                        {
                            Email: email,
                            Name: "Recipient Name"
                        }
                    ],
                    Subject: "Reset Your Password",
                    TextPart: "text",
                    HTMLPart: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
                }
            ]
        });

    try {
        const result = await request;
        console.log('Email sent successfully');
        
        res.status(200).send({success: true, message:'Email sent successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({success: false, message:'Error sending email'});
    }

}

