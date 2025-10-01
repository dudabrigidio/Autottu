import { Usuario, UsuarioErro } from "../model/Usuario";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net/"
});


interface SalvarUsuarioCallback {
    (sucesso: boolean, mensagem: string, errosCampos?: UsuarioErro) : void;
}

interface LerUsuarioCallback {
    (sucesso: boolean, mensagem: string, lista ?: Array<Usuario>) : void;
}

interface ApagarUsuarioCallback {
    (sucesso: boolean, mensagem: string) : void;
}

interface AtualizarUsuarioCallback {
    (sucesso: boolean, mensagem: string, errosCampos?: UsuarioErro) : void;
}


const usuarioFetcherSalvar = (
    usuario: Usuario, callback: SalvarUsuarioCallback, token?: string): void => {
        console.log(usuario);
    apiBase
        .post("api/Usuarios", usuario)
        .then(() => callback(true, ""))
        .catch((erro: any) => callback(false, erro));
    };

const usuarioFetcherApagar =
    (id : string, callback: ApagarUsuarioCallback) : void => {
        apiBase.delete( `api/Usuarios/${id}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
    }

const usuarioFetcherAtualizar =
    (id : string, usuario: Usuario, callback: AtualizarUsuarioCallback) : void => {
        apiBase.put( `api/Usuarios/${id}`, usuario)
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
    }


const  usuarioFetcherLer = (callback : LerUsuarioCallback) : void => { 
    apiBase.get("api/Usuarios")
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaUsuario = [];
        for ( const chave in resposta.data ){  
            const objMotos : Usuario = resposta.data[chave as keyof Usuario];
            objMotos.id = chave;
            listaUsuario.push( objMotos );
        }
        callback(true, `Foram lidos ${listaUsuario.length} Usuarios`, listaUsuario);
    })
    .catch((erro : any)=>callback(false, erro))
}


export {SalvarUsuarioCallback, ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, usuarioFetcherApagar, usuarioFetcherAtualizar, usuarioFetcherLer, usuarioFetcherSalvar}