import validator from "validator";
import normalizePhone from './normalizePhone'

const check = {
  required: value => value ? undefined : 'Required',
  minLength: min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined,
  maxLength: max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined,
  minValue: min => value => value && value < min ? `Must be at least ${min}` : undefined,
  maxValue: max => value => value && value > max ? `Must be no more than ${max}` : undefined,
  number: value => value && isNaN(Number(value)) ? 'Must be a number' : undefined,
  hasNum: value => value && !/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]/.test(value) ? "Password should contain at least one number" : undefined,
  hasSpecial: value => value && !/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(value) ? "Password should contain at least one special character" : undefined,
  email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined,
  tooOld: value => value && value > 65 ? 'You might be too old for this' : undefined,
  isEmail: value => value && validator.isEmail(value) ? undefined : 'Invalid email address',
  isPhone: value => value && validator.isMobilePhone(value, 'en-US') ? undefined : 'Enter a valid phone number',
  isMongoId: value => value && validator.isMongoId(value) ? undefined : 'Invalid MongoDB ID',
  isPostalCode: value => value && validator.isPostalCode(value) ? undefined : 'Invalid postal code',
  isPureNum: value => value && validator.isNumeric(value, { no_symbols: true }) ? undefined : 'Use only numbers',
  isNum: value => value && validator.isNumeric(value) ? undefined : 'Use only numbers',
  escape: input => input && validator.escape(input),
  unescape: input => input && validator.unescape(input),
  toDate: input => input && validator.toDate(input),
  toBoolean: input => input && validator.toBoolean(input),
  normalizeEmail: email => email && validator.normalizeEmail(email),
  normalizePhone: phone => phone && normalizePhone(),
  trim: value => value && value.trim(),
  normName: value => value && value.toUpperCase().slice(0,1) + value.toLowerCase().slice(1),
  is18: (day, month, year) => new Date(year+18, month-1, day) <= new Date() ? undefined : 'You must be at least 18 years old',
  is21: (day, month, year) => new Date(year+21, month-1, day) <= new Date() ? undefined : 'You must be at least 21 years old',
};

export default check;