module.exports = {
  users: async (root, params, context) => {
    const { token, services, validateToken } = context;

    const verifiedUser = validateToken(token);

    return await services.UserServices.getAll();
  },
  user: async (root, { id }, { services }) => await services.UserServices.getById(id)
};
