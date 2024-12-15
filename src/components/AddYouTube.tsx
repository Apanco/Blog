import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogTitle } from './ui/dialog'
import { DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Video } from 'lucide-react'
import { basicURL, urlType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import { Input } from './ui/input'
import type { Editor } from "@tiptap/react";

type AddYouTubeTypes = {
    editor : Editor | null
} 

export default function AddYouTube( {editor} : AddYouTubeTypes ) {
    if(editor === null) return;
    const initalValues : urlType = {
        url:""
    }
    const [open, setOpen] = useState(false)
    const form = useForm({
        defaultValues:initalValues,
        resolver: zodResolver(basicURL),
    });
    const [formValues, setFormValues] = useState<urlType>({
        url: '',
    });
    const handleSubmit = () => {
        if(formValues.url !== ""){
            setOpen(false)
            editor.commands.setYoutubeVideo({
                src: formValues.url,
                width: 1080,
                height: 720,
            });
            
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value, // Actualiza el campo dinámicamente según su atributo "name"
        }));

    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className=" flex space-x-3 items-center w-full justify-start" variant={"ghost"}>
                    <Video strokeWidth={2} className="w-24 h-24" />
                    <span>Insertar video</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className=' w-full '>
                        <FormField
                            control={form.control}
                            name='url'
                            render={ ( {  } ) => (
                                <FormItem>
                                    <FormLabel>Url</FormLabel>
                                    <FormControl>
                                        <Input name='url' onChange={handleChange} placeholder='Ingrese su url aqui' />
                                    </FormControl>
                                    <FormDescription>Enlace de su video de YouTube</FormDescription>
                                </FormItem>
                            ) }
                        >

                        </FormField>
                        <Button type='button' className=' my-5' onClick={handleSubmit} >Agregar video</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
