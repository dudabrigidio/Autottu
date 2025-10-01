import { CheckIn, CheckInErro } from "../model/CheckIn";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net/"
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
    (checkIn : CheckIn, callback : SalvarCkCallback ) : void => {
    apiBase.post( "api/Checkins", checkIn )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}


const checkInFetcherApagar =
    (id : string, callback : ApagarCkCallback ) : void => {
    apiBase.delete( `api/Checkins/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const checkInFetcherAtualizar =
    (id : string, checkIn : CheckIn, callback : AtualizarCkCallback ) : void => {
    console.log(id);
    apiBase.put( `api/Checkins/${id}`, checkIn )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const checkInFetcherLer = (callback : LerCkCallback) : void => { 
    apiBase.get("api/Checkins")
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