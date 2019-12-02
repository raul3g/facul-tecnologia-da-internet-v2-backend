import * as Yup from "yup";

export const StockStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      amount: Yup.number()
        .positive()
        .notRequired()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", message: err.inner });
  }
};
export const StockUpdate = async (req, res, next) => {
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
