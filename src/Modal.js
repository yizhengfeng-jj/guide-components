import React from 'react';
import cssStyles from './modal.less';

export default props => {
    const {style, options, next, finish, complete, wrapperRef, arrowStyle} = props || {};
    const {title, content} = options || {};

    return <div className={cssStyles.modal} style={{...style}} ref={wrapperRef}>
        <div className={cssStyles.modal__header}>{title}</div>
        <div className={cssStyles.modal__content}>{content}</div>
        <div className={cssStyles.modal__footer}>
            {finish ? null : <span className={cssStyles.btn} onClick={next}>下一步</span>}
            <span className={`${cssStyles.btn} ${cssStyles.finish}`} onClick={complete}>结束</span>
        </div>
        <div className={cssStyles.arrow} style={{...arrowStyle}} />
    </div>;
};