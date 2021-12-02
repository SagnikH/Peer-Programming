const setImage = (lc) => {
    let img = lc;
    const startIdxs = [];
    const endIdxs = [];
    const styleStartIdxs = [];
    const eraseStrings = [];
    let itr = 0;
    //console.log(img.indexOf('$', 11284));
    
    while (itr != -1){
        itr = img.indexOf('<img', itr);
        if (itr === -1)
            break;
        startIdxs.push(itr);
        itr++;
    }

    for (let i=0; i<startIdxs.length; i++){
        let endIndx = img.indexOf('>', startIdxs[i]);
        endIdxs.push(endIndx);
        let styleStartIdx = img.indexOf('style="', startIdxs[i]);
        styleStartIdxs.push(styleStartIdx);
    }

    for (let i=0; i<styleStartIdxs.length; i++){
        let tempStart = styleStartIdxs[i];
        let tempLength = endIdxs[i]-tempStart;
        let tempSubstring = img.substr(tempStart, tempLength);
        eraseStrings.push(tempSubstring);
    }

    for (let i=0; i<eraseStrings.length; i++){
        img = img.replace(eraseStrings[i], '/');
    }

    img = img.replaceAll('<img', '<Image');
    return img;
}
 
export default setImage;