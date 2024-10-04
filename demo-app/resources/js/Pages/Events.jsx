import { useState } from 'react';
import { ModalLink } from 'inertiaui/modal';
import Container from './Container';

export default function Events() {
    const [log, setLog] = useState([]);

    const addToLog = (event) => {
        setLog(prevLog => [...prevLog, event]);
    };

    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Events</h2>
                <p dusk="log">{log.join(',')}</p>
            </div>
            <ModalLink
                dusk="modal-link"
                href="/users/1/edit"
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                onClose={() => addToLog('close')}
                onFocus={() => addToLog('focus')}
                onAfterLeave={() => addToLog('after-leave')}
                onBlur={() => addToLog('blur')}
                onStart={() => addToLog('start')}
                onSuccess={() => addToLog('success')}
            >
                Open Modal
            </ModalLink>
        </Container>
    );
}