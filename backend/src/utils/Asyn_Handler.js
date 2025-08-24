const Async_handler = (reqwst_handler) => {
 return (req, res, next) => {
  Promise.resolve(reqwst_handler(req, res, next)).catch((err) => {
   next(err);
  });
 };
};

export {Async_handler}
