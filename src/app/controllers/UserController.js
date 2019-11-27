import User from "../models/User";

class UserController {
  async store(req, res) {
    const { provider, name, email, password } = req.body;
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "User already exists!" });
    }
    const user = await User.create({
      provider,
      name,
      email,
      password
    });
    return res.json(user);
  }

  async show(req, res) {
    let id = parseInt(req.params.id);
    if (id !== req.userId) {
      return res.status(401).json({ error: "You not permission" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    return res.json(user);
  }
  async update(req, res) {
    let id = parseInt(req.params.id);

    if (id !== req.userId) {
      return res.status(401).json({ error: "You not permission" });
    }

    let { name, email, oldPassword, password } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && (await User.findOne({ where: { email } }))) {
      return res.status(400).json({ error: "User already exist" });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).send({ error: "Password does not match" });
    }

    await user.update({
      name,
      email,
      password
    });

    return res.json(user);
  }
}

export default new UserController();
