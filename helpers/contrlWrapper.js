const contrWrapper = (contrller) => {
  const func = async (req, res, next) => {
    try {
      await contrller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default contrWrapper;
