import Editor from '@monaco-editor/react';

export default function MonacoEditor(props) {

    return (
        <div>
            <Editor
                height="86vh"
                width="50vw"
                theme="vs-dark"
                defaultValue=""
                value={props.value}
                onMount={props.onMount}
            />
        </div>
    )
}
