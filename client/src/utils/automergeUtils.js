import Automerge from "automerge";

export function arrayToBase64String(a) {
    return btoa(String.fromCharCode(...a));
}

export function base64StringToArray(s) {
    const asciiString = atob(s);
    return new Uint8Array([...asciiString].map((char) => char.charCodeAt(0)));
}

export function serializeDoc(doc) {
    return arrayToBase64String(Automerge.save(doc))
}

export function deserializeDoc(doc) {
    return Automerge.load(base64StringToArray(doc));
}

export function serializeChanges(changes) {
    const seralizedArray = [];
    for (let change of changes) {
        seralizedArray.push(arrayToBase64String(change));
    }
    return seralizedArray;
}

export function deserializeChanges(seralizedArray) {
    const deserializedChanges = [];
    for (let serializedChange of seralizedArray) {
        deserializedChanges.push(base64StringToArray(serializedChange));
    }
    return deserializedChanges
}