import {object, string, ObjectSchema, InferType, number} from 'yup';

interface MotosErro {
    idMoto?: string
    placa?: string
    modelo?: string
    marca?: string
    ano?: string
    ativoChar?: string
    fotoUrl?: string
}

const motoSchema : ObjectSchema<any, any> = object({
    idMoto: number().nullable().default(null),
    placa: string().required("Por favor, insira uma placa"),
    modelo: string().required("Por favor, insira o modelo da moto"),
    marca: string().required("Por favor, insira a marca da moto"),
    ano: string().required("Por favor, insira o ano da moto"),
    ativoChar: string().required("Por favor, insira o status da moto (ativa ou não) "),
    fotoUrl: string().required("Por favor, insira a url da foto da moto"),

})

type Motos = InferType<typeof motoSchema>;

export {Motos, MotosErro, motoSchema};