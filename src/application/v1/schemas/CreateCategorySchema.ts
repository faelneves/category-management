import Joi from 'joi';

const createCategorySchema = Joi.object().keys({
  name: Joi.string().required(),
  parentId: Joi.string().uuid(),
  active: Joi.boolean(),
});

export default createCategorySchema;
