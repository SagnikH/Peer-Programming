export default function Peers({ peers }) {
    const list = peers.map((peer) => <li key={peer}>{peer}</li>);
    return (
        <div>
            <h3>Peers:</h3>
            <ul>{list}</ul>
        </div>
    );
}