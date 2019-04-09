//importar o model de box
const Box = require('../models/Box');

//CLASSE DA CONTROLLER
class BoxController {
    //criar novas pastas
    async store(req, res){
        //contem todo o corpo da requisicao
        //pegar o titulo da requisicao
        
        const box = await Box.create({
            title: req.body.title
        });

        return res.send(box);
    }
    async show (req, res){
        //buscar no model o arquivo q foi salvo pelo id 
        //que foi enviado no req
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {
                sort: {createdAt: -1}
            }
        });
        //retornar um json mostrando onde ele esta salvo
        return res.json(box);
    }
}
//retornar uma instancia da classe
module.exports = new BoxController();