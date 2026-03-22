interface CloseButtonProps {
    onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <button
            type="button"
            className="im-close-button text-gray-400 hover:text-gray-500"
            onClick={onClick}
        >
            <span className="sr-only">Close</span>
            <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    )
}
