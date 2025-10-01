import { CheckIn, CheckInErro } from "../model/CheckIn";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net"
});

interface SalvarCkCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : CheckInErro) : void;
}

interface LerCkCallback { 
    (sucesso : boolean, mensagem : string, lista? : Array<CheckIn>) : void;
}

interface ApagarCkCallback { 
    (sucesso : boolean, mensagem : string) : void;
}

interface AtualizarCkCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : CheckInErro) : void;
}

const checkInFetcherSalvar =
    (CheckIn : CheckIn, callback : SalvarCkCallback ) : void => {
    apiBase.post( "/api/CheckIns", CheckIn )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}


const checkInFetcherApagar =
    (id : string, callback : ApagarCkCallback ) : void => {
    apiBase.delete( `/api/CheckIns/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const checkInFetcherAtualizar =
    (id : string, CheckIn : CheckIn, callback : AtualizarCkCallback ) : void => {
    apiBase.put( `/api/CheckIns/${id}`, CheckIn )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const checkInFetcherLer = (callback : LerCkCallback) : void => { 
    apiBase.get("/api/CheckIns")
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaCheckIns = [];
        for ( const chave in resposta.data ){  
            const objCheckIn : CheckIn = resposta.data[chave as keyof CheckIn];
            objCheckIn.id = chave;
            listaCheckIns.push( objCheckIn );
        }
        callback(true, `Foram lidos ${listaCheckIns.length} CheckIns`, listaCheckIns);
    })
    .catch((erro : any)=>callback(false, erro))
}

export {checkInFetcherSalvar, checkInFetcherLer, 
    checkInFetcherApagar, checkInFetcherAtualizar,
    SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback}; 