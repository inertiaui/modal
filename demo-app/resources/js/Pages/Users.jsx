import React from 'react';
import { Link } from '@inertiajs/react';
import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';
import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.jsx';
import * as InertiaReact from '@inertiajs/react';

export default function Users({ users, random, navigate, deferred }) {
    const alertGreeting = (greeting) => {
        alert(greeting);
    };

    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Users</h2>
                {
                    InertiaReact.Deferred ?
                        <InertiaReact.Deferred data="deferred" fallback={<div>Loading...</div>}>
                            <p dusk="deferred">
                                {deferred}
                            </p>
                        </InertiaReact.Deferred> : <p dusk="deferred"> No Deferred Component</p>
                }
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
                                        dusk={`edit-user-${user.id}`}
                                        href={`/users/${user.id}/edit`}
                                        className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                        onUserGreets={alertGreeting}
                                    >
                                        Edit
                                    </ModalLink>
                                    <ModalLink
                                        slideover={true}
                                        navigate={navigate}
                                        dusk={`slideover-user-${user.id}`}
                                        href={`/users/${user.id}/edit`}
                                        className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-md"
                                        onUserGreets={alertGreeting}
                                    >
                                        Slideover
                                    </ModalLink>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ComponentThatUsesModalInstance />
        </Container>
    );
};
