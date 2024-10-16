import React from 'react';
import { Link } from '@inertiajs/react';
import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function Users({ users, random, navigate }) {
    const alertGreeting = (greeting) => {
        alert(greeting);
    };

    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Users</h2>
            </div>
            <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {users.map(user => (
                        <li key={user.id} className="flex items-center justify-between py-4 px-6 hover:bg-gray-50">
                            <div className="flex items-center w-full">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <div className="ml-auto flex items-center space-x-2">
                                    <Link href={`/users/${user.id}`} className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md">View</Link>

                                    <ModalLink
                                        navigate={navigate}
                                        fragment={`edit-user-${user.id}`}
                                        dusk={`edit-user-${user.id}`}
                                        href={`/users/${user.id}/edit`}
                                        className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                        onUserGreets={alertGreeting}
                                    >
                                        Edit
                                    </ModalLink>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};
