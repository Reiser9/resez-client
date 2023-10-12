import React from 'react';

import styles from './index.module.css';

import { ArrowLeft, ArrowRight } from '../Icons';

const ScrollWithArrows = ({
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
        scrollContainerRef.current.scrollBy({
            left: scroll,
            behavior: 'smooth',
        });
    }

    React.useEffect(() => {
        const updateMaxScroll = () => {
            const block = scrollContainerRef.current;
        
            if(block){
                const maxScrollAmount = block.scrollWidth - block.clientWidth;
                setScrollBlock(maxScrollAmount);
            }
        }
        
        const block = scrollContainerRef.current;
        const observer = new MutationObserver(updateMaxScroll);

        if(block){
            observer.observe(block, { attributes: true, childList: true, subtree: true });
        }

        window.addEventListener("resize", updateMaxScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateMaxScroll);
        }
    }, []);
    
    return (
        <div className={styles.subjectsTags}>
            <div className={styles.subjectsTagsContent} ref={scrollContainerRef} onScroll={handleScroll}>
                {children}
            </div>

            {scrollBlock > 0 && <>
                <div className={`${styles.subjectsTagsArrowInner} ${styles.prev}${scroll > 0 ? ` ${styles.arrowFade}` : ""}`}>
                    <div className={styles.subjectsTagsArrow} onClick={() => scrollTo(-200)}>
                        <ArrowLeft />
                    </div>
                </div>

                <div className={`${styles.subjectsTagsArrowInner} ${styles.next}${scroll < scrollBlock ? ` ${styles.arrowFade}` : ""}`}>
                    <div className={styles.subjectsTagsArrow} onClick={() => scrollTo(200)}>
                        <ArrowRight />
                    </div>
                </div>
            </>}
        </div>
    )
}

export default ScrollWithArrows;