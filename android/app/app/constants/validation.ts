import * as yup from 'yup';
export const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email address is required')
         .email('Enter Valid Email address'),
    password: yup
    .string()
    .required('Please Enter your password')
    .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least 8 Characters, at least 1 special character, at least 1 numeric character and at least 1 Upper case letter."
    ),
    // password: yup
    // .string()
    // .min(8, `Must be at least 8 characters.`)
    // .required('Password is required')
    // .matches(/[a-z]/, 'Must Contain One characters')
    // .matches(/(?=.*[A-Z])/, 'Must contain One Uppercase')
    // .matches(/[0-9]/, 'Must Contain One Number')
    // .matches(/(?=.*[!@#$&*])/, 'Must Contain One  special case Character'),
        
});
export const passwordSchema = yup.object().shape({
    //oldPassword: yup.string().required('Old Password is required.'),
    password: yup.string().required('Password is required.').min(8, `Must be at least 8 characters.`),
    confirmPassword: yup.string()
        .required('Confirm Password is required.')
        .min(8, `Must be at least 8 characters.`)
        .oneOf(
            [yup.ref('password')],
            'Confirm Password does not match with Password',
        ),
});
export const Emailschema = yup.object().shape({
    email: yup
        .string()
        .required('Email address is required')
        .email('Enter Valid Email address'),


});
export const AddPaymentMethod = yup.object().shape({
    cardName: yup.string().required('Name of card required.'),
    cardNumbre: yup.string().required('Card number is required.').min(16, 'Must be at least 8 characters'),
    expiry: yup.number().required('Expiry number is required.'),
    cvv: yup.number().required('CVV number is required.'),
    Add1: yup.string().required('Address Line 1  is required.'),
    Add2: yup.string().required('Address Line 2  is required.'),
    city: yup.string().required('City is required.'),
    Zip: yup.number().required('Zip is required.'),
    contactNo: yup.number().required('contactNo is required.'),
    email: yup
        .string()
        .required('Email address is required.')
        .email('Enter Valid Email address.'),

})
export const ProfileSetting_validation = yup.object().shape({
    firstName: yup.string().required('First name is required.').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: yup.string().required('Last name is required.').matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    contactNo: yup.number().required('contactNo is required.'),
    email: yup
        .string()
        .required('Email address is required.')
        .email('Enter Valid Email address.'),
    dateOfBirth: yup.number().required('Birth-date is required.'),
    currentPassword: yup.string().required('Current password is required.').min(8, 'Must be at least 8 characters.'),
    newPassword: yup.string().required('Current password is required.').min(8, 'Must be at least 8 characters.'),

})
export const Address_Validation=yup.object().shape({
address1:yup.string().required('address line 1 is required'),
city:yup.string().required('must be select city name '),
state:yup.string().required('must be select state name '),
country:yup.string().required('must be select country name'),
saveLocation:yup.string().required('must be select address location')
})
export const zipCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;