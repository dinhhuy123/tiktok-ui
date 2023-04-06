import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Modal from '~/layouts/components/Modal';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [modal, setModal] = useState(false);
    const [hideItem, setHideItem] = useState(false);
    const currentUser = false;
    const handleChangeHideItem = () => {
        setHideItem(!hideItem);
    };

    return (
        <div className={cx('wrapper')}>
            <Header onClick={() => setModal(true)} currentUser={currentUser} />
            {modal && (
                <div className={cx('modal')} onClick={handleChangeHideItem}>
                    <PopperWrapper className={cx('modal-wrapper')}>
                        <Modal onClick={() => setModal(false)} currentUser={currentUser} />
                    </PopperWrapper>
                </div>
            )}
            <div className={cx('container')}>
                <Sidebar onClick={() => setModal(true)} className={cx('sidebar')} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
