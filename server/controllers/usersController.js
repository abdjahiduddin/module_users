const findAll = async (req, res) => {
  try {
    const users = await req.context.models.users.findAll();
    return res.send(users);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
