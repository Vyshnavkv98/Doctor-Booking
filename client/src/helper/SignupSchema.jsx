import * as Yup from "yup"

export const signUpSchema=Yup.object({
    firstname:Yup.string().min(3).max(15).required("Please enter your name"),
    email:Yup.string().email().required('Plaese enter your email id'),
    password:Yup.string().min(6).required('Plaese the password'),
    cpassword:Yup.string().required().oneOf([Yup.ref('password'),null],'password must match'),
    phonenumber:Yup.string().max(10).required('Please enter the phone number')


})