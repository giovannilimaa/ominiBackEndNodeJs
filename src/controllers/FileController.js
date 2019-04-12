//importar o model de file
const File = require('../models/File');
//importar o model de box
const Box = require('../models/Box');

//CLASSE DA CONTROLLER
class FileController {
    //criar novas pastas
    async store(req, res){
        //pegar a box do banco de dados
        const box = await Box.findById(req.params.id);
        
        //criar um file
        const file = await File.create({
            //campos que o file recebe
            title: req.file.originalname,
            path: req.file.key,
        });

        //salvo no array por isso o push
        box.files.push(file);
        //salvo o box com await pois e async
        await box.save();

        //avisa os usuarios da box que houve um novo arquivo adicionado
        //realtime
        //pega todos os usuarios que estao na box com o _id enviado
        req.io.sockets.in(box._id).emit('file', file);

        //retornar o file que foi criado 
        return res.json(file);

        //criar um arquivo
        console.log(req.file);
    }
}
//retornar uma instancia da classe
module.exports = new FileController();