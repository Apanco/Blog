import type { Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading1Icon, Heading2Icon, Heading3Icon, Italic, List, ListOrdered, ListStart, ListTree, StrikethroughIcon, Underline, WrapText } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Combobox from "./Combobox";
import Resaltador from "./Resaltador";
import { Separator } from "./ui/separator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Image } from 'lucide-react';
import AddYouTube from "./AddYouTube";

type ToolBarProps = {
  editor: Editor | null;
};

export default function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  if(imagePreview){

  }
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abre el explorador de archivos
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtén el archivo seleccionado
    if (!file) return;

    console.log("Archivo seleccionado:", file);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const imageSrc = reader.result as string; // URL de la imagen
        setImagePreview(imageSrc); // Actualizamos el estado para la previsualización
        console.log("Imagen lista para insertar:", imageSrc);

        // Insertar la imagen en el editor
        editor.chain().focus().setImage({ src: imageSrc }).run();
      }
    };

    reader.onerror = () => {
      console.error("Error al leer el archivo.");
    };

    reader.readAsDataURL(file); // Lee el archivo como una Data URL
  };
    const [isBulletListActive, setIsBulletListActive] = useState(false);
    if(isBulletListActive){

    }
    useEffect(() => {
        if (!editor) return;

        const updateState = () => {
            setIsBulletListActive(editor.isActive("bulletList"));
        };

        // Escucha cambios en el estado del editor
        editor.on('transaction', updateState);

        // Limpia el listener cuando el componente se desmonta
        return () => {
            editor.off('transaction', updateState);
        };
    }, [editor]);
    return (
        <div className=" h-32 sticky top-0  z-10">

            <ScrollArea className=" w-full h-28 sticky top-0  z-10">


                <div className="border border-input rounded-sm  bg-background flex items-center h-28 p-2">
                    
                    <div className=" space-y-1 h-auto">
                        {/* Font */}
                        <Combobox editor={editor} />
                        <div className=" flex justify-between">
                            {/* Bold */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive('bold')}
                                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                            >
                                <Bold className="w-4 h-4" />
                            </Toggle>
                            {/* Italic */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive('italic')}
                                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                            >
                                <Italic className="w-4 h-4" />
                            </Toggle>  
                            {/* Underline  */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive('underline')}
                                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                            >
                                <Underline className="w-4 h-4" />
                            </Toggle>  
                            {/* strike  */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive('strike')}
                                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                            >
                                <StrikethroughIcon className="w-4 h-4" />
                            </Toggle>  
                        </div>
                    </div >
                    <Separator orientation="vertical" className=" h-4/5  max-h-full mx-3 "/>
                    <div className=" h-full flex-col justify-between p-2  space-y-3">
                        <div className=" flex">
                            {/* Heading 1 */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive("heading", { level: 1 })}
                                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            >
                                <Heading1Icon className="w-4 h-4" />
                            </Toggle>
                            {/* Heading 2 */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive("heading", { level: 2 })}
                                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            >
                                <Heading2Icon className="w-4 h-4" />
                            </Toggle>
                            {/* Heading 3 */}
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive("heading", { level: 3 })}
                                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            >
                                <Heading3Icon className="w-4 h-4" />
                            </Toggle>
                        </div>
                        <div className=" flex space-x-3">
                            <Resaltador editor={editor}/>
                            <Button
                                variant={"ghost"}
                                type="button"
                                onClick={() => editor.chain().focus().setHardBreak().run()}
                            >
                                <WrapText/>
                            </Button>
                        </div>
                    </div>
                    <Separator orientation="vertical" className=" h-4/5  max-h-full mx-3 "/>
                    <div className="h-full flex-col justify-between p-2  space-y-3">
                        <div className=" flex space-x-3" >
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive({ textAlign: 'left' })}
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            >
                                <AlignLeft className=" w-4 h-4"/>
                            </Toggle>
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive({ textAlign: 'center' })}
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            >
                                <AlignCenter className=" w-4 h-4"/>
                            </Toggle>
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive({ textAlign: 'right' })}
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            >
                                <AlignRight className=" w-4 h-4"/>
                            </Toggle>
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive({ textAlign: 'justify' })}
                                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            >
                                <AlignJustify className=" w-4 h-4"/>
                            </Toggle>
                        </div>
                        <div className=" flex space-x-3">
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive('bulletList')}
                                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                                
                            >
                                <List className=" w-4 h-4"/>
                            </Toggle>
                            <Toggle
                                size={"sm"}
                                pressed={editor.isActive("orderedList")}
                                onPressedChange={ () => editor.chain().focus().toggleOrderedList().run() }
                            >
                                <ListOrdered className=" w-4 h-4"/>
                            </Toggle>
                            <Toggle
                                size={"sm"}
                                onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                                disabled={!editor.can().sinkListItem('listItem')}
                                className="bg-transparent data-[state=on]:bg-transparent hover:bg-muted data-[state=on]:hover:bg-muted" 
                            >
                                <ListTree className=" w-4 h-4"/>
                            </Toggle>
                            <Toggle
                                size={"sm"}
                                onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                                disabled={!editor.can().liftListItem('listItem')}
                                className="bg-transparent data-[state=on]:bg-transparent hover:bg-muted data-[state=on]:hover:bg-muted"
                            >
                                <ListStart className=" w-4 h-4"/>
                            </Toggle>
                        </div>
                    </div>
                    <Separator orientation="vertical" className=" h-4/5  max-h-full mx-3 "/>
                    {/* Imagen */}
                    <div className="h-full flex-col justify-between p-2  space-y-1 " >
                        <Button className=" flex space-x-3 items-center justify-start" variant={"ghost"} onClick={handleButtonClick}>
                            <Image strokeWidth={2} className="w-24 h-24" />
                            <span>Insertar imagen</span>
                        </Button>
                        <AddYouTube editor={editor}/>
                    </div>

                    <Input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*" // Acepta solo imágenes
                        onChange={handleFileChange}
                    />
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
    );
}
