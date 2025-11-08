import { CheckIn, CheckInErro, checkinSchema } from "../model/CheckIn";
import { checkInFetcherSalvar, checkInFetcherLer, 
    checkInFetcherApagar, checkInFetcherAtualizar,
    SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback} from "../fetcher/checkinFetcher";
import { ValidationError } from "yup";

const checkInServiceSalvar = 
    ( checkIn: CheckIn, callback : SalvarCkCallback) : void => {
        checkinSchema.validate (checkIn, {abortEarly: false})
        .then(()=>{
            checkInFetcherSalvar( checkIn, callback);
        })
        .catch((errors : ValidationError)=> {
            const checkinErros: CheckInErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                        checkinErros[err.path as keyof CheckInErro] = err.message;
                    }
                });
            }
            else if (errors.path) {
                checkinErros[errors.path as keyof CheckInErro] = errors.message;
            }
            callback(false, errors.message, checkinErros);
        })
    }

const checkInServiceLer = 
    (callback: LerCkCallback) : void => {
        checkInFetcherLer(callback);
    }

const checkInServiceApagar = 
    (id: string, callback: ApagarCkCallback) : void => {
        checkInFetcherApagar(id, callback);
    }

const checkInServiceAtualizar = 
    (id: string, checkIn: CheckIn, callback: AtualizarCkCallback) : void => {
        checkinSchema.validate (checkIn, {abortEarly: false})
        .then(()=>{
            checkInFetcherAtualizar(id, checkIn, callback);
        })
        .catch((errors :ValidationError)=>{
            const checkinErros: CheckInErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                        checkinErros[err.path as keyof CheckInErro] = err.message;
                    }
                });
            }
            else if (errors.path) {
                checkinErros[errors.path as keyof CheckInErro] = errors.message;
            }
            callback(false, errors.message, checkinErros);
        })
    }

    export{ checkInServiceSalvar, checkInServiceLer, checkInServiceAtualizar, checkInServiceApagar}