import { getModalContext } from './context.js';
export default function useModal() {
    try {
        return getModalContext().getModal();
    }
    catch {
        return null;
    }
}
