import { createContext, useRef, useState } from 'react';
import ConfirmModal from '~/components/Modals/ConfirmModal';
import LoginModal from '~/components/Modals/LoginModal';
// import UploadModal from '~/components/Modals/UploadModal';
import useModal from '~/hooks/useModal';

export const ModalContextShow = createContext();

function ModalContext({ children }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    // const [showUploadModal, setShowUploadModal] = useState(false);
    const [ConfirmComponent, showConfirmModal] = useModal(ConfirmModal);

    const contextValue = useRef({ setShowLoginModal, showConfirmModal });

    return (
        <ModalContextShow.Provider value={contextValue.current}>
            {children}
            {showLoginModal && <LoginModal />}
            <ConfirmComponent />
        </ModalContextShow.Provider>
    );
}

export default ModalContext;
