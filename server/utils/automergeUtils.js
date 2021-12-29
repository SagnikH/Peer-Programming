const Automerge = require("automerge");

 function arrayToBase64String(a) {
    return btoa(String.fromCharCode(...a));
}

 function base64StringToArray(s) {
    const asciiString = atob(s);
    return new Uint8Array([...asciiString].map((char) => char.charCodeAt(0)));
}

 function serializeDoc(doc) {
    return arrayToBase64String(Automerge.save(doc))
}

 function deserializeDoc(doc) {
    return Automerge.load(base64StringToArray(doc));
}

 function serializeChanges(changes) {
    const seralizedArray = [];
    for (let change of changes) {
        seralizedArray.push(arrayToBase64String(change));
    }
    return seralizedArray;
}

 function deserializeChanges(seralizedArray) {
    const deserializedChanges = [];
    for (let serializedChange of seralizedArray) {
        deserializedChanges.push(base64StringToArray(serializedChange));
    }
    return deserializedChanges
}

function getNewDoc(initialText = "") {
    let doc = Automerge.init();
    doc = Automerge.change(doc, (doc) => {
        doc.text = new Automerge.Text();
        for (let i = 0; i < initialText.length; i++)
            doc.text.insertAt(i, initialText[i]);
    });
    return doc;
}

module.exports = { arrayToBase64String, base64StringToArray, serializeDoc, deserializeDoc, serializeChanges, deserializeChanges, getNewDoc}