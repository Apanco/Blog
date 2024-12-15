import { Highlighter, ChevronDown, CircleOff } from "lucide-react";
import { Toggle } from "./ui/toggle";
import type { Editor } from "@tiptap/react"
import { Button } from "./ui/button";
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {  useState } from "react";
type ResaltadorProps = {
    editor: Editor | null;
}

const highlightColors = [
    { name: "border-[#ffff00]", color: "#ffff00" },
    { name: "border-orange-300", color: "#fdba74" },
    { name: "border-green-400", color: "#4ade80" },
    { name: "border-blue-400", color: "#60a5fa" },
    { name: "border-purple-400", color: "#c084fc" },
];

export default function Resaltador({editor} : ResaltadorProps) {
    if (!editor) return null;
    const [classColor, setClassColor] = useState<string>("border-0") 
    const [esExcluido,setEx] = useState<boolean>(false) 
    const checkActiveHighlight = () => {
        let activeColor = null;
        // Itera sobre los colores para encontrar el activo
        for (const color of highlightColors) {
          if (editor.isActive("highlight", { color: color.color })) {
            setClassColor(`border-2 ${color.name}`)
            activeColor = color.name;
            setEx(true)
            break; // Salimos al encontrar el primero
          }
          if(esExcluido){
            if(!editor.isActive('highlight')){
                setClassColor("border-0") 
            }
            if(editor.isActive('highlight')){
                setClassColor(`border-2 border-[#ffff00]`)
            }
          }
          if(!esExcluido){
            if(editor.isActive('highlight')){
                setClassColor(`border-2 border-[#ffff00]`)
            }
            if(!editor.isActive('highlight')){
                setClassColor("border-0")
            }
          }
        }
        activeColor = activeColor
        // Actualiza el estado con el color activo
    };
    editor?.on("selectionUpdate", checkActiveHighlight)
    return (
        <div className=" flex space-x-1">
            <Toggle
                size={"sm"}
                className={` h-full rounded-r-none ${classColor}`}
                pressed={editor.isActive('highlight')}
                onPressedChange={ () => editor.chain().focus().toggleHighlight().run()}
            >
                <Highlighter className=" w-4 h-4"/>
            </Toggle>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className=" px-0 rounded-l-none" size={"sm"}
                        onClick={() => editor.chain().focus().unsetHighlight().run()}
                    >
                        <ChevronDown className=" w-4 h-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className=" w-[200px]">
                    <DropdownMenuLabel>Colores</DropdownMenuLabel>
                    <DropdownMenuGroup className=" grid grid-cols-3 mx-auto gap-3 px-1">
                        <Button className=" w-[55px]  h-[55px] p-0 bg-transparent hover:bg-primary-foreground"> <CircleOff className=" text-primary w-4 h-4"/> </Button>
                            <Button className=" w-[55px]  h-[55px] p-0 bg-[#ffff00] hover:bg-[#ffff00] hover:opacity-85"
                                onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffff00' }).run()}></Button>

                            <Button className=" w-[55px]  h-[55px] p-0 bg-orange-300 hover:bg-orange-300 hover:opacity-85"
                                onClick={() => editor.chain().focus().toggleHighlight({ color: '#fdba74' }).run()}></Button>

                            <Button className=" w-[55px]  h-[55px] p-0 bg-green-400 hover:bg-green-400 hover:opacity-85"
                                onClick={() => editor.chain().focus().toggleHighlight({ color: '#4ade80' }).run()}></Button>

                            <Button className=" w-[55px]  h-[55px] p-0 bg-blue-400 hover:bg-blue-400 hover:opacity-85"
                                onClick={() => editor.chain().focus().toggleHighlight({ color: '#60a5fa' }).run()}></Button>

                            <Button className=" w-[55px]  h-[55px] p-0 bg-purple-400 hover:bg-purple-400 hover:opacity-85"
                                onClick={() => editor.chain().focus().toggleHighlight({ color: '#c084fc' }).run()}></Button>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
