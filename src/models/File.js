//importar o mongoose
const mongoose = require('mongoose');

//schema da pasta onde sera salvo os arquivos
const File = new mongoose.Schema({
    //quis campos eu vou armazenar
    //titulo sempre obrigatorio
    title: {
        type: String,
        required: true
    },
    //campo path arquivo fisico armazenado
    path: {
        type: String,
        required: true
    },
    //lista de arquivos
    files: []
},{
    //cria datas de create e update dentro do registro
    timestamps: true,
    //toda vez q for convertido em json ou object 
    //ele carrega a url
    toObject: {virtuals: true},
    toJSON: {virtuals: true}

});

//campo virtual nao existe na tabela (mongodb)
//porem existe no codigo
//o campo chama url onde estou passando o caminho do arquivo
File.virtual('url').get(function() {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);