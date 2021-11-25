const usersService = require('../services/users');
const security = require('../middlewares/tokenSecurity');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await usersService.existEmailUser(email);
    if (!existingUser)
      return res
        .status(400)
        .json({ success: false, message: 'email dont exist' });

    const match = await security.comparePasswords(
      password,
      existingUser.dataValues.password
    );

    if (match) {
      const { id, firstName, lastName, email, roleId } =
        existingUser.dataValues;
      const user = { id, firstName, lastName, email, roleId };
      const token = security.generateToken(existingUser.dataValues);
      res.status(200).json({
        accessToken: token,
        user
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'invalid password or user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error - authController' });
  }
};

module.exports = { login };
