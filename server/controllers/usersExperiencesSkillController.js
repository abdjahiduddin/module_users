const findAll = async (req, res) => {
  try {
    const userExperiencesSkill =
      await req.context.models.users_experiences_skill.findAll();
    return res.send(userExperiencesSkill);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
