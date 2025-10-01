import { Usuario, UsuarioErro, Login } from "../model/Usuario";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://autottu-api-app.azurewebsites.net/"
});


interface LogarCallback {
    (sucesso : boolean, mensagem : string, errosCampos : UsuarioErro, token?: string): void;
}

const loginFetcherLogar = 
    (usuario: Usuario, callback : LogarCallback) : void => {
        // Criando objeto Login com a estrutura exata que o backend espera
        const loginData: Login = {
            email: usuario.email,
            senha: usuario.senha
        };
        
        console.log("Dados de login enviados:", loginData);
        
        apiBase.post(`api/Usuarios/Login`, loginData)
        .then(( response : AxiosResponse<any, any>)=> {
            callback(true, response.data, {}, response.data.idToken)
        })
        .catch((erro : any)=> {

            const errorMessage = erro.response?.data?.error || erro.response?.data?.message || erro.message || "Erro desconhecido";
            callback(false, errorMessage, {}, undefined)
        })
    }

export {LogarCallback, loginFetcherLogar}