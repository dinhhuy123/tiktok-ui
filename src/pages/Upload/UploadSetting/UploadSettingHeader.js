import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DecreaseIcon, EditVideoIcon, IncreaseIcon, SplitIcon } from '~/components/Icons';

import styles from './UploadSetting.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function UploadSettingHeader({ selectedFile, thumbArray }) {
    return (
        <PopperWrapper className={cx('noPadding')}>
            <div className={cx('grid')}>
                <div className={cx('editVideo')}>
                    <div className={cx('imageContainer')}>
                        <div className={cx('imageNumber')}>
                            <span>1</span>
                        </div>
                        <div className={cx('image')}>
                            <div className={cx('card')}>
                                <img src={thumbArray[0]} alt="imageCard" className={cx('imageCard')} />
                            </div>
                        </div>
                        <div className={cx('videoImageDescContainer')}>
                            <span className={cx('videoImageDescName')}>{selectedFile.fileName}</span>
                            <div className={cx('videoImageDescTime')}>
                                <span>{`00:00 - ${selectedFile.duration}`}</span>
                                <span>{`${Math.floor(selectedFile.time + 1)}s`}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('editBtnContainer')}>
                        <Button upload leftIcon={<EditVideoIcon />}>
                            Edit video
                        </Button>
                    </div>
                </div>
                <div className={cx('split')}>
                    <div className={cx('splitContainer')}>
                        <span>Split into multiple parts to get more exposure</span>
                        <div className={cx('handleSplit')}>
                            <span>
                                <DecreaseIcon />
                            </span>
                            <span>
                                <input value="2" onChange={(e) => e.target.value} />
                            </span>
                            <span>
                                <IncreaseIcon />
                            </span>
                        </div>
                    </div>
                    <div className={cx('splitBtnContainer')}>
                        <Button upload leftIcon={<SplitIcon />} className={cx('splitBtn')}>
                            Split
                        </Button>
                    </div>
                </div>
            </div>
        </PopperWrapper>
    );
}

export default UploadSettingHeader;
