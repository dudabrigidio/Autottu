import { useState } from "react";
import { Motos, MotosErro } from "../model/Motos";
import { motoServiceSalvar, motoServiceLer, motoServiceAtualizar, motoServiceApagar } from "../service/motosService";
import { useNavigation } from "@react-navigation/native";
import { SalvarMotoCallback, ApagarMotoCallback, AtualizarMotoCallback, LerMotoCallback, motoFetcherApagar, motoFetcherAtualizar, motoFetcherLer, motoFetcherSalvar} from "../fetcher/motosFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";

interface MotosControlHook {
    salvar : () => {};
    motos : Motos;
    setMotos: ( motos : Motos) => {};
    handleMotos :(txt: string, campo : string)=> {};
    mensagem :string;
}

const useMotosControl = () => {
    const [motos, setMotos] = useState<Motos>({});
    const [motosErro, setMotosErro] = useState<MotosErro>({});
    const [motosLista, setMotosLista] = useState<Motos[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarMotosCallback : SalvarMotoCallback = 
    (success : boolean, msg: string, errosCampos?: MotosErro ) => {
        if (success) {
            setMensagem("Motos Cadastrado com sucesso");
            lerMotos();
            navigation.navigate("Logado", {screen: "MotosLista"});
        } else {
            setMensagem(msg);
            setMotosErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarMotosCallback  : AtualizarMotoCallback =
    (success : boolean, msg: string, errosCampos ?: MotosErro) => {
        if (success) {
            setMensagem("Motos Atualizado com sucesso");
            lerMotos();
            navigation.navigate("Logado", {screen: "MotosLista"});
        } else {
            setMensagem(msg);
            setMotosErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerMotosCallback : LerMotoCallback =
    (success : boolean, msg : string, lista?: Array<Motos>) => {
        setSucesso(success);
        setMensagem(msg);
        if (lista) {
            setMotosLista (lista);
            console.log("Lista =>", lista);
        }
        setLoading(false);
    }

    const apagarMotosCallback : ApagarMotoCallback =
    (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Motos apagado com sucesso");
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarMotos = () => {
        setLoading(true);
        setMotosErro({});
        if (motos.id == null) {
            motoServiceSalvar ( motos, salvarMotosCallback);
        } else {
            motoServiceAtualizar ( motos.id, motos, atualizarMotosCallback );
        }
        navigation.navigate("Logado", {screen: "MotosLIsta"});
    }

    const lerMotos = () => {
        setLoading(true);
        setMotosErro({});
        motoServiceLer(lerMotosCallback);
    }

    const apagarMotos = (id: string) => {
        setLoading(true);
        setMotosErro({});
        motoServiceApagar ( id, apagarMotosCallback);
    }

    const atualizarMotos = (id : string) => {
        setMotosErro({});
        const motosFiltrados = motosLista.filter(
            (m: Motos)=> m.id == id
        );
        if (motosFiltrados.length>0) {
            setMotos(motosFiltrados[0]);
            navigation.navigate("Logado", {screen: "MotosCadastro"});
        }
    }

    const handleMotos = (txt: string, campo: string) => {
        const obj = {...motos};
        obj[campo as keyof typeof obj] = txt;
        setMotos(obj);
    }

    return { loading, mensagem, sucesso, motos, motosErro, motosLista, salvarMotos, lerMotos, apagarMotos, atualizarMotos, handleMotos};
}

export {useMotosControl};