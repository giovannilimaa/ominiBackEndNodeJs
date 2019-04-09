//importar o mongoose
const mongoose = require('mongoose');

//schema da pasta onde sera salvo os arquivos
const Box = new mongoose.Schema({
    //quis campos eu vou armazenar
    //titulo sempre obrigatorio
    title: {
        type: String,
        required: true
    },
    //lista de arquivos
    //vai armazenar os ids referentes os arquivos FILES --relacionamento com o outro schema
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File"}]
},{
    //cria datas de create e update dentro do registro
    timestamps: true
});

module.exports = mongoose.model("Box", Box);