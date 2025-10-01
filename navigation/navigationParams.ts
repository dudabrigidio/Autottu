import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
    Login: undefined;
    UsuarioCadastro:undefined;   
    Logado: {screen : string};
}


type LogadoStackParamList = {
    Perfil: undefined;
    CheckIn: undefined;
    MotosCadastro: undefined;
    MotosLista: undefined;
}

type RootScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;
type MotosScreenNavigationProp = NavigationProp<LogadoStackParamList, 'CheckIn'>;


export { RootStackParamList, RootScreenNavigationProp, 
    LogadoStackParamList, MotosScreenNavigationProp};