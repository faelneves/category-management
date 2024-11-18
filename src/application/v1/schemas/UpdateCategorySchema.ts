import Joi from 'joi';

const updateCategorySchema = Joi.object().keys({
  name: Joi.string(),
  active: Joi.boolean(),
});

export default updateCategorySchema;
