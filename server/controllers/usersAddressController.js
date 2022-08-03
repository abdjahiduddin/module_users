const findAll = async (req, res) => {
  try {
    const usersAddress = await req.context.models.users_address.findAll();
    return res.send(usersAddress);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
