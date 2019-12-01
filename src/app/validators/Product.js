import * as Yup from "yup";

export const ProductStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(6),
      description: Yup.string()
        .required()
        .min(10),
      price: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", message: err.inner });
  }
};

export const ProductUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().min(6),
      description: Yup.string().min(10),
      price: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", message: err.inner });
  }
};
