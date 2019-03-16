const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = (data) => {
  const errors = {};
  const copy = Object.assign({}, data);

  // Convert empty fields to an empty string so we can use validator functions
  copy.email = !isEmpty(copy.email) ? copy.email : '';
  copy.password = !isEmpty(copy.password) ? copy.password : '';
  // Email checks
  if (Validator.isEmpty(copy.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(copy.email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (Validator.isEmpty(copy.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
