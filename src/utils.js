export const getDom = mark => {
    const dom = document.querySelector(mark);

    return dom;
};

export const getTop = e => {
    let offset = e.offsetTop;
    if (e.offsetParent !== null) {
        offset += getTop(e.offsetParent);
    };
    return offset;
};


export const getBottom = e => {
    const wHeight = window.innerHeight;
    const eHeight = e.offsetHeight;
    const offset = wHeight - getTop(e) - eHeight;

    return offset;
};


export const getLeft = e => {
    let offset = e.offsetLeft;
    if (e.offsetParent !== null) {
        offset += getLeft(e.offsetParent);
    };
    return offset;
};


export const getRight = e => {
    const wWidth = window.innerWidth;
    const eWidth = e.offsetWidth;
    const offset = wWidth - getLeft(e) - eWidth;

    return offset;
};

export const getDocument = node => node.ownerDocument;

/* Get the Element that is the root element of the document which contains the node
 * (for example, the <html> element for HTML documents).
 */
export const getDocumentElement = node =>
    getDocument(node).documentElement;

export const getMaskStyle = anchorEl => {
    const scrollContainer = getDocumentElement(anchorEl);

    const {scrollWidth, scrollHeight, scrollTop} = scrollContainer;

    // prevent scrolling
    // scrollContainer.style.overflow = 'hidden';

    const anchorPos = anchorEl.getBoundingClientRect();
    const {height, width, left} = anchorPos;

    const top = anchorPos.top + scrollTop;
    return {
        width: scrollWidth,
        height: scrollHeight,
        borderTopWidth: Math.max(top, 0),
        borderBottomWidth: Math.max(scrollHeight - height - top, 0),
        borderRightWidth: Math.max(scrollWidth - width - left, 0),
        borderLeftWidth: Math.max(left, 0)
    };
};

// position 分为上下左右
export const getPosition = (dom, modalDom, position = 'bottom') => {
    const top = getTop(dom) - 2; // 2是border
    const left = getLeft(dom);
    const domHeight = dom.offsetHeight + 2; // 2是border
    const domWidth = dom.offsetWidth;
    const ARROW_HEIGHT = 20;
    const MODAL_WIDTH = modalDom.offsetWidth;
    const MODAL_HEIGHT = modalDom.offsetHeight;
    console.log(MODAL_WIDTH, 'MODAL_WIDTH....');
    console.dir(modalDom, 'modalDom....modalDom...');
    if (position === 'bottom') {
        return {top: top + domHeight + ARROW_HEIGHT, left};
    }
    else if (position === 'top') {
        return {top: top - ARROW_HEIGHT - MODAL_HEIGHT, left};
    }
    else if (position === 'left') {
        return {top: top - (MODAL_HEIGHT - domHeight) / 2, left: left - MODAL_WIDTH - 20};
    }

    return {top: top - (MODAL_HEIGHT - domHeight) / 2, left: left + domWidth + 20};
};

export const getArrowPosition = (modalDom, position = 'bottom') => {
    const MODAL_WIDTH = modalDom.offsetWidth;
    const MODAL_HEIGHT = modalDom.offsetHeight;
    const arrowDomHeight = 16;
    const arrowDomWidth = 16;
    if (position === 'bottom') {
        return {top: -arrowDomWidth / 2, left: (MODAL_WIDTH - arrowDomWidth) / 2};
    }
    else if (position === 'top') {
        return {bottom: -arrowDomWidth / 2, left: (MODAL_WIDTH - arrowDomWidth) / 2};
    }
    else if (position === 'left') {
        return {top: (MODAL_HEIGHT - arrowDomHeight)  / 2, right: -arrowDomHeight / 2};
    }

    return {top: (MODAL_HEIGHT - arrowDomHeight)  / 2, left: -arrowDomHeight / 2};
};
export const scrollToTarget = type => {
    const el = getDom(type);

    if (el) {
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
};