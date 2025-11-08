import { useState } from "react";
import { Usuario, UsuarioErro } from "../model/Usuario";
import { usuarioServiceSalvar, usuarioServiceLer, usuarioServiceAtualizar, usuarioServiceApagar } from "../service/usuarioService";
import { useNavigation } from "@react-navigation/native";
import { ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, SalvarUsuarioCallback } from "../fetcher/usuarioFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { usePerfilControl } from "./perfilControl";
import { enviarNotificacaoLocal } from "../service/notificacaoService";

interface UsuarioControlHook {
    salvar : () => {};
    usuario : Usuario;
    setUsuario: ( usuario : Usuario) => {};
    handleUsuario :(txt: string, campo : string)=> {};
    mensagem :string;
}


const useUsuarioControl = () => {
    const [usuario, setUsuario] = useState<Usuario>({idUsuario: null, nome: "",senha: "",email: "",telefone: ""});
    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [usuarioLista, setUsuarioLista] = useState<Usuario[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const {token} = usePerfilControl();

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarUsuarioCallback : SalvarUsuarioCallback = 
    async (success : boolean, msg: string, errosCampos?: UsuarioErro ) => {
        if (success) {
            setMensagem("Usuario Cadastrado com sucesso");
            lerUsuario();
            navigation.navigate("Login");
            try {
                await enviarNotificacaoLocal(
                    "Usuario Cadastrado com sucesso! ",
                    `Usuario ${usuario.idUsuario} foi cadastrado com sucesso!`,
                );
            } catch (error) {
                console.error('Erro ao enviar notificação push:', error);
            }
        } else {
            setMensagem(msg);
            setUsuarioErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarUsuarioCallback  : AtualizarUsuarioCallback =
    async (success : boolean, msg: string, errosCampos ?: UsuarioErro) => {
        if (success) {
            setMensagem("Usuario Atualizado com sucesso");
            lerUsuario();
            try {
                await enviarNotificacaoLocal(
                    "Usuario Atualizado com sucesso! ",
                    `Atualização do usuario ${usuario.nome} foi realizada com sucesso!`,
                );
            } catch (error) {
                console.error('Erro ao enviar notificação push:', error);
            }
        } else {
            setMensagem(msg);
            setUsuarioErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerUsuarioCallback : LerUsuarioCallback =
    (success : boolean, msg : string, lista?: Array<Usuario>) => {
        setSucesso(success);
        setMensagem(msg);
        if (lista) {
            setUsuarioLista (lista);
            console.log("Lista =>", lista);
        }
        setLoading(false);
    }

    const apagarUsuarioCallback : ApagarUsuarioCallback =
    async (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Usuario apagado com sucesso");
            try {
                await enviarNotificacaoLocal(
                    "Usuario Apagado com sucesso! ",
                    `Usuario ${usuario.nome} foi apagado com sucesso!`,
                );
            } catch (error) {
                console.error('Erro ao enviar notificação push:', error);
            }
            lerUsuario();
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarUsuario = () => {
        setLoading(true);
        setUsuarioErro({});
        
        // Para POST (criação), remover o idUsuario completamente
        const { idUsuario, ...usuarioParaSalvar } = usuario;
        console.log("=== SALVAR USUARIO (POST) ===");
        console.log("Usuário original:", usuario);
        console.log("Usuário para salvar (sem idUsuario):", usuarioParaSalvar);
        
        usuarioServiceSalvar(usuarioParaSalvar, salvarUsuarioCallback, token);
    }

    const lerUsuario = () => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceLer(lerUsuarioCallback);
    }

    const apagarUsuario = (idUsuario: string) => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceApagar ( idUsuario, apagarUsuarioCallback);
    }

    const atualizarUsuario = (id : string) => {
        setUsuarioErro({});
        console.log(id);
        const usuariosFiltrados = usuarioLista.filter(
            (u: Usuario)=> u.idUsuario == Number(id)
        );
        if (usuariosFiltrados.length>0) {
            setUsuario(usuariosFiltrados[0]);
            console.log("Usuário selecionado para edição:", usuariosFiltrados[0]);
        }
    }

    const salvarAlteracaoUsuario = () => {
            setLoading(true);
            setUsuarioErro({});
            console.log("=== SALVAR ALTERAÇÃO USUARIO (PUT) ===");
            console.log("ID do usuário:", usuario.idUsuario);
            console.log("Dados completos do usuário:", usuario);
            usuarioServiceAtualizar(String(usuario.idUsuario), usuario, atualizarUsuarioCallback);
        }

    const handleUsuario = (txt: string, campo: string) => {
        const obj = {...usuario};
        if (campo === "idUsuario") {
            // Se o campo estiver vazio, define como null
            if (txt.trim() === "") {
                obj[campo as keyof typeof obj] = null;
            } else {
                // Converte para número
                const numValue = parseInt(txt);
                obj[campo as keyof typeof obj] = isNaN(numValue) ? null : numValue;
            }
        } else {
            obj[campo as keyof typeof obj] = txt;
        }
        setUsuario(obj);
    }

    const navigateLogin = () => {
        navigation.navigate("Login");
    }

    return { loading, mensagem, sucesso, usuario, usuarioErro, usuarioLista, salvarUsuario, lerUsuario, apagarUsuario, atualizarUsuario, handleUsuario, navigateLogin, salvarAlteracaoUsuario};
}

export {useUsuarioControl};