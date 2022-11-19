export default function getImage(id?: string | null) {
   if (!id) return '/default.png';
   return `https://i.imgur.com/${id}.png`;
}
