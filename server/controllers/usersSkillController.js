const findAll = async (req, res) => {
  try {
    const usersSkill = await req.context.models.users_skill.findAll();
    return res.send(usersSkill);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
