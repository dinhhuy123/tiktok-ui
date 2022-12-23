import classNames from 'classnames/bind';
import AccountItem from './AccountItem';
import styles from './SuggestedAccounts.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <AccountItem to={config.routes.account} />
            <AccountItem to={config.routes.account} />
            <AccountItem to={config.routes.account} />
            <AccountItem to={config.routes.account} />
            <AccountItem to={config.routes.account} />
            <AccountItem to={config.routes.account} />
            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

export default SuggestedAccounts;
