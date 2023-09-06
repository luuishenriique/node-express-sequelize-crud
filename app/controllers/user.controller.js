exports.allAccess = (req, res) => {
    res.status(200).send("Acesso Público.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Acesso de Usuário.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Acesso de Administrador.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Acesso de Moderador.");
  };