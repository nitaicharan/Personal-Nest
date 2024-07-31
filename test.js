function isValidUTF8(str: string): boolean {
    try {
        // Encode the string as a Buffer using UTF-8 encoding
        const buffer = Buffer.from(str, 'utf-8');
        
        // Decode the buffer back to a string
        const decodedStr = buffer.toString('utf-8');
        
        // Check if the decoded string matches the original
        return decodedStr === str;
    } catch (e) {
        // If any error occurs, it's not a valid UTF-8 string
        return false;
    }
}

const testString = "򮵋eØÚ~Ì󀓀񉡓";
console.log(isValidUTF8(testString)); // Output will be true or false
