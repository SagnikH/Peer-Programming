import React from 'react'
import dynamic from 'next/dynamic'
import Editor from '@monaco-editor/react';
const CodeEditor = dynamic(import('../components/CodeEditor'), {
    ssr: false
})



export default function monaco() {
    function handleEditorChange(value, event) {
        console.log(value, event);

    }
    return (
        <>
            <CodeEditor />
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
        </>
    )
}
