export default function SessionHome({ docList, setDoc }) {
    const list = docList.map((doc) => <li key={doc} onClick={() => setDoc(doc)}>{doc}</li>);
    return (
        <div>
            <h3>Documents:</h3>
            <ul>{list}</ul>
        </div>
    );
}