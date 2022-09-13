var express = require("express");
var router = express.Router();

const Joi = require("joi");

const albums = [
  { id: 1, name: "Album No. 1" },
  { id: 2, name: "Album No. 2" },
  { id: 3, name: "Album No. 3" },
  { id: 4, name: "Album No. 4" },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(albums);
});

router.get("/:id", function (req, res, next) {
  const album = albums.find((item) => item.id === parseInt(req.params.id));
  if (!album)
    return res.status(404).send("The album with the given id was not found.");
  res.send(album);
});

router.post("/:id/track/", function (req, res, next) {
  const { error } = validateAlbum(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const album = {
    id: albums.length + 1,
    name: req.body.name,
  };

  albums.push(album);
  res.send(album);
});

router.put("/:id", function (req, res, next) {
  const album = albums.find((item) => item.id === parseInt(req.params.id));
  if (!album)
    return res.status(404).send("The album with the given id was not found.");

  const { error } = validateAlbum(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  album.name = req.body.name;
  res.send(album);
});

function validateAlbum(album) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(album);
}

router.delete("/:id", function (req, res, next) {
  const album = albums.find((item) => item.id === parseInt(req.params.id));
  if (!album)
    return res.status(404).send("The album with the given id was not found.");

  const index = albums.indexOf(album);
  albums.splice(index, 1);

  res.status(204).send();
});

module.exports = router;

/*
-> GET /albums -> listado de albums
-> GET /albums/100 -> album con el id 100
-> POST /albums -> creando un nuevo album //body: {}
-> PUT /albums/100 -> actualizar album con id 100 //body {}
-> DELETE /albums/100 -> borrar el album con el id 100
*/
