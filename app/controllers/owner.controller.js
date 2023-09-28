const db = require("../models");
const Owner = db.owners;
const Items = db.items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "O conteúdo não pode ser vazio!"
        });
        return;
    }

    const owner = {
        name: req.body.name,
        address: req.body.address,
        document_number: req.body.document_number,
        phone_number: req.body.phone_number 
    };

    Owner.create(owner)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao tentar criar o proprietário."
      });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Owner.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao tentar pesquisar os proprietários."
        });
      });
};

exports.findAllOwnersAndItems = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Owner.findAll({ 
    include: 'items'
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao tentar pesquisar os proprietários."
      });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Owner.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Não foi possível encontrar o proprietário com o id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Algum erro ocorreu ao tentar encontrar o proprietário com o id=" + id
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Owner.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "O proprietário foi atualizado."
          });
        } else {
          res.send({
            message: `Não foi possivel atualizar o proprietário com o id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Algum erro ocorreu ao tentar atualizar o proprietário com o id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Owner.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "O proprietário foi apagado com sucesso."
          });
        } else {
          res.send({
            message: `Não foi possivel apagar o proprietário com o id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Algum erro ocorreu ao tentar apagar o proprietário com o id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Owner.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Proprietários foram apagados com sucesso.` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Algum erro ocorreu ao tentar apagar todos os proprietários."
          });
        });
};
