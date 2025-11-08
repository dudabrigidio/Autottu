import {object, string, ObjectSchema, InferType, number} from 'yup';


interface CheckInErro {
    idCheckin?: string
    idMoto?: string
    idUsuario?: string
    ativoChar? : string
    observacao?: string
    timeStamp?: string
    imagensUrl?: string
}


const checkinSchema : ObjectSchema<any, any> = object({
    idCheckin: number().nullable().default(null),
    idMoto: number().required("Insira um id de uma moto válido").default(null),
    idUsuario: number().required("Insira um id de um usuário válido").default(null),
    ativoChar: string().required("Por favor insira S (para sim) ou N (para não)"),
    observacao: string().required("Insira descrição do estado da moto: "),
    timeStamp: string().required("Por favor insira uma data"),
    imagensUrl : string().required("Insira URL das imagens da moto")
})

type CheckIn = InferType<typeof checkinSchema>;

export { CheckIn, CheckInErro, checkinSchema};