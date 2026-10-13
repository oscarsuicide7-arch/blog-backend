const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
}, { timestamps: true });

usuarioSchema.pre('save', async function() {
  if (!this.isModified('contrasena')) return;
  this.contrasena = await bcrypt.hash(this.contrasena, 10);
});
module.exports = mongoose.model('Usuario', usuarioSchema);