//importar multer
const multer = require('multer');
//importar o path que eh o destino dos arquivos
const path = require('path');
//gerar hash ou caracteres unicos
const crypto = require('crypto')

//exportar um objeto de config do multer
module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        //prop obrigatorias
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if (err) cb(err);

                ///USA O HASH ALEATORIO + O NOME ORIGINAL
                //EXEMPLO: 8DS9AU-TESTE.JPG
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            })
        }
    })
}