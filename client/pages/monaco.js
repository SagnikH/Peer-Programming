import React from 'react'
import Editor from '@monaco-editor/react'


export default function monaco() {
    function handleChange(value, event) {
        console.log(value);

    }
    return (
        <div>
            <Editor
                height="100vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                onChange={handleChange}
            />
        </div>
    )
}
