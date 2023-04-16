import axios from 'axios';
import { useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Modal from '~/layouts/components/Modal';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { loginSuccess } from '~/redux/authSlice';
import { createInstance } from '~/createInstance';

const cx = classNames.bind(styles);

export const ModalContext = createContext();

function DefaultLayout({ children }) {
    const [modal, setModal] = useState(false);
    const [hideItem, setHideItem] = useState(false);
    const handleChangeHideItem = () => {
        setHideItem(!hideItem);
    };
    const user = useSelector((state) => state.auth.login?.currentUser);
    const currentUser = !!user ? true : false;
    const dispatch = useDispatch();

    let axiosJWT = createInstance(user, dispatch, loginSuccess);

    return (
        <ModalContext.Provider value={setModal}>
            <div className={cx('wrapper')}>
                <Header onClick={() => setModal(true)} currentUser={currentUser} axiosJWT={axiosJWT} />
                {modal && (
                    <div className={cx('modal')} onClick={handleChangeHideItem}>
                        <PopperWrapper className={cx('modal-wrapper')}>
                            <Modal onClick={() => setModal(false)} currentUser={currentUser} />
                        </PopperWrapper>
                    </div>
                )}
                <div className={cx('container')}>
                    <Sidebar onClick={() => setModal(true)} className={cx('sidebar')} currentUser={currentUser} />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </ModalContext.Provider>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
