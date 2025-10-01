import { useState, useContext } from 'react';
import { Usuario, UsuarioErro } from '../model/Usuario';
import { LogarCallback } from '../fetcher/loginFetcher';
import { loginServicoLogar} from '../service/loginService';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from '../navigation/navigationParams';

const useLoginControl = () => {
    const navigation = useNavigation<RootScreenNavigationProp>();
    const {token, emailProfile, setProfile} = useContext(ContextoPrincipal);

    const [usuario, setUsuario] = useState<Usuario>({
        email: "", senha: ""
    });

    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const handleLogin = (txt: string, campo : string) => {
        const obj = {...usuario};
        obj[campo as keyof typeof obj] = txt;
        setUsuario(obj);
    }

    const login = () => {
        const callback : LogarCallback =
        (success: boolean, msg: string, errosCampos?: UsuarioErro, token?: string) => {
            if ( success && token != undefined) {
                setProfile(token, usuario.email??null);
                setMensagem("Usuario logado com sucesso!");
                navigation.navigate("Logado", {screen: "CheckIn"} );
            } else {
                console.log(msg);
                setMensagem("Erro ao logar usuário");
                if (errosCampos){
                    setUsuarioErro( errosCampos);
                }
            }
            setSucesso(true);
            loginServicoLogar( usuario, callback);
        }

    }

    const navigateCadastro = () => {
        navigation.navigate("UsuarioCadastro");
    }

    return { usuario, usuarioErro, emailProfile, handleLogin, login, navigateCadastro, sucesso, mensagem, loading}
}

export {useLoginControl};