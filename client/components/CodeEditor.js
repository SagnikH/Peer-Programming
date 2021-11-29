
import AceEditor from 'react-ace';
import React from 'react';
import Editor from '@monaco-editor/react';


export default function CodeEditor() {
    function handleChange(value, event) {
        console.log(event);

    }
    return (
        <div>
            <AceEditor
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onChange={handleChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`function onLoad(editor) {
                    console.log("i've loaded");
                    }`}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }} />

        </div>
    )
}
