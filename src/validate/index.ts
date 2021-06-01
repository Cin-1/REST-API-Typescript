import Joi from "joi";

const emailvalid = Joi.object().keys({
  email: Joi.string().email().required().label("Email"),
});

module.exports = {
  emailvalid,
};
