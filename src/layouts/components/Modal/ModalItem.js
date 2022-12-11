import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function ModalItem({ data, onClick }) {
    return (
        <Button upload modalIcon={data.icon} className={cx('register-btn')} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default ModalItem;
