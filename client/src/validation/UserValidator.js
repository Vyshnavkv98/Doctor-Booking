import * as  yup from "yup"

export const userLoginValidator= yup.object({
    email:yup.string().email().required('Please enter correct email id'),
    password:yup.string().min(6).max(16).required('enter the password')

})