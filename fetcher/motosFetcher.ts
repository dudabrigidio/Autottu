import { Motos, MotosErro } from "../model/Motos";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net"
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
        apiBase.post( "/api/Motos", Motos )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
    }


const motoFetcherApagar =
    (id : string, callback: ApagarMotoCallback) : void => {
        apiBase.delete( `/api/Motos/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
    }

const motoFetcherAtualizar =
    (id : string, Motos: Motos, callback: AtualizarMotoCallback) : void => {
        apiBase.put( `/api/Motos/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
    }


const  motoFetcherLer = (callback : LerMotoCallback) : void => { 
    apiBase.get("/api/Motos")
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaMotos = [];
        for ( const chave in resposta.data ){  
            const objMotos : Motos = resposta.data[chave as keyof Motos];
            objMotos.id = chave;
            listaMotos.push( objMotos );
        }
        callback(true, `Foram lidos ${listaMotos.length} CheckIns`, listaMotos);
    })
    .catch((erro : any)=>callback(false, erro))
}


export {SalvarMotoCallback, ApagarMotoCallback, AtualizarMotoCallback, LerMotoCallback, motoFetcherApagar, motoFetcherAtualizar, motoFetcherLer, motoFetcherSalvar}