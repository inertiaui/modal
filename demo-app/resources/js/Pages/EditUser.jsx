// EditUser.jsx
import React, { useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Modal, ModalLink } from '@inertiaui/modal-react';
import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.jsx';

export default function EditUser({ user, roles }) {
    const [message, setMessage] = useState('');
    const modalRef = useRef(null);

    const $pageProps = usePage();

    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        role_id: user.role_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`, {
            onSuccess: () => {
                modalRef.current.close();
            },
        });
    };

    const onMessage = (newMessage) => {
        setMessage(newMessage);
        modalRef.current.getChildModal().emit('greeting', `Thanks from ${user.name}`);
    };

    return (
        <Modal
            ref={modalRef}
            onMessage={onMessage}
        >
            {({ close, reload, emit }) => (
                <>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Edit User</h2>
                        {message && <p dusk="message" className="text-sm text-gray-500">{message}</p>}
                    </div>

                    <button
                        type="button"
                        onClick={() => emit('user-greets', 'Hello from EditUser')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Send Message
                    </button>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    value={data.role_id}
                                    onChange={e => setData('role_id', e.target.value)}
                                    id="role"
                                    name="role"
                                    autoComplete="off"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {Object.entries(roles).map(([id, role]) => (
                                        <option key={id} value={id}>{role}</option>
                                    ))}
                                </select>

                                <ModalLink
                                    onClose={() => reload({ only: ['roles'] })}
                                    href="/roles/create"
                                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 bg-transparent border border-indigo-500 rounded-md py-1 px-2 inline-flex items-center"
                                >
                                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add Role
                                </ModalLink>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={close}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                    <ComponentThatUsesModalInstance />
                </>
            )}
        </Modal>
    );
};
