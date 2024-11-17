import Joi from 'joi';

const CategoryIdSchema = Joi.object().keys({
  id: Joi.string().uuid(),
});

export default CategoryIdSchema;
