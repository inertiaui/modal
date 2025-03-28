import { Modal, Deferred, WhenVisible } from '@inertiaui/modal-react'
import { useState } from 'react';

export default function ModalPropsIgnoreFirstLoad({ deferA, deferB, lazy, optional }) {
    const [visible, setVisible] = useState(false);

    return (
        <Modal>
            {({ reload }) => (
                <>
                    <Deferred
                        data={['deferA', 'deferB']}
                        fallback={<p dusk="defer">Loading defer...</p>}
                    >
                        <p dusk="defer" className="text-green-500">
                            {deferA}
                        </p>
                        <p dusk="defer-b" className="text-green-500">
                            {deferB}
                        </p>
                    </Deferred>

                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={() => reload({ only: ["lazy"] })}
                            className="underline"
                        >
                            Load lazy
                        </button>
                        <p dusk="lazy" className={lazy ? "text-green-500" : ""}>
                            {lazy ?? "No lazy data loaded"}
                        </p>
                    </div>

                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={() => setVisible(!visible)}
                            className="underline"
                        >
                            Make {visible ? "invisible" : "visible"}
                        </button>
                        <div className={!visible ? "hidden" : ""}>
                            <WhenVisible
                                data="optional"
                                always={true}
                                fallback={<p dusk="optional">Loading optional...</p>}
                            >
                                <p dusk="optional" className="text-green-500">
                                    {optional}
                                </p>
                            </WhenVisible>
                        </div>
                    </div>
                </>
            )}
        </Modal>
    )
}
