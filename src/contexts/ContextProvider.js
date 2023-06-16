import NotifyProVider from './NotifyContext';
import ModalProvider from './ModalContext';

function ContextProvider({ children }) {
    return (
        <NotifyProVider>
            <ModalProvider>{children}</ModalProvider>
        </NotifyProVider>
    );
}

export default ContextProvider;
