import { useState } from "react";
import { CheckIn, CheckInErro } from "../model/CheckIn";
import {  checkInServiceSalvar, checkInServiceLer, checkInServiceAtualizar, checkInServiceApagar} from "../service/checkinService";
import { useNavigation } from "@react-navigation/native";
import { SalvarCkCallback, LerCkCallback, ApagarCkCallback, AtualizarCkCallback} from "../fetcher/checkinFetcher";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { enviarNotificacaoPushParaDispositivo, enviarNotificacaoLocal } from "../service/notificacaoService";

interface CheckInControlHook {
    salvar : () => {};
    checkIn : CheckIn;
    setCheckIn: ( checkIn : CheckIn) => {};
    handleUsuario :(txt: string, campo : string)=> {};
    mensagem :string;
}

const useCheckInControl = () => {
    const [checkIn, setCheckIn] = useState<CheckIn>({idCheckin: null, idMoto: null, idUsuario: null, ativoChar : "", observacao: "", timeStamp: "", imagensUrl: ""});
    const [checkInErro, setCheckInErro] = useState<CheckInErro>({});
    const [checkInLista, setCheckInLista] = useState<CheckIn[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const [idCheckinAlterado, setIdCheckinAlterado] = useState<string | null>(null);
    const clearCheckIn = () => {
        setCheckIn({
            idCheckin: null, 
            idMoto: null,
            idUsuario: null, 
            ativoChar : "", 
            observacao: "", 
            timeStamp: "", 
            imagensUrl: ""
        });
    }
    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarCheckInCallback : SalvarCkCallback = 
    async (success : boolean, msg: string, errosCampos?: CheckInErro ) => {
        if (success) {
            setMensagem("CheckIn realizado com sucesso");
            
            // Enviar notificação push quando check-in for realizado com sucesso
            try {
                await enviarNotificacaoPushParaDispositivo(
                    "Check-in foi realizado!",
                    `Check-in da moto ${checkIn.idMoto || 'N/A'} foi registrado com sucesso.`,
                    { tipo: 'checkin', idMoto: checkIn.idMoto, idUsuario: checkIn.idUsuario }
                );
            } catch (error) {
                console.error('Erro ao enviar notificação push:', error);
            }
            
            lerCheckIn();
            clearCheckIn();

            navigation.navigate("CheckIn", {screen: "CheckInLista"});

        } else {
            setMensagem(msg);
            setCheckInErro( errosCampos ??{});

            
        }
        setSucesso(success);
        setLoading(false);
    }


    const atualizarCheckInCallback  : AtualizarCkCallback =
    async (success : boolean, msg: string, errosCampos ?: CheckInErro) => {
        if (success) {
            setMensagem("CheckIn atualizado com sucesso");

            try {
                await enviarNotificacaoLocal(
                    "Check-in Atualizado!",
                    `Check-in da moto ${checkIn.idMoto || 'N/A'} foi atualizado com sucesso.`,
                    { tipo: 'checkin', idMoto: checkIn.idMoto, idUsuario: checkIn.idUsuario }
                );
            } catch (error) {
                console.error('Erro ao enviar notificação:', error);
            }

            clearCheckIn();
            lerCheckIn();

        } else {
            setMensagem(msg);
            setCheckInErro( errosCampos ??{});
            
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerCheckInCallback : LerCkCallback =
    async (success : boolean, msg : string, lista?: Array<CheckIn>) => {
        setSucesso(success);
        setMensagem(msg);
        if (lista) {
            setCheckInLista (lista);
            console.log("Lista =>", lista);
            
        } else {
            try {
                await enviarNotificacaoLocal(
                    "Erro ao ler lista de CheckIn´s! ",
                    `Problema encontrado`,
                );
            } catch (error) {
                console.error('Erro ao enviar notificação push:', error);
            }
        }
        setLoading(false);
    }

    const apagarCheckInCallback : ApagarCkCallback =
    async (success: boolean, msg: string) => {
        setSucesso(success);
        if(success) {
            setMensagem("Checkin apagado com sucesso");
            lerCheckIn();
            try {
                await enviarNotificacaoLocal(
                    "CheckIn apagado com sucesso! ",
                    `CheckIn da moto ${checkIn.idMoto || 'N/A'} foi apagado com sucesso.`,
                );
            } catch (error) {
                console.error('Erro ao enviar notificação', error);
            }
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

        if (checkIn.idCheckin == null || String(checkIn.idCheckin) !== idCheckinAlterado ) {
            checkInServiceSalvar ( checkInParaSalvar, salvarCheckInCallback);
        } else {
            checkInServiceAtualizar ( checkIn.idCheckin, checkIn, atualizarCheckInCallback );
        }
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
            (c: CheckIn)=> c.idCheckin == Number(id)
        );
        if (checkInFiltrados.length>0) {
            setCheckIn(checkInFiltrados[0]);
            navigation.navigate("CheckIn", {screen: "RealizarCheckIn"});
        }
    }

    const handleCheckIn = (txt: string, campo: string) => {
        const obj = {...checkIn};
        if (campo === "idCheckin" || campo === "idMoto" || campo === "idUsuario") {

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