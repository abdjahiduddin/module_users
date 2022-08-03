const findAll = async (req, res) => {
  try {
    const entity = await req.context.models.entity.findAll();
    return res.send(entity);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
