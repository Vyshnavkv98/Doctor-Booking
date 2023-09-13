import * as Yup from 'yup'
export const AppointmentSchema=Yup.object({
    name:Yup.string().matches(/^[A-Za-z\s]*$/, 'First name should only contain alphabetic characters').required('Please enter the name'),
    mobile:Yup.string().min(10).max(10).required('Please enter the mobile number'),
    email:Yup.string().email().required('Enter your email id'),
    reason:Yup.string().required('Please fill out this field'),
    consultaionFee:Yup.string()
})