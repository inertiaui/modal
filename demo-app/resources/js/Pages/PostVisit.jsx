import { ModalLink } from 'inertiaui/modal';
import Container from './Container';

export default function PostVisit() {
    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">POST Visit</h2>
                <ModalLink
                    href="/data"
                    method="post"
                    data={{ message: 'Hey there!' }}
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                >
                    Open POST Modal
                </ModalLink>
            </div>
        </Container>
    );
}