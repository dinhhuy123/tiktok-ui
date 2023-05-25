import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Modal from '~/layouts/components/Modal';
import styles from './SidebarAndHeader.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

export const ModalContext = createContext();

function SidebarAndHeader({ children }) {
    const [modal, setModal] = useState(false);
    const [hideItem, setHideItem] = useState(false);
    const handleChangeHideItem = () => {
        setHideItem(!hideItem);
    };
    const state = true;
    return (
        <ModalContext.Provider value={setModal}>
            <div className={cx('wrapper')}>
                <Header onClick={() => setModal(true)} className={cx(`${state ? 'spread' : ''}`)} />
                {modal && (
                    <div className={cx('modal')} onClick={handleChangeHideItem}>
                        <PopperWrapper className={cx('modal-wrapper')}>
                            <Modal onClick={() => setModal(false)} />
                        </PopperWrapper>
                    </div>
                )}
                <div className={cx('container')}>
                    <Sidebar onClick={() => setModal(true)} className={cx('sidebar')} state={state} />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </ModalContext.Provider>
    );
}

SidebarAndHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarAndHeader;
