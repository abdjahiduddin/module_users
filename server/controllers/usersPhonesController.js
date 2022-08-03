const findAll = async (req, res) => {
  try {
    const usersPhones = await req.context.models.users_phones.findAll();
    return res.send(usersPhones);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
