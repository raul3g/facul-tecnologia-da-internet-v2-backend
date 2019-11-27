import User from "../models/User";

class SessionController {
  async store(req, res) {
    let { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }
    let { id, name, admin } = user;
    return res.json({
      user: {
        id,
        admin,
        name,
        email
      },
      token: user.generateToken()
    });
  }
}

export default new SessionController();
