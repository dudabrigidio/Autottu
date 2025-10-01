import { Motos, MotosErro, motoSchema } from "../model/Motos";
import { SalvarMotoCallback, ApagarMotoCallback, AtualizarMotoCallback, LerMotoCallback, motoFetcherApagar, motoFetcherAtualizar, motoFetcherLer, motoFetcherSalvar} from "../fetcher/motosFetcher";
import { ValidationError } from "yup";

const motoServiceSalvar = 
    ( motos: Motos, callback : SalvarMotoCallback) : void => {
        motoSchema.validate (motos, {abortEarly: false})
        .then(()=>{
            motoFetcherSalvar( motos, callback);
        })
        .catch((errors : ValidationError)=> {
            const motosErros: MotosErro = {}
            errors.inner.forEach((err: ValidationError) => {
                motosErros[err.path as keyof typeof motosErros] = err.message;
            });
            callback(false, errors.message, motosErros);
        })
    }

const motoServiceLer = 
    (callback: LerMotoCallback) : void => {
        motoFetcherLer(callback);
    }

const motoServiceApagar = 
    (id: string, callback: ApagarMotoCallback) : void => {
        motoFetcherApagar(id, callback);
    }

const motoServiceAtualizar = 
    (id: string, motos: Motos, callback: AtualizarMotoCallback) : void => {
        motoSchema.validate (motos, {abortEarly: false})
        .then(()=>{
            motoFetcherAtualizar(id, motos, callback);
        })
        .catch((errors :ValidationError)=>{
            const motosErros: MotosErro = {}
            errors.inner.forEach( (err: ValidationError) => {
                motosErros[err.path as keyof typeof motosErros] = err.message;
            });
            callback(false, errors.message, motosErros);
        })
    }

    export{ motoServiceSalvar, motoServiceLer, motoServiceAtualizar, motoServiceApagar};