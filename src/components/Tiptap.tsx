import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./TooBar"
import Heading from '@tiptap/extension-heading';
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Text from '@tiptap/extension-text'
import { ControllerRenderProps } from "react-hook-form";
import { basicType } from "@/types";
import Bold from '@tiptap/extension-bold'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import BulletList from '@tiptap/extension-bullet-list'
import Paragraph from '@tiptap/extension-paragraph'
import ListItem from '@tiptap/extension-list-item'
import Document from '@tiptap/extension-document'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import HardBreak from '@tiptap/extension-hard-break'
import { CustomYoutube } from "./CustomYouTube";
type TiptapProps = {
    description:string,
    onChange: (richText : string) => void,
    field: ControllerRenderProps<basicType>
}
const CustomHardBreak = HardBreak.extend({
    addKeyboardShortcuts() {
      return {
        'Enter': () => this.editor.commands.setHardBreak(), // Ctrl+Enter o Cmd+Enter
        'Shift-Enter': () => this.editor.commands.setHardBreak(), // Shift+Enter
      };
    },
  });
  
export default function Tiptap( {description, onChange, field} : TiptapProps ) {

    const editor = useEditor({
        extensions:[StarterKit.configure({}),
        Heading.configure({
            levels:[1,2,3],
        }),
        Image.configure({
            allowBase64: true,
            HTMLAttributes:{
                class:" w-1/2 mx-auto"
            }
        }),
        FontFamily,
        Text, 
        ListItem,
        Paragraph,
        TextStyle,
        Bold,
        Italic,
        Underline,
        Strike,
        Document,
        OrderedList,
        CustomYoutube,
        CustomHardBreak,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
            alignments: ['left', 'right', "center", "justify"],
        }),
        Highlight.configure({ multicolor: true }),
        BulletList.configure({
            keepMarks:true
        })
    ],
        content:description,
        editorProps:{
            attributes:{
                class:"rounded-md min-h-[150px] border border-input ring-offset-2 p-2 my-5"
            }
        },
        onUpdate({editor}){
            const htmlContent = editor.getHTML()
            onChange(htmlContent)
            field.value = htmlContent
        }
    })

    return (
        <div>
            <ToolBar editor={editor}/>
            <EditorContent editor={editor} />
        </div>
    )
}
