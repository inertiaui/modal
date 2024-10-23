import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function UserProfile({ user }) {
    return (
        <Container>
            <div className="">
                <p className="text-2xl font-medium text-gray-900">{user.name}</p>
                <p className="text-xl text-gray-500">{user.email}</p>
            </div>
            <ModalLink
                navigate
                as="button"
                dusk={`edit-user-${user.id}`}
                href={`/users/${user.id}/edit`}
                className="mt-4 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                Edit
            </ModalLink>
        </Container>
    );
};
