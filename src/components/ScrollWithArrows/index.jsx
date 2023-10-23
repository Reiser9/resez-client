import React from 'react';

import styles from './index.module.css';

import { ArrowLeft, ArrowRight } from '../Icons';

const ScrollWithArrows = ({
    scrollValue = 200,
    children
}) => {
    const [scroll, setScroll] = React.useState(0);
    const [scrollBlock, setScrollBlock] = React.useState(0);
    const scrollContainerRef = React.useRef(null);

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        setScroll(scrollLeft);
    }

    const scrollTo = (scroll) => {
        updateMaxScroll();
        const block = scrollContainerRef.current;
        const remainingScroll = block.scrollWidth - block.clientWidth - block.scrollLeft;
        let scrollLeft;

        if(scroll < 0 && block.scrollLeft > 0){
            scrollLeft = Math.max(scroll, -block.scrollLeft);
        }
        else if(scroll > 0 && remainingScroll > 0){
            scrollLeft = Math.min(scroll, remainingScroll);
        }

        block.scrollBy({
            left: scrollLeft,
            behavior: 'smooth',
        });
    }

    const updateMaxScroll = () => {
        const block = scrollContainerRef.current;

        if(scrollContainerRef.current){
            const maxScrollAmount = Math.max(0, block.scrollWidth - block.clientWidth);
            setScrollBlock(maxScrollAmount);
        }
    }

    React.useEffect(() => {
        const block = scrollContainerRef.current;
        const observer = new MutationObserver(updateMaxScroll);
        updateMaxScroll();

        if(block){
            observer.observe(block, { attributes: true, childList: true, subtree: true });
        }

        window.addEventListener("resize", updateMaxScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateMaxScroll);
        }
    }, []);

    React.useEffect(() => {
        updateMaxScroll();
    }, [children]);
    
    return (
        <div className={styles.subjectsTags}>
            <div className={styles.subjectsTagsContent} ref={scrollContainerRef} onScroll={handleScroll}>
                {children}
            </div>

            {scrollBlock > 0 && <>
                <div className={`${styles.subjectsTagsArrowInner} ${styles.prev}${scroll > 5 ? ` ${styles.arrowFade}` : ""}`}>
                    <div className={styles.subjectsTagsArrow} onClick={() => scrollTo(-scrollValue)}>
                        <ArrowLeft />
                    </div>
                </div>

                <div className={`${styles.subjectsTagsArrowInner} ${styles.next}${scroll < scrollBlock - 5 ? ` ${styles.arrowFade}` : ""}`}>
                    <div className={styles.subjectsTagsArrow} onClick={() => scrollTo(scrollValue)}>
                        <ArrowRight />
                    </div>
                </div>
            </>}
        </div>
    )
}

export default ScrollWithArrows;