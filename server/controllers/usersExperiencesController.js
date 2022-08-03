const findAll = async (req, res) => {
  try {
    const usersExperiences =
      await req.context.models.users_experiences.findAll();
    return res.send(usersExperiences);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
