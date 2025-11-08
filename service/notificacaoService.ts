import { differenceInDays } from 'date-fns';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert, Platform } from 'react-native';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowAlert: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    })
});


export async function enviarNotificacaoLocal(titulo: string, corpo: string, dados?: any) {
    try {
        // Verificar permissões antes de enviar notificação local
        let permissao = await Notifications.getPermissionsAsync();
        if (permissao.status !== "granted") { 
            permissao = await Notifications.requestPermissionsAsync();
        }

        if (permissao.status !== "granted") {
            console.warn('Permissão de notificação não concedida para notificação local');
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: titulo,
                body: corpo,
                data: dados,
                sound: true,
            },
            trigger: null, 
        });
        console.log('Notificação local enviada com sucesso');
    } catch (error) {
        console.error('Erro ao enviar notificação local:', error);
        throw error;
    }
}

export async function enviarNotificacaoPush(
    token: string, 
    titulo: string, 
    corpo: string,
    dados?: any
): Promise<any> {
    try {
        const message = {
            to: token,
            sound: 'default',
            title: titulo,
            body: corpo,
            data: dados || {},
            priority: 'high' as const,
            channelId: 'default',
        };

        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const result = await response.json();
        
        if (result.data?.status === 'error') {
            console.error('Erro ao enviar notificação push:', result.data.message);
            throw new Error(result.data.message);
        }

        console.log('Notificação push enviada com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao enviar notificação push:', error);
        throw error;
    }
}



export async function enviarNotificacaoPushParaDispositivo(
    titulo: string, 
    corpo: string,
    dados?: any
): Promise<any> {
    try {
        // Verificar se é dispositivo físico
        if (!Device.isDevice) {
            console.warn('Push notifications só funcionam em dispositivos físicos');
            return await enviarNotificacaoLocal(titulo, corpo, dados);
        }

        // Solicitar permissões
        let permissao = await Notifications.getPermissionsAsync();
        if (permissao.status !== "granted") { 
            permissao = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                },
            });
        }

        if (permissao.status !== "granted") {
            console.warn('Permissão de notificação não concedida, usando notificação local');
            return await enviarNotificacaoLocal(titulo, corpo, dados);
        }

        // Tentar obter Project ID (disponível apenas em builds de produção)
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ?? 
            Constants?.easConfig?.projectId ??
            Constants?.expoConfig?.extra?.eas?.projectId;

        // Se não tiver Project ID, está no Expo Go - usar local
        if (!projectId) {
            console.log('Project ID não encontrado (Expo Go), usando notificação local');
            return await enviarNotificacaoLocal(titulo, corpo, dados);
        }

        // Se tiver Project ID, está em produção - tentar push remota
        console.log('Project ID encontrado (build de produção), tentando push remota...');
        try {
            const pushToken = await Notifications.getExpoPushTokenAsync({
                projectId,
            });

            if (!pushToken?.data) {
                console.warn('Token push não obtido, usando notificação local');
                return await enviarNotificacaoLocal(titulo, corpo, dados);
            }

            // Enviar notificação push remota
            console.log('Enviando notificação push remota...');
            return await enviarNotificacaoPush(pushToken.data, titulo, corpo, dados);
        } catch (pushError) {
            console.warn('Erro ao enviar push remota, usando local como fallback:', pushError);
            return await enviarNotificacaoLocal(titulo, corpo, dados);
        }
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        // Fallback para local em caso de erro
        try {
            return await enviarNotificacaoLocal(titulo, corpo, dados);
        } catch (localError) {
            console.error('Erro ao enviar notificação local:', localError);
            throw error;
        }
    }
}

export async function calcularTempoMotoNoPatio(timeStamp: string): Promise<number> {
    try {
        const dataCheckIn = new Date(timeStamp);
        const hoje = new Date();
        
        const diffDays = differenceInDays(hoje, dataCheckIn);
        
        return diffDays;
    } catch (error) {
        console.error('Erro ao calcular tempo de moto no patio:', error);
        return 0;
    }
}

export async function verificarMotosAntigas(dias: number = 7) {
    try {
        const { checkInFetcherLer } = await import('../fetcher/checkinFetcher');
        const { motoFetcherLer } = await import('../fetcher/motosFetcher');

        checkInFetcherLer((sucessoCheckIn, mensagemCheckIn, listaCheckIns) => {
            if (!sucessoCheckIn || !listaCheckIns) {
                console.error('Erro ao buscar check-ins:', mensagemCheckIn);
                return;
            }

            const checkInsAtivos = listaCheckIns.filter(
                (checkIn: any) => checkIn.ativoChar === 'S' || checkIn.ativoChar === 's'
            );
            
            if (checkInsAtivos.length === 0) {
                console.log('Nenhum check-in ativo encontrado');
                return;
            }
            
            motoFetcherLer(async (sucessoMotos, mensagemMotos, listaMotos) => {
                if (!sucessoMotos || !listaMotos) {
                    console.error('Erro ao buscar motos:', mensagemMotos);
                    return;
                }
                
                // Criar mapa de ID para placa
                const mapaMotos: { [key: number]: string } = {};
                if (listaMotos) {
                    listaMotos.forEach((moto: any) => {
                        if (moto.idMoto) {
                            mapaMotos[moto.idMoto] = moto.placa || `Moto ${moto.idMoto}`;
                        }
                    });
                }

                // Verificar cada check-in ativo (usar for...of para aguardar Promises)
                for (const checkIn of checkInsAtivos) {
                    if (!checkIn.timeStamp) {
                        continue;
                    }

                    try {
                        // Calcular dias no pátio (usar await porque retorna Promise)
                        const diasNoPatio = await calcularTempoMotoNoPatio(checkIn.timeStamp);

                        // Verificar se está há mais de X dias
                        if (diasNoPatio > dias) {
                            const placa = mapaMotos[checkIn.idMoto] || `Moto ID ${checkIn.idMoto}`;

                            await enviarNotificacaoPushParaDispositivo(
                                "Moto no Pátio há Muito Tempo",
                                `A moto ${placa} está no pátio há ${diasNoPatio} dias. Verifique se precisa de alguma ação.`,
                                {
                                    tipo: 'lembrete',
                                    categoria: 'moto_antiga',
                                    idMoto: checkIn.idMoto,
                                    diasNoPatio: diasNoPatio,
                                    placa: placa
                                }
                            );
                            
                        }
                    } catch (error) {
                        console.error(`Erro ao processar check-in ${checkIn.idCheckin}:`, error);
                    }
                }
            });
        });
    } catch (error) {
        console.error('Erro ao verificar motos antigas:', error);
    }

}