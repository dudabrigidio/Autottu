import { useState } from "react";
import { CheckIn, CheckInErro } from "../model/CheckIn";
import {  checkInServiceSalvar, checkInServiceLer, checkInServiceAtualizar, checkInServiceApagar} from "../service/checkinService";
import { useNavigation } from "@react-navigation/native";
import { SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback} from "../fetcher/checkinFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";

interface CheckInControlHook {
    salvar : () => {};
    checkIn : CheckIn;
    setCheckIn: ( checkIn : CheckIn) => {};
    handleUsuario :(txt: string, campo : string)=> {};
    mensagem :string;
}

const useCheckInControl = () => {
    const [checkIn, setCheckIn] = useState<CheckIn>({});
    const [checkInErro, setCheckInErro] = useState<CheckInErro>({});
    const [checkInLista, setCheckInLista] = useState<CheckIn[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarCheckInCallback : SalvarCkCallback = 
    (success : boolean, msg: string, errosCampos?: CheckInErro ) => {
        if (success) {
            setMensagem("CheckIn realizado com sucesso");
            lerCheckIn();
            navigation.navigate("Logado", {screen: "MotosLista"});
        } else {
            setMensagem(msg);
            setCheckInErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarCheckInCallback  : AtualizarCkCallback =
    (success : boolean, msg: string, errosCampos ?: CheckInErro) => {
        if (success) {
            setMensagem("CheckIn atualizado com sucesso");
            lerCheckIn();
            navigation.navigate("Logado", {screen: "MotosLista"});
        } else {
            setMensagem(msg);
            setCheckInErro( errosCampos ??{});
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerCheckInCallback : LerCkCallback =
    (success : boolean, msg : string, lista?: Array<CheckIn>) => {
        setSucesso(success);
        setMensagem(msg);
        if (lista) {
            setCheckInLista (lista);
            console.log("Lista =>", lista);
        }
        setLoading(false);
    }

    const apagarCheckInCallback : ApagarCkCallback =
    (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Checkin apagado com sucesso");
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarCheckIn = () => {
        setLoading(true);
        setCheckInErro({});
        if (checkIn.id == null) {
            checkInServiceSalvar ( checkIn, salvarCheckInCallback);
        } else {
            checkInServiceAtualizar ( checkIn.id, checkIn, atualizarCheckInCallback );
        }
        navigation.navigate("Logado", {screen: "MotosLista"});
    }

    const lerCheckIn = () => {
        setLoading(true);
        setCheckInErro({});
        checkInServiceLer(lerCheckInCallback);
    }

    const apagarCheckIn = (id: string) => {
        setLoading(true);
        setCheckInErro({});
        checkInServiceApagar ( id, apagarCheckInCallback);
    }

    const atualizarCheckIn = (id : string) => {
        setCheckInErro({});
        const checkInFiltrados = checkInLista.filter(
            (c: CheckIn)=> c.id == id
        );
        if (checkInFiltrados.length>0) {
            setCheckIn(checkInFiltrados[0]);
            navigation.navigate("Logado", {screen: "MotosLista"});
        }
    }

    const handleContato = (txt: string, campo: string) => {
        const obj = {...checkIn};
        obj[campo as keyof typeof obj] = txt;
        setCheckIn(obj);
    }

    return { loading, mensagem, sucesso, checkIn, checkInErro, checkInLista, salvarCheckIn, lerCheckIn, apagarCheckIn, atualizarCheckIn};
}

export {useCheckInControl};