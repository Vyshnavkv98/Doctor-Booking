import * as  yup from "yup"

export const userLoginValidator= yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(6).max(16).required()

})