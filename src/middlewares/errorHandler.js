export const errorHandler = (err, req, res, next) => {
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: err.name, message: err.message });
};
