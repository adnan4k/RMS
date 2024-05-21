export const validateForm = (formData, notRequired) => {
    let errors = {};
    Object.keys(formData).forEach((key) => {
        if (notRequired.includes(key))
            return
        if (formData[key] === '')
            errors[key] = 'This field is required!'
    });

    if (! /^(9|7)\d{8}$/.test(formData.phonenumber))
        errors.phonenumber = "Wrong phone number format start";
    if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errors.email = "Wrong email format";
    return errors    
}