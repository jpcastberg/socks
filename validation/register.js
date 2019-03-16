const validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = (data) => {
  const errors = {};
  const copy = Object.assign({}, data);

  // Convert empty fields to an empty string so we can use validator functions
  copy.name = !isEmpty(copy.name) ? copy.name : '';
  copy.email = !isEmpty(copy.email) ? copy.email : '';
  copy.password = !isEmpty(copy.password) ? copy.password : '';
  copy.password2 = !isEmpty(copy.password2) ? copy.password2 : '';

  // Name checks
  if (validator.isEmpty(copy.name)) {
    errors.name = 'Name field is required';
  }
  // Email checks
  if (validator.isEmpty(copy.email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(copy.email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (validator.isEmpty(copy.password)) {
    errors.password = 'Password field is required';
  }
  if (validator.isEmpty(copy.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  if (!validator.isLength(copy.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!validator.equals(copy.password, copy.password2)) {
    errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
