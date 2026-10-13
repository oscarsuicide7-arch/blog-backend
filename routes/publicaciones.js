const express = require('express');
const Publicacion = require('../models/Publicacion');
const router = express.Router();

router.get('/', async (req, res) => {
  const publicaciones = await Publicacion.find()
    .select('titulo descripcionCorta imagenUrl')
    .sort({ createdAt: -1 });
  res.json(publicaciones);
});

router.get('/:id', async (req, res) => {
  const publicacion = await Publicacion.findById(req.params.id)
    .populate('autorId', 'correo')
    .populate('comentarios.usuarioId', 'correo');
  if (!publicacion) return res.status(404).json({ error: 'No encontrada' });
  res.json(publicacion);
});

router.post('/', async (req, res) => {
  try {
    const { titulo, descripcionCorta, cuerpo, autorId } = req.body;
    const publicacion = new Publicacion({ titulo, descripcionCorta, cuerpo, autorId });
    await publicacion.save();
    res.status(201).json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/comentarios', async (req, res) => {
  try {
    const { usuarioId, texto } = req.body;
    const publicacion = await Publicacion.findById(req.params.id);
    publicacion.comentarios.push({ usuarioId, texto });
    await publicacion.save();
    res.json(publicacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
