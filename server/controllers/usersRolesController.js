const findAll = async (req, res) => {
  try {
    const usersRoles = await req.context.models.users_roles.findAll();
    return res.send(usersRoles);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
