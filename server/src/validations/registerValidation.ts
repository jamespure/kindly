import Joi from "joi";

type User = {
  username: string;
  email: string;
  password: string;
};

const registerValidation = (data: User) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(6).email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

export default registerValidation;
