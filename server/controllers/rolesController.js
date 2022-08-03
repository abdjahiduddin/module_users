const findAll = async (req, res) => {
  try {
    const roles = await req.context.models.roles.findAll();
    return res.send(roles);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
