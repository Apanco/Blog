import React from 'react'
import type { Editor } from "@tiptap/react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"


import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

type ComboboxProps = {
    editor: Editor | null;
};
type Status = {
    value: string
    label: string
}

const statuses: Status[] = [
    {
        value:"default",
        label:"Default"
    },
    {
      value: "Comic Sans",
      label: "Comic Sans",
    },
    {
      value: "serif",
      label: "Serif",
    },
    {
        value: "monospace",
        label: "Monospace",
    },
    {
      value: "cursive",
      label: "Cursive",
    },

]

export default function Combobox( { editor } : ComboboxProps ) {
    const [open, setOpen] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState<Status>({
        value:"default",
        label:"Default"
    })
    const checkActiveFont = () => {
        let activeFontName: Status | null = null;
  
        // Itera sobre el arreglo de fuentes y verifica cuál está activa
        statuses.forEach((font) => {
          if (editor!.isActive("textStyle", { fontFamily: font.value })) {
            activeFontName = font;
          }
        });
  
        setSelectedStatus(activeFontName ||
            {
                value:"default",
                label:"Default"
            }
        ); // Actualiza el estado con la fuente activa
    };
    editor?.on("selectionUpdate", checkActiveFont)
    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button variant={"outline"} className=' min-w-[150px] justify-between'>
                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ Fuente</>}
                    <ChevronDown className=' w-4 h-4'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} editor={editor} />
            </PopoverContent>
        </Popover>
    )
}
function StatusList({
    setOpen,
    setSelectedStatus,
    editor
  }: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: Status) => void,
    editor:Editor | null
  }) {
    return (
      <Command>
        <CommandInput placeholder="Buscar fuente" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={(value) => {
                  setSelectedStatus(
                    statuses.find((priority) => priority.value === value)!
                )
                    if(value == "default" ){
                        editor!.chain().focus().unsetFontFamily().run()
                    } else {
                        editor!.chain().focus().setFontFamily(value).run()
                    }
                    console.log(value)
                    setOpen(false)
                }}
              >
                {status.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }