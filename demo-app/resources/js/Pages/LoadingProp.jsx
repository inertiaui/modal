import { ModalLink } from 'inertiaui/modal';
import Container from './Container';

export default function LoadingProp() {
    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Loading Prop</h2>
            </div>
            <ModalLink
                dusk="modal-link"
                href="/slideover?slow=1"
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                {({ loading }) => (
                    loading ? 'Loading...' : 'Open Slideover'
                )}
            </ModalLink>
        </Container>
    );
}