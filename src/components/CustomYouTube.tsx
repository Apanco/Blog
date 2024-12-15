import { Youtube } from '@tiptap/extension-youtube';

export const CustomYoutube = Youtube.extend({
  renderHTML({ node }) {
    // Validar y corregir la URL para que sea del formato "embed"
    let videoUrl = node.attrs.src || '';
    if (!videoUrl.includes('embed')) {
      const videoId = videoUrl.split('v=')[1]?.split('&')[0]; // Extraer el ID del video
      console.log(videoId)
      videoUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return [
      'div',
      {
        class: 'aspect-w-16 aspect-h-6 w-3/4 mx-auto h-auto', // Tailwind classes para el diseño
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

