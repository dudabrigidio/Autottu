import { Usuario, UsuarioErro } from "../model/Usuario";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net"
});


interface LogarCallback {
    (sucesso : boolean, mensagem : string, errosCampos : UsuarioErro, token?: string): void;
}

const loginFetcherLogar = 
    (usuario: Usuario, callback : LogarCallback) : void => {
        const objUsuario = { email: usuario.email, password: usuario.senha, returnSecretToken: true}
        apiBase.post(`/api/Login`, objUsuario)
        .then(( response : AxiosResponse<any, any>)=> {
            callback(true, "", {}, response.data.idToken)
        })
        .catch((erro : any)=> {
            callback(false, erro[0], {}, undefined)
        })
    }

export {LogarCallback, loginFetcherLogar}