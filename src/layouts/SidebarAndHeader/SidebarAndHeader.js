import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import styles from './SidebarAndHeader.module.scss';
import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

function SidebarAndHeader({ children }) {
    const state = true;
    return (
        <div className={cx('wrapper')}>
            <Header className={cx(`${state ? 'spread' : ''}`)} />
            <div className={cx('container')}>
                <Sidebar className={cx('sidebar')} state={state} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

SidebarAndHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarAndHeader;
