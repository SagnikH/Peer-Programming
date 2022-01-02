import Editor from '@monaco-editor/react';

export default function MonacoEditor(props) {

    return (
        <div>
            <Editor
                height="84vh"
                width="50vw"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="//Enter answer:"
                value={props.value}
                onMount={props.onMount}
            />
        </div>
    )
}
