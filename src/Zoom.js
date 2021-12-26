import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import React, { useEffect, useRef } from 'react'




export default function Zoom() {

    const zoomDiv = useRef(null);



    useEffect(() => {
        const client = ZoomMtgEmbedded.createClient();
        client.init({
            debug: true,
            zoomAppRoot: meetingSDKElement,
            language: 'en-US',
            customize: {
                meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
                toolbar: {
                    buttons: [
                        {
                            text: 'Custom Button',
                            className: 'CustomButton',
                            onClick: () => {
                                console.log('custom button');
                            }
                        }
                    ]
                }
            }
        });
        client.join({
            apiKey: i1PKOL4iSDGs_PRB9eRuBw,
            signature: signature,
            meetingNumber: meetingNumber,
            password: password,
            userName: userName
        })
    }, [])
    return (
        <div id="meetingSDKElement" ref={zoomDiv}>

        </div>
    )
}
