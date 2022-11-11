export function isBase64(str: string) {
   console.log(str);
   if (str === '' || str.trim() === '') {
      return false;
   }
   try {
      return btoa(atob(str)) == str;
   } catch (err) {
      return false;
   }
}
