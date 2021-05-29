import bcrypt from 'bcryptjs'

const users = [
  {
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports = Object.freeze({
  users: users
});

