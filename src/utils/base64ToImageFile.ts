const base64ToImageFile = (
    base64String: string,
    filename: string
  ): File | null => {
    // Remove data URI prefix if it exists
    const base64 = base64String.replace(/^data:image\/[a-z]+;base64,/, "");
  
    // Convert Base64 to Blob
    const byteCharacters = atob(base64);
    const byteArrays = new Uint8Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }
  
    const blob = new Blob([byteArrays], { type: "image/jpg" }); // Adjust the type accordingly
  
    const imageFile = new File([blob], filename, { type: blob.type });
  
    return imageFile;
  };
  
  export default base64ToImageFile;
  