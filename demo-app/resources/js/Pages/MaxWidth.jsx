import { ModalLink } from '@inertiaui/modal-react';
import Container from './Container';

export default function MaxWidth() {
    const modalSizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];

    const renderModalLinks = (isSlideOver = false) => {
        return modalSizes.map(size => (
            <ModalLink
                key={`${isSlideOver ? 'slideover' : 'modal'}-size-${size}`}
                data-testid={`${isSlideOver ? 'slideover' : 'modal'}-size-${size}`}
                maxWidth={size}
                href="/users/1/edit"
                slideover={isSlideOver}
            >
                {isSlideOver ? `Slideover ${size}` : `Modal ${size}`}
            </ModalLink>
        ));
    };

    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Max Width</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
                {renderModalLinks()}
                {renderModalLinks(true)}
            </div>
        </Container>
    );
}