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
    const [motos, setMotos] = useState<Motos>({ idMoto: "", placa: "",modelo: "", marca: "", ano: "",ativoChar:"", fotoUrl: ""});
    const [motosErro, setMotosErro] = useState<MotosErro>({});
    const [motosLista, setMotosLista] = useState<Motos[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const [idMotoAlterada, setIdMotoAlterada] = useState<string | null>(null);

    const clearMoto = () => {
        setMotos({
            idMoto: null,
            placa: "",
            modelo: "",
            marca: "",
            ano: "",
            ativoChar: "",
            fotoUrl: ""
        });
        setIdMotoAlterada(null);
    }
        
    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarMotosCallback : SalvarMotoCallback = 
    (success : boolean, msg: string, errosCampos?: MotosErro ) => {
        if (success) {
            setMensagem("Motos Cadastrado com sucesso");
            clearMoto();
            lerMotos();
            navigation.navigate("Motos", {screen: "MotosLista"});
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
            clearMoto();
            lerMotos();
            navigation.navigate("Motos", {screen: "MotosLista"});
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
            setLoading(true);
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarMotos = () => {
        setLoading(true);
        setMotosErro({});
        console.log("idMoto:", motos.idMoto, "idMotoalterada: ", idMotoAlterada,"tipo:", typeof motos.idMoto);
        
        if (motos.idMoto == null || motos.idMoto === "" || motos.idMoto !== idMotoAlterada) {
            motoServiceSalvar(motos, salvarMotosCallback);
        } else {
            motoServiceAtualizar(motos.idMoto, motos, atualizarMotosCallback);
        }
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
        lerMotos();
    }

    const atualizarMotos = (id : string) => {
        setIdMotoAlterada(id); 
        console.log(setIdMotoAlterada);
        setMotosErro({});
        const motosFiltrados = motosLista.filter(
            (m: Motos)=> m.idMoto == id
        );
        if (motosFiltrados.length > 0) {
            setMotos(motosFiltrados[0]);
            navigation.navigate("Motos", {screen: "MotosCadastro"});
        }
    }

    const handleMotos = (txt: string, campo: string) => {
        const obj = {...motos};
        if (campo === "idMoto") {
            // Se o campo estiver vazio (após remover espaços), define como null
            // Senão, converte para number
            if (txt.trim() === "") {
                obj[campo as keyof typeof obj] = null;
            } else {
                const numValue = parseInt(txt);
                obj[campo as keyof typeof obj] = isNaN(numValue) ? null : numValue;
            }
        } else {
            obj[campo as keyof typeof obj] = txt;
        }
        setMotos(obj);
    }

    return { loading, mensagem, sucesso, motos, motosErro, motosLista, salvarMotos, lerMotos, apagarMotos, atualizarMotos, handleMotos};
}

export {useMotosControl};