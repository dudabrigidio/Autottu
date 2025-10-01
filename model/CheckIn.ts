import {object, string, ObjectSchema, InferType, number} from 'yup';


interface CheckInErro {
    idMoto?: string
    violada? : string
    observacao?: string
    data?: string
}

const checkinSchema : ObjectSchema<any, any> = object({
    idMoto: number().nullable().default(null),
    nome: string().required("Por favor insira S (para sim) ou N (para não)"),
    observacao: string().required("Insira descrição do estado da moto: "),
    data: string().required("Por favor insira uma data")
})

type CheckIn = InferType<typeof checkinSchema>;

export { CheckIn, CheckInErro, checkinSchema};