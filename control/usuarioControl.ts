import { useState } from "react";
import { Usuario, UsuarioErro } from "../model/Usuario";
import { usuarioServiceSalvar, usuarioServiceLer, usuarioServiceAtualizar, usuarioServiceApagar } from "../service/usuarioService";
import { useNavigation } from "@react-navigation/native";
import { ApagarUsuarioCallback, AtualizarUsuarioCallback, LerUsuarioCallback, SalvarUsuarioCallback } from "../fetcher/usuarioFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { usePerfilControl } from "./perfilControl";

interface UsuarioControlHook {
    salvar : () => {};
    usuario : Usuario;
    setUsuario: ( usuario : Usuario) => {};
    handleUsuario :(txt: string, campo : string)=> {};
    mensagem :string;
}


const useUsuarioControl = () => {
    const [usuario, setUsuario] = useState<Usuario>({idUsuario: "",nome: "",senha: "",email: "",telefone: ""});
    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [usuarioLista, setUsuarioLista] = useState<Usuario[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const {token} = usePerfilControl();

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarUsuarioCallback : SalvarUsuarioCallback = 
    (success : boolean, msg: string, errosCampos?: UsuarioErro ) => {
        if (success) {
            setMensagem("Usuario Cadastrado com sucesso");
            lerUsuario();
            navigation.navigate("Login");
        } else {
            setMensagem(msg);
            setUsuarioErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarUsuarioCallback  : AtualizarUsuarioCallback =
    (success : boolean, msg: string, errosCampos ?: UsuarioErro) => {
        if (success) {
            setMensagem("Usuario Atualizado com sucesso");
            lerUsuario();
            navigation.navigate("Logado", {screen: "Perfil"});
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
    (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Usuario apagado com sucesso");
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarUsuario = () => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceSalvar(usuario, salvarUsuarioCallback, token);

        console.log(usuario);
    }

    const lerUsuario = () => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceLer(lerUsuarioCallback);
    }

    const apagarUsuario = (id: string) => {
        setLoading(true);
        setUsuarioErro({});
        usuarioServiceApagar ( id, apagarUsuarioCallback);
    }

    const atualizarUsuario = (id : string) => {
        setUsuarioErro({});
        const usuariosFiltrados = usuarioLista.filter(
            (u: Usuario)=> u.id == id
        );
        if (usuariosFiltrados.length>0) {
            setUsuario(usuariosFiltrados[0]);
            navigation.navigate("Logado", {screen: "Perfil"});
        }
    }

    const handleUsuario = (txt: string, campo: string) => {
        const obj = {...usuario};
        obj[campo as keyof typeof obj] = txt;
        setUsuario(obj);
    }

    const navigateLogin = () => {
        navigation.navigate("Login");
    }

    return { loading, mensagem, sucesso, usuario, usuarioErro, usuarioLista, salvarUsuario, lerUsuario, apagarUsuario, atualizarUsuario, handleUsuario, navigateLogin};
}

export {useUsuarioControl};