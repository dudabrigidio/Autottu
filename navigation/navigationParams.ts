import { NavigationProp } from "@react-navigation/native";

type RootParamList = {
    Login: undefined;
    UsuarioCadastro:undefined;   
    UsuariosCadastrados: undefined;
    Motos: {screen : string};
    CheckIn: {screen : string};
    AlterarPerfil: undefined;
}


type MotosParamList = {
    MotosCadastro: undefined;
    MotosLista: undefined;
}

type CheckInParamList = {
    RealizarCheckIn: undefined;
    CheckInLista: undefined;
}

type RootScreenNavigationProp = NavigationProp<RootParamList, 'Login'>;
type MotosScreenNavigationProp = NavigationProp<MotosParamList, 'MotosCadastro'>;
type CheckInScreenNavigationProp = NavigationProp<CheckInParamList, 'RealizarCheckIn'>;



export { RootParamList, RootScreenNavigationProp, 
    MotosParamList, MotosScreenNavigationProp,
    CheckInScreenNavigationProp, CheckInParamList};