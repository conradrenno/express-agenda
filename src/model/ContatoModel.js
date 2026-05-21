const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
    createdAt: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body, owner) {
    this.body = body;
    this.owner = owner;
    this.errors = [];
    this.contato = null;
}


Contato.prototype.register = async function () {
    this.valida();
    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create({ ...this.body, owner: this.owner });
};

Contato.prototype.valida = function () {
    this.cleanUp();
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
    if (this.body.name.length === 0) this.errors.push('O nome é obrigatório');
    if (!this.body.email && !this.body.phone) this.errors.push('Pelo menos um contato precisa ser enviado: email ou telefone');

};

Contato.prototype.cleanUp = function () {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        name: this.body.name,
        lastname: this.body.lastname,
        email: this.body.email,
        phone: this.body.phone
    };
};

Contato.prototype.edit = async function (id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

//Métodos estáticos
Contato.findByIdAndOwner = async function (id, ownerId) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOne({ _id: id, owner: ownerId });
    return contato;
};

Contato.findContatos = async function () {
    const contatos = await ContatoModel.find()
        .sort({ createdAt: -1 });
    return contatos;
};

Contato.findContatosByOwner = async function (ownerId) {
    if (typeof ownerId !== 'string') return [];
    return await ContatoModel.find({ owner: ownerId }).sort({ createdAt: -1 });
};

Contato.delete = async function (id) {
    if (typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({ _id: id });
    return contato;
};

module.exports = Contato;