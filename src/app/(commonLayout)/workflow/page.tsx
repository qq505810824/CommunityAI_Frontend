'use client';

import { ssePost } from "@/service/base";
import { useEffect, useState } from "react";


export default function Workflow() {
    const url = 'https://aienglish-dify.docai.net/v1/workflows/run';
    const [result, setResult] = useState<string>('');
    const bodyParams = {
        response_mode: 'streaming',
        "user": "abc-123",
        inputs: {
            word: 'love',
            sentence: 'I love you'
        }
    };
    useEffect(() => {
        // handleStream();
        console.log('=');

    }, [])

    const handleStream = () => {
        ssePost(url,
            {
                body: bodyParams,
            }, {
            onData: (message: string, isFirstMessage: boolean, moreInfo: any) => {
                console.log('onData:', message);
            },
            onNodeStarted: (nodeStarted: any) => {
                console.log('Node started:', nodeStarted);
            },
            onNodeFinished: (nodeFinished: any) => {
                console.log('Node finished:', nodeFinished);

            },
            onWorkflowStarted: (workflowStarted: any) => {
                console.log('Workflow started:', workflowStarted);
            },
            onWorkflowFinished: (workflowFinished: any) => {
                console.log('Workflow finished:', workflowFinished);
                if (workflowFinished.data?.outputs) {
                    const outputs = workflowFinished.data.outputs;
                    setResult(JSON.stringify(outputs, null, 2));
                }
            },
            onError: (error: string) => {
                console.error('Error:', error);
            },
            onCompleted: (e) => {
                console.log('Stream completed', e);
            }
        });
    }
    return (
        <div>
            <div>Workflow Response:</div>
            <div>{result}</div>
            <pre style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                padding: '10px',
                background: '#f5f5f5',
                borderRadius: '4px'
            }}>
                {result}
            </pre>
        </div>
    );
}