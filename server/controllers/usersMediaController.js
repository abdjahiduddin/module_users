const findAll = async (req, res) => {
  try {
    const usersMedia = await req.context.models.users_media.findAll();
    return res.send(usersMedia);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
