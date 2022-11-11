export default function getImage(id?: string | null) {
   if (!id) id = '1IZZSNx';
   return `https://i.imgur.com/${id}.png`;
}
