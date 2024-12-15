import z from "zod"

export const basicURL = z.object({
    url:z.string().url({
        message:"Ingrese una url valida"
    })
})
export const basicSchema = z.object({
    titulo:z.string().min(2, {
        message:"Ingrese minimo 2 caracteres"
    }),
    contenido:z.string()
})

export type urlType = z.infer < typeof basicURL >
export type basicType = z.infer < typeof basicSchema >