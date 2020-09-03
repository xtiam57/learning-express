const validate = (SchemaValidation, data) => {
  const { error } = SchemaValidation.validate(data);

  if (!error) {
    return;
  }

  const { details } = error;
  const [detail] = details;
  return detail.message;
};

module.exports = validate;
