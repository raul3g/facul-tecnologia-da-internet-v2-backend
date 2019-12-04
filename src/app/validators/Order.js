import * as Yup from "yup";

export const OrderStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      user_id: Yup.number()
        .positive()
        .required(),
      amount: Yup.number()
        .positive()
        .required()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", message: err.inner });
  }
};
export const OrderUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      amount: Yup.number()
        .positive()
        .required()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", message: err.inner });
  }
};
