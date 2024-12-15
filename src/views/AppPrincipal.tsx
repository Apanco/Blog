import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { basicSchema, basicType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "../components/ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function AppPrincipal() {

    const [htmlPreview, setHtmlPreview] = useState<string>("");
    const initalValues : basicType = {
        titulo:"",
        contenido:""
    }

    const form = useForm({
        defaultValues:initalValues,
        resolver: zodResolver(basicSchema)
    });


    const handleSubmit = (formData : basicType) => {
        console.log(formData.contenido)
        setHtmlPreview(formData.contenido);
    }

    return (
        <div className=" w-full h-screen max-w-screen-xl mx-auto px-10">
            <div className=" w-full py-5 flex justify-center">
                <h1>Creacion blog</h1>
            </div>
            <div className=" w-full py-5 flex justify-center ">
                <Form {...form}>
                    <form className=" max-w-screen-lg w-full" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="titulo"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel>Titulo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingrese su titulo aqui" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Titulo de la nota
                                    </FormDescription>
                                    <FormMessage className=" py-2"/>
                                </FormItem>
                            ) }
                        />
                        <FormField
                            control={form.control}
                            name="contenido"
                            render={ ( { field } ) => (
                                <FormItem>
                                    <FormLabel>Contenido</FormLabel>
                                    <FormControl>
                                        <Tiptap description={field.value} onChange={field.onChange} field={field} />
                                    </FormControl>
                                </FormItem>
                            ) }
                        />

                        <Button type="submit">Crear nota</Button>
                    </form>
                </Form>
            </div>
            <Separator className=" w-full  " orientation="horizontal"/>
            {htmlPreview && (
                <div className="w-full mt-10 pb-20">
                    <h2 className="text-lg font-bold">Vista previa del contenido:</h2>
                    <div
                        className="  mt-4"
                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                    />
                </div>
            )}


        </div>
    )
}
