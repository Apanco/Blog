import { Youtube } from '@tiptap/extension-youtube';

export const CustomYoutube = Youtube.extend({
  renderHTML({ node }) {
    // Validar y corregir la URL para que sea del formato "embed"
    function extractYouTubeId(url : string) {
        // Expresión regular para capturar el ID del video
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
        
        // Ejecutar la expresión regular sobre la URL
        const match = url.match(regex);
        
        // Retornar el ID si coincide, o null si no se encontró
        return match ? match[1] : null;
    }
    let videoUrl = node.attrs.src || '';
    let videoId = extractYouTubeId(node.attrs.src || '')
    console.log(videoId)
    videoUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(videoUrl)
    return [
      'div',
      {
        class: 'aspect-[5/3] w-full mx-auto', // Tailwind classes para el diseño
      },
      [
        'iframe',
        {
          src: videoUrl,
          title: 'YouTube video',
          frameborder: '0',
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: 'true',
          class: 'w-full h-full',
        },
      ],
    ];
  },
});

