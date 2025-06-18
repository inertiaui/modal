import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';
import * as InertiaReact from '@inertiajs/react';

export default function UserProfile({ user, deferred }) {
    return (
        <Container>
            <div className="">
                <p className="text-2xl font-medium text-gray-900">{user.name}</p>
                <p className="text-xl text-gray-500">{user.email}</p>
            </div>

            {
                InertiaReact.Deferred ?
                    <InertiaReact.Deferred data="deferred" fallback={<div>Loading...</div>}>
                        <p dusk="deferred">
                            {deferred}
                        </p>
                    </InertiaReact.Deferred> : <p dusk="deferred"> No Deferred Component</p>
            }

            <ModalLink
                navigate
                as="button"
                dusk={`edit-user-${user.id}`}
                href={`/users/${user.id}/edit`}
                className="mt-4 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md"
            >
                Edit
            </ModalLink>
        </Container >
    );
};
