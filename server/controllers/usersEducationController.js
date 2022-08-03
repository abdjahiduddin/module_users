const findAll = async (req, res) => {
  try {
    const users_education = await req.context.models.users_education.findAll();
    return res.send(users_education);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
