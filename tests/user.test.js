const { getFirstName, isValidPassword } = require('../src/utils/user')

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Zach Christy')

  expect(firstName).toBe('Zach')
})

test('Should reject password shorter than 8 characters', () => {
  const password = isValidPassword('1234567')

  expect(password).toBe(false)
})

test('Should reject password that contains word password', () => {
  const password = isValidPassword('HelloPassword123')

  expect(password).toBe(false)
})

test('Should validate password with valid password', () => {
  const password = isValidPassword('Blue12345!')

  expect(password).toBe(true)
})
