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
    usuario: Usuario, callback: SalvarUsuarioCallback): void => {
        console.log("=== POST USUARIO ===");
        console.log("Dados do usuário:", JSON.stringify(usuario, null, 2));
        console.log("URL:", "api/Usuarios");
        
    apiBase
        .post("api/Usuarios", usuario)
        .then(() => callback(true, ""))
        .catch((erro: any) => {
            console.error("Erro ao salvar usuário:", erro);
            const errorMessage = erro.response?.data?.message || 
                    erro.response?.data?.error || 
                    erro.message || 
                    "Erro interno do servidor";
            callback(false, errorMessage);
        });
    };

const usuarioFetcherApagar =
    (idUsuario : string, callback: ApagarUsuarioCallback) : void => {
        apiBase.delete( `api/Usuarios/${idUsuario}`)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao apagar usuário:", erro);
        const errorMessage = erro.response?.data?.message || 
            erro.response?.data?.error || 
            erro.message || 
            "Erro interno do servidor";
        callback(false, errorMessage);
    })
    }

const usuarioFetcherAtualizar =
    (idUsuario : string, usuario: Usuario, callback: AtualizarUsuarioCallback) : void => {
        console.log("=== PUT USUARIO ===");
        console.log("ID do usuário:", idUsuario);
        console.log("Dados do usuário:", JSON.stringify(usuario, null, 2));
        console.log("URL:", `api/Usuarios/${idUsuario}`);
        
        apiBase.put( `api/Usuarios/${idUsuario}`, usuario)
    .then(()=>callback(true, ""))
    .catch(( erro : any) => {
        console.error("Erro ao atualizar usuário:", erro);
        const errorMessage = erro.response?.data?.message || 
            erro.response?.data?.error || 
            erro.message || 
            "Erro interno do servidor";
        callback(false, errorMessage);
    })
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
    .catch((erro : any) => {
        console.error("Erro ao ler usuários:", erro);
        const errorMessage = erro.response?.data?.message || 
                erro.response?.data?.error || 
                erro.message || 
                "Erro interno do servidor";
        callback(false, errorMessage);
    })
}


export {SalvarUsuarioCallback, ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, usuarioFetcherApagar, usuarioFetcherAtualizar, usuarioFetcherLer, usuarioFetcherSalvar}