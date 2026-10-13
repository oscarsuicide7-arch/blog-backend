const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  texto: String,
  fecha: { type: Date, default: Date.now }
});

const publicacionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcionCorta: { type: String, required: true },
  cuerpo: { type: String, required: true },
  imagenUrl: String,
  autorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  comentarios: [comentarioSchema]
}, { timestamps: true });

module.exports = mongoose.model('Publicacion', publicacionSchema);
