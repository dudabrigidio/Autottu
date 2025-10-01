import {object, string, ObjectSchema, InferType, number} from 'yup';

interface MotosErro {
    motoId?: string
    placa?: string
    modelo?: string
    marca?: string
    ano?: string
    status?: string
    foto?: string
}

const motoSchema : ObjectSchema<any, any> = object({
    motoId: number().nullable().default(null),
    placa: string().required("Por favor, insira uma placa"),
    modelo: string().required("Por favor, insira o modelo da moto"),
    marca: string().required("Por favor, insira a marca da moto"),
    ano: string().required("Por favor, insira o ano da moto"),
    status: string().required("Por favor, insira o status da moto"),
    foto: string().required("Por favor, insira a url da foto da moto"),

})

type Motos = InferType<typeof motoSchema>;

export {Motos, MotosErro, motoSchema};