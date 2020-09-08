module.exports = {
  users: async (root, params, context) => {
    const { req, validateToken, UserServices } = context;
    const token = req.header('auth-token');

    // const verifiedUser = validateToken(token);

    return await UserServices.getAll();
  },
  user: async (root, params, context) => {
    const { id } = params;
    const { UserServices } = context;
    return await UserServices.getById(id);
  }
};
