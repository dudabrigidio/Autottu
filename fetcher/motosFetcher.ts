import { Motos, MotosErro } from "../model/Motos";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net/"
});

interface SalvarMotoCallback {
    (sucesso: boolean, mensagem: string, errosCampos?: MotosErro) : void;
}

interface LerMotoCallback {
    (sucesso: boolean, mensagem: string, lista ?: Array<Motos>) : void;
}

interface ApagarMotoCallback {
    (sucesso: boolean, mensagem: string) : void;
}

interface AtualizarMotoCallback {
    (sucesso: boolean, mensagem: string, errosCampos?: MotosErro) : void;
}

const motoFetcherSalvar =
    (Motos : Motos, callback: SalvarMotoCallback) : void => {
        apiBase.post( "api/Motos", Motos )
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao salvar moto:", erro);
        console.error("Erro ao salvar moto:", erro);
        const errorMessage = erro.response?.data?.message || 
            erro.response?.data?.error || 
            erro.message || 
            "Erro interno do servidor";
        callback(false, errorMessage);
        callback(false, errorMessage);
    })
    }


const motoFetcherApagar =
    (id : string, callback: ApagarMotoCallback) : void => {
        apiBase.delete( `api/Motos/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao apagar moto:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }

const motoFetcherAtualizar =
    (id : string, motos: Motos, callback: AtualizarMotoCallback) : void => {
        apiBase.put( `api/Motos/${id}`, motos)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao atualizar moto:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }


const  motoFetcherLer = (callback : LerMotoCallback) : void => { 
    apiBase.get("api/Motos")
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaMotos = [];
        for ( const chave in resposta.data ){  
            const objMotos : Motos = resposta.data[chave as keyof Motos];
            console.log(objMotos);
            objMotos.id = chave;
            listaMotos.push( objMotos );
        }
        callback(true, `Foram lidos ${listaMotos.length} Motos`, listaMotos);
    })
    .catch((erro : any) => {
        console.error("Erro ao ler motos:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
}


export {SalvarMotoCallback, ApagarMotoCallback, AtualizarMotoCallback, LerMotoCallback, motoFetcherApagar, motoFetcherAtualizar, motoFetcherLer, motoFetcherSalvar}