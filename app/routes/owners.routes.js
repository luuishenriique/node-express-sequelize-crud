module.exports = app => {
  const owners = require("../controllers/owner.controller");

  var router = require("express").Router();

  router.post("/", owners.create);

  // router.get("/", owners.findAll);

  router.get("/:id", owners.findOne);

  router.get("/", owners.findAllOwnersAndItems);
  
  router.put("/:id", owners.update);

  router.delete("/:id", owners.delete);

  router.delete("/", owners.deleteAll);

  app.use('/api/owners', router);
};