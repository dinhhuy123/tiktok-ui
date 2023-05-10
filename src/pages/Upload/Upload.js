import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { UploadVideoIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Footer from './Footer';

const cx = classNames.bind(styles);

function Upload() {
    return (
        <div className={cx('upload')}>
            <div className={cx('uploadHeader')}>
                <div className={cx('center')}>
                    <PopperWrapper className={cx('uploadWrapper')}>
                        <div className={cx('uploader')}>
                            <div className={cx('uploadCard')}>
                                <span>
                                    <UploadVideoIcon className={cx('uploadIcon')} />
                                </span>
                                <div className={cx('selectVideo')}>
                                    <span>Select video to upload</span>
                                </div>
                                <div className={cx('dragFile')}>
                                    <span>Or drag and drop a file</span>
                                </div>
                                <div className={cx('desc')}>
                                    <span>Long videos can be split into multiple parts to get more exposure</span>
                                </div>
                                <div className={cx('videoDesc')}>
                                    <div>
                                        <span>Mp4 or WebM</span>
                                    </div>
                                    <div>
                                        <span>720x1280 resolution or higher</span>
                                    </div>
                                    <div>
                                        <span>Up to 30 minutes</span>
                                    </div>
                                    <div>
                                        <span>Less than 2GB</span>
                                    </div>
                                </div>
                                <div className={cx('uploadFile')}>
                                    <Button primary className={cx('uploadFileBtn')}>
                                        Select file
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopperWrapper>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Upload;
