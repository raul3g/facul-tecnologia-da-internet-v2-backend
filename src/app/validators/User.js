import * as Yup from "yup";

export const UserStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      provider: Yup.boolean().notRequired(),
      name: Yup.string()
        .required()
        .min(4)
        .max(50),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const UserUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(4)
        .max(50),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      )
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", message: err.inner });
  }
};
