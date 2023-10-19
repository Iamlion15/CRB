


const ChecklFileFormat = (data, structure) => {
    const check=data[0]
    if (check.length !== structure.length) {
        return false; // If the arrays have different lengths, they can't match.
    }
    else {
        let found 
        for (let i = 0; i < check.length; i++) {
            found=false
            for (let a = 0; a < structure.length; a++) {
                if (check[i] === structure[a]) {
                    found = true; 
                    break;
                }
            } 
        }
        return found
    }
}


export default ChecklFileFormat;