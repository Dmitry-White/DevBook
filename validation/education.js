const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    // Validate School field
    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }

    // Validate Degree field
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }

    // Validate Field of Study field
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of Study field is required';
    }

    // Validate From date field
    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }     

    return {
        errors,
        isValid: isEmpty(errors)
    }
};