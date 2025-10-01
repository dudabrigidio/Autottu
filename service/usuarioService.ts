import { Usuario, UsuarioErro, usuarioSchema } from "../model/Usuario";
import {SalvarUsuarioCallback, ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, usuarioFetcherApagar, usuarioFetcherAtualizar, usuarioFetcherLer, usuarioFetcherSalvar} from "../fetcher/usuarioFetcher";
import { ValidationError } from "yup";

const usuarioServiceSalvar = 
    ( usuario: Usuario, callback : SalvarUsuarioCallback, token?: string) : void => {
        usuarioSchema.validate (usuario, {abortEarly: false})
        .then(()=>{
            usuarioFetcherSalvar( usuario, callback, token);
        })
        .catch((errors : ValidationError)=> {
            const usuarioErros: UsuarioErro = {}
            if (errors.inner && errors.inner.length > 0) {
                errors.inner.forEach((err: ValidationError) => {
                    if (err.path) {
                    usuarioErros[err.path as keyof UsuarioErro] = err.message;
                    } 
                });
            }
            else if (errors.path) {
                usuarioErros[errors.path as keyof UsuarioErro] = errors.message;
            }
            callback(false, errors.message, usuarioErros);
        })
    }

const usuarioServiceLer = 
    (callback: LerUsuarioCallback) : void => {
        usuarioFetcherLer(callback);
    }

const usuarioServiceApagar = 
    (id: string, callback: ApagarUsuarioCallback) : void => {
        usuarioFetcherApagar(id, callback);
    }

const usuarioServiceAtualizar = 
    (id: string, usuario: Usuario, callback: AtualizarUsuarioCallback) : void => {
        usuarioSchema.validate (usuario, {abortEarly: false})
        .then(()=>{
            usuarioFetcherAtualizar(id, usuario, callback);
        })
        .catch((errors :ValidationError)=>{
            const usuarioErros: UsuarioErro = {}
            errors.inner.forEach( (err: ValidationError) => {
                usuarioErros[err.path as keyof typeof usuarioErros] = err.message;
            });
            callback(false, errors.message, usuarioErros);
        })
    }

    export{ usuarioServiceSalvar, usuarioServiceLer, usuarioServiceAtualizar, usuarioServiceApagar};