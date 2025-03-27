import { Modal, useModalStack } from '@inertiaui/modal-react';
import Container from './Container';
import { Link } from '@inertiajs/react';

export default function Visit() {
    const { visitModal } = useModalStack();

    const openLocalModal = () => {
        visitModal('#local');
    };

    const visitEdit = () => {
        visitModal('/users/1/edit', {
            navigate: true,
            listeners: {
                userGreets: function (greeting) {
                    alert(greeting);
                }
            }
        })
    }

    return (
        <>
            <Container>
                <div className="">
                    <h2 className="text-lg font-medium text-gray-900">Visit programmatically</h2>
                    <div class="flex flex-col items-start">
                        <button onClick={openLocalModal} type="button">
                            Open Local Modal
                        </button>
                        <button onClick={() => visitModal('/data', { method: 'post', data: { message: 'Hi again!' } })} type="button">
                            Open Route Modal
                        </button>
                        <button onClick={visitEdit} type="button">
                            Open Route Modal With Navigate
                        </button>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-900">Other stuff</h2>
                    <div className="flex flex-col items-start">
                        <Link href="/conditionally-redirect?redirect=1" dusk="conditional-redirect">
                            Open page that redirects to modal
                        </Link>
                    </div>
                </div>
            </Container>
            <Modal name="local">
                Hi there!
            </Modal>
        </>
    );
}