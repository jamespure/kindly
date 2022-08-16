import Joi from "joi";

type User = {
  email: string;
  password: string;
};

const loginValidation = (data: User) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

export default loginValidation;
