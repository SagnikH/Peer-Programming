import Editor from '@monaco-editor/react';

export default function MonacoEditor(props) {

    return (
        <div>
            <Editor
                height="50vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue=""
                value={props.value}
                onMount={props.onMount}
            />
        </div>
    )
}
