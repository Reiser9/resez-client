import React from 'react';
import { useParams } from 'react-router-dom';

import useWebRTC, { LOCAL_VIDEO } from '../../hooks/useWebRTC';

const Call = () => {
    const {id} = useParams();

    const {clients, provideMediaRef} = useWebRTC(id);

    return (
        <div>
            ID: {id}
            {clients.map(clientId => <div key={clientId}>
                <video
                    ref={instance => {
                        provideMediaRef(clientId, instance)
                    }}
                    autoPlay
                    playsInline
                    muted={clientId === LOCAL_VIDEO}
                />
            </div>)}
        </div>
    )
}

export default Call;