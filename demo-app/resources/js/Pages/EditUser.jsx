import { Link, useForm, usePage } from '@inertiajs/react'
import { Modal, ModalLink } from '@inertiaui/modal-react'
// EditUser.jsx
import React, { useState, useRef } from 'react'

import ComponentThatUsesModalInstance from './ComponentThatUsesModalInstance.jsx'

export default function EditUser({ user, roles, randomKey }) {
    const [message, setMessage] = useState('')
    const modalRef = useRef(null)

    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        role_id: user.role_id,
    })

    function updateAndRefresh() {
        put(`/users/${user.id}?redirect=edit`)
    }

    const submit = (e) => {
        e.preventDefault()
        put(`/users/${user.id}`, {
            onSuccess: () => {
                modalRef.current.close()
            },
        })
    }

    const onMessage = (newMessage) => {
        setMessage(newMessage)
        modalRef.current.getChildModal().emit('greeting', `Thanks from ${user.name}`)
    }

    function reloadWithData() {
        modalRef.current.reload({ only: ['randomKey'], data: { fixedRandomKey: 'from-data' } })
    }

    function reloadWithHeader() {
        modalRef.current.reload({ only: ['randomKey'], headers: { 'X-Random-Key': 'from-header' } })
    }

    return (
        <Modal ref={modalRef} onMessage={onMessage}>
            {({ close, reload, emit }) => (
                <>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Edit User {user.name}</h2>
                        <p className="text-sm text-gray-500">
                            Random key: <span data-testid="randomKey">{randomKey}</span>
                        </p>
                        {message && (
                            <p data-testid="message" className="text-sm text-gray-500">
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 flex flex-col items-start">
                        <button type="button" onClick={() => emit('user-greets', 'Hello from EditUser')}>
                            Send Message
                        </button>

                        <button type="button" onClick={reloadWithData}>
                            Random Key from Data
                        </button>

                        <button type="button" onClick={reloadWithHeader}>
                            Random Key from Header
                        </button>
                    </div>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete="off"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    value={data.role_id}
                                    onChange={(e) => setData('role_id', e.target.value)}
                                    id="role"
                                    name="role"
                                    autoComplete="off"
                                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                >
                                    {Object.entries(roles).map(([id, role]) => (
                                        <option key={id} value={id}>
                                            {role}
                                        </option>
                                    ))}
                                </select>

                                <ModalLink
                                    onClose={() => reload({ only: ['roles'] })}
                                    href="/roles/create"
                                    className="mt-2 inline-flex items-center rounded-md border border-indigo-500 bg-transparent px-2 py-1 text-sm text-indigo-600 hover:text-indigo-500"
                                >
                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add Role
                                </ModalLink>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link replace href={route('users.edit', { user, navigate: 1, randomKey })}>
                                Edit again!
                            </Link>
                            <button
                                type="button"
                                onClick={close}
                                className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={updateAndRefresh}
                                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Update and refresh
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                    <ComponentThatUsesModalInstance />
                </>
            )}
        </Modal>
    )
}
