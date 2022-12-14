import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import {GUIDE_LIMIT_KEY} from './constant';
import { getDom, getArrowPosition, scrollToTarget, getPosition, getMaskStyle} from './utils';
import {getLocal, setLocal} from './local';
import cssStyles from './guide.less';

const Test = props => {
    const {options, id} = props;
    // state
    const [maskStyles, setMaskStyles] = useState();
    const [modalStyles, setModalStyles] = useState();
    const [arrowStyle, setArrowStyle] = useState();
    const [current, setCurrent] = useState(0);

    // ref
    const modalRef = useRef();

    // useMemo
    const stepLength = useMemo(() => options.length, [options]);

    useEffect(() => {
        const start = options[current] || {};

        const {el, placement } = start || {};
        const targetDom = getDom(el);
        if (!targetDom) {
            complete();
            setLocal(GUIDE_LIMIT_KEY, '');
            console.error('请检查每一步的元素是否存在');
            return;
        }
        const styles = getMaskStyle(targetDom);
        const modalStyle = getPosition(targetDom, modalRef.current, placement);
        const arrowStyle = getArrowPosition(modalRef.current, placement);

        setMaskStyles(styles);
        setModalStyles(modalStyle);
        setArrowStyle(arrowStyle);
        scrollToTarget(el);
    }, [options, current]);

    const next = useCallback(() => {
        const nextCurrent = current + 1;
        if (stepLength > nextCurrent) {
            setCurrent(nextCurrent);
        }
    }, [current, stepLength]);

    const complete = useCallback(() => {
        // 将guid卸载
        const guid = document.getElementById(id);

        guid.parentNode.removeChild(guid);
        setLocal(GUIDE_LIMIT_KEY, true);
    }, [id]);

    return <>
        <div className={cssStyles.mark} style={{...maskStyles}} />
        <Modal
            style={{...modalStyles}}
            arrowStyle={{...arrowStyle}}
            options={{...options[current]}}
            finish={current + 1 === stepLength}
            next={next}
            complete={complete}
            wrapperRef={modalRef}
        />
    </>;
};
const guide = {
    id: ''
};
guide.render = id => {
    ReactDOM.render(<Test options={guide.params} id={guide.id}/>, document.getElementById(id));
};

guide.createDom = id => {
    guide.id = id;
    const dom = document.createElement('div');

    dom.id = id;

    document.body.appendChild(dom);
};
guide.init = params => {
    const key = getLocal(GUIDE_LIMIT_KEY);

    if (key) {
        return;
    }
    guide.params = params || {};
    guide.createDom('guid');
    // 造一个节点dom
    guide.render('guid');
};

export default guide;
