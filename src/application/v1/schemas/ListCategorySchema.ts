import Joi from 'joi';

const listCategorySchema = Joi.object().keys({
  name: Joi.string(),
  parentId: Joi.string().uuid().allow(null),
  active: Joi.boolean(),
});

export default listCategorySchema;
