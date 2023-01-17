const User = require("../models/user.model");

exports.registerNewUser = async (req, res) => {
  try {
    const isUser = await User.find({ email: req.body.email });
    if (isUser.length >= 1) {
      return res.status(409).json({ message: "Atenção! E-mail em uso!" });
    }

    const newUser = new User(req.body);
    const user = await newUser.save();
    const token = await newUser.generateAuthToken();

    return res.status(201).json({ message: "Sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        error: "Erro! Verifique as suas credenciais!",
      });
    }
    const token = await user.generateAuthToken();
    return res.status(201).json({ message: "Sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};
