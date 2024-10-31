import NaoEncontrado from "../erros/naoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import {residentes} from "../models/index.js";

class ResidentesController {

    static async listarResidentes(req, res, next){
        try{
            let {limite = 5, pagina =1} = req.query;

            limite = parseInt(limite);
            pagina = parseInt(pagina);

            if(limite > 0 && pagina >0){
                const listaResidentes = await residentes.find()
                .skip((pagina-1)*limite)
                .limit(limite)
                
                res.status(200).json(listaResidentes); 
            }else{next (new RequisicaoIncorreta)}   
        }catch(erro){
            next(erro);
        }
    };

    static async cadastrarResidente(req, res, next){
        try{
            const novoResidente = await residentes.create(req.body);
            res.status(201).json({message:"Cadastro de residente criado com sucesso", residentes: novoResidente });
        }catch(erro){
            next(erro);
        }
    };


    static async listarResidentesPorId(req, res, next){
        try {
        const id = req.params.id;
        const residenteEncontrado = await residentes.findById(id);

        if(residenteEncontrado){
            res.status(200).send(residenteEncontrado);
        } else {
            next(new NaoEncontrado("ID DO RESIDENTE NÃO LOCALIZADO"));
        }
    } catch (erro){
        next(erro);
    }
    };

    static async atualizarResidentes(req, res, next){
        try{
            const id = req.params.id;
            const residenteEncontrado = await residentes.findByIdAndUpdate(id, req.body);
            
            if(residenteEncontrado){
                res.status(200).json({message: "Cadastro Atualizado"});
            } else {
                next(new NaoEncontrado("ID DO RESIDENTE NÃO LOCALIZADO"))
            }
        } catch(erro){
            next(erro);
        }
    };

    static async deletarResidentes(req, res, next){
        try{
            const id = req.params.id;
            const redisentesEncontrado = await residentes.findByIdAndDelete(id);

            if(redisentesEncontrado){
                res.status(204).json({message:"Cadastro deletado"})
            } else{
                next(new NaoEncontrado("ID DO RESIDENTE NÃO LOCALIZADO"))
            }
        } catch(erro){
            next(erro);
        }
    };

    static async listarResidentesPorFiltro(req, res, next){
        try{
            const {matricula, nome} = req.query;
            const busca = {};

            if(matricula)busca.matricula = {$regex:matricula, $options: "i"};
            if(nome)busca.nome = {$regex: nome, $options:"i"};

            const residentesPorMatricula = await residentes.find(busca)
            res.status(200).json(residentesPorMatricula)
        } catch(erro){
            next(erro);
        }
    };





}

export default ResidentesController;