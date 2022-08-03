const findAll = async (req, res) => {
  try {
    const phoneNumberType =
      await req.context.models.phone_number_type.findAll();
    return res.send(phoneNumberType);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export default {
  findAll,
};
