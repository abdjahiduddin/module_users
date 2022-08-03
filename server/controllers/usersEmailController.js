const findAll = async (req, res) => {
  try {
    const usersEmail = await req.context.models.users_email.findAll();
    return res.send(usersEmail);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
