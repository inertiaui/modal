import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Modal, ModalLink } from '@inertiaui/modal-react';

export default function CreateRole({ headerValue }) {
    const { data, setData, errors, post } = useForm({
        name: '',
    });

    const modalRef = useRef(null);
    const [greeting, setGreeting] = useState('');

    const submit = (e) => {
        e.preventDefault();
        axios.post('/roles', data).then(() => {
            modalRef.current?.close();
        });
    };

    return (
        <Modal
            ref={modalRef}
            onGreeting={(event) => setGreeting(event)}
        >
            {({ close, getParentModal, emit }) => (
                <>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Create Role</h2>
                        {greeting && (
                            <p dusk="greeting" className="text-sm text-gray-500">
                                {greeting}
                            </p>
                        )}
                        {headerValue && (
                            <p dusk="headerValue" className="text-sm text-gray-500">
                                {headerValue}
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => getParentModal().emit('message', 'Hello from child')}
                    >
                        Push message to parent
                    </button>
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <ModalLink maxWidth="sm" href="#another-local-modal" className="mr-auto text-sm text-pink-500">
                                What's that?
                            </ModalLink>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                onClick={close}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                    <Modal name="another-local-modal">
                        Hawaiian noises?
                    </Modal>
                </>
            )}
        </Modal>
    );
};
