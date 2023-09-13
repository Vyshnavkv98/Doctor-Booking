import * as Yup from "yup"

export const signUpSchema=Yup.object({
    firstname:Yup.string().matches(/^[A-Za-z]+$/, 'First name should only contain alphabetic characters').min(3).max(15).required("Please enter your name"),
    email:Yup.string().email().required('Plaese enter your email id'),
    password:Yup.string().min(6).required('Plaese the password'),
    cpassword:Yup.string().required().oneOf([Yup.ref('password'),null],'password must match').required('Re-enter the password'),
    phonenumber:Yup.string().max(10).required('Please enter the phone number')


})

export const doctorVerifySchema=Yup.object({
    firstName:Yup.string().min(3).max(15).required("Please enter your name"),
    specialization:Yup.string().required('Please select your specialization'),
    gender:Yup.string().required(),
    city:Yup.string().required('Please select your city'),
    registerNumber:Yup.string().required('Please enter the register number'),
    registrationCouncil:Yup.string().required('Please select the reg council'),
    RegisterFee:Yup.string().required('Please select registration fee'),
    registrationYear:Yup.string().required('Please select registration year').test('valid-year-range', 'Year must be between 1950 and 2022', value => {
        return value >= 1950 && value <= 2022;
      })
    // docs:Yup.string().required("You need to provide a file")
})

export const addDepartmentSchema=Yup.object({
    departmentName:Yup.string().required('Please enter department name.'),
    departmentHead:Yup.string().required('Please enter department head.'),
    status:Yup.string().required('Please select the status'),

})

export const userEditSchema=Yup.object({
    firstName:Yup.string().matches(/^[A-Za-z]+$/, 'First name should only contain alphabetic characters').required('Enter your First name'),
    address:Yup.string().required('Enter your address'),
    city:Yup.string().required('Enter your city'),
    phoneNumber:Yup.string().max(10).required('Please enter your phone number'),
    bloodGroup:Yup.string().required('Enter your blood group'),
    district:Yup.string().required('Enter your district'),
    gender:Yup.string().required('Please select your gender'),

})