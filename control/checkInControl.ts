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
    const [checkIn, setCheckIn] = useState<CheckIn>({idCheckin: "", idMoto: "",idUsuario:"", ativoChar : "", observacao: "", timeStamp: "", imagensUrl: ""});
    const [checkInErro, setCheckInErro] = useState<CheckInErro>({});
    const [checkInLista, setCheckInLista] = useState<CheckIn[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const [idCheckinAlterado, setIdCheckinAlterado] = useState<string | null>(null);
    const clearCheckIn = () => {
        setCheckIn({
            idCheckin: null, 
            idMoto: "",
            idUsuario:"", 
            ativoChar : "", 
            observacao: "", 
            timeStamp: "", 
            imagensUrl: ""
        });
    }
    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarCheckInCallback : SalvarCkCallback = 
    (success : boolean, msg: string, errosCampos?: CheckInErro ) => {
        if (success) {
            setMensagem("CheckIn realizado com sucesso");
            lerCheckIn();
            navigation.navigate("CheckIn", {screen: "CheckInLista"});
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
            clearCheckIn();
            lerCheckIn();
            navigation.navigate("CheckIn", {screen: "CheckInLista"});
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
            lerCheckIn();
        }
        else {
            setMensagem(msg);
        }
        setLoading(false);
    }

    const salvarCheckIn = () => {
        const { idCheckin, ...checkInParaSalvar } = checkIn;
        setLoading(true);
        setCheckInErro({});
        console.log("idCheckIn:", checkIn.idCheckin, "idCheckinAlterado: ", idCheckinAlterado);

        if (checkIn.idCheckin == null || checkIn.idCheckin == '' || checkIn.idCheckin !== idCheckinAlterado ) {
            checkInServiceSalvar ( checkInParaSalvar, salvarCheckInCallback);
        } else {
            checkInServiceAtualizar ( checkIn.idCheckin, checkIn, atualizarCheckInCallback );
        }
        navigation.navigate("CheckIn", {screen: "CheckInLista"});
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
        navigation.navigate("CheckIn", {screen: "CheckInLista"});

    }

    const atualizarCheckIn = (id : string) => {
        console.log(id);
        setIdCheckinAlterado(id);
        console.log("idCheckinAlterado:", idCheckinAlterado);

        setCheckInErro({});
        const checkInFiltrados = checkInLista.filter(
            (c: CheckIn)=> c.idCheckin == id
        );
        if (checkInFiltrados.length>0) {
            setCheckIn(checkInFiltrados[0]);
            navigation.navigate("CheckIn", {screen: "RealizarCheckIn"});
        }
        setIdCheckinAlterado(id);

    }

    const handleCheckIn = (txt: string, campo: string) => {
        const obj = {...checkIn};
        if (campo === "idCheckin") {

            if (txt.trim() === "") {
                obj[campo as keyof typeof obj] = null;
            } else {
                const numValue = parseInt(txt);
                obj[campo as keyof typeof obj] = isNaN(numValue) ? null : numValue;
            }
        } else {
            obj[campo as keyof typeof obj] = txt;
        }
        setCheckIn(obj);
    }

    return { loading, mensagem, sucesso, checkIn, checkInErro, checkInLista, salvarCheckIn, lerCheckIn, apagarCheckIn, atualizarCheckIn, handleCheckIn};
}

export {useCheckInControl};