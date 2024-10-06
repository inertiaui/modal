import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Container({ children }) {
    const { props } = usePage();

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            {props.flash.message && (
                <div className="mb-4 border-l-4 border-green-400 bg-green-50 p-4">
                    <p className="text-sm text-green-600">
                        {props.flash.message}
                    </p>
                </div>
            )}
            {children}
        </div>
    );
};