       // Lấy chữ cái đầu của tên
export const handleGetFirstLetterName = (name:string) => {
  const parts = name?.split(" ");
  let firstLetter
  if (parts?.length >= 2) {
    const lastName = parts[parts.length - 1];
    firstLetter = lastName.charAt(0);
  } else {
    const lastName1 = parts[0];
    firstLetter = lastName1.charAt(0);
  }
  return firstLetter.toUpperCase()
}