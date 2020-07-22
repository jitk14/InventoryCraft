import React from 'react';
import styles from './pagination.module.scss';

interface IPaginationProps {
    itemsPerPage: number;
    totalLength: number;
    currentIndex: number;
    deltaCoverage? : number;
    pageIndexHandler: (index: number) => void;
}

enum BoxTypes {
    NUMBER,
    ELLIPSIS
}

type Box = {
    pageIndex: number;
    active?: boolean;
    type: BoxTypes;
    key?: string;
}

export class Pagination extends React.Component<IPaginationProps, any> {
    constructor(props: IPaginationProps) {
        super(props);
    }

    getIndexBoxes() {
        const deltaCoverage = this.props.deltaCoverage || 1;
        const pagesCount = Math.ceil(this.props.totalLength / this.props.itemsPerPage);
        let indexBoxes: Array<Box> = [];

        let startDeltaCoverage = deltaCoverage;
        let endDeltaCoverage = pagesCount - deltaCoverage -1;
        let leftDeltaCoverage = Math.max(this.props.currentIndex - deltaCoverage, 0);
        let rightDeltaCoverage = Math.min(this.props.currentIndex + deltaCoverage, pagesCount-1);

        const leftOverlap =  leftDeltaCoverage - startDeltaCoverage;
        const rightOverlap = endDeltaCoverage - rightDeltaCoverage -1;

        startDeltaCoverage = startDeltaCoverage - Math.min(leftOverlap, 0) -1;
        endDeltaCoverage = endDeltaCoverage + Math.abs(Math.min(rightOverlap,0));

        if (leftDeltaCoverage >= startDeltaCoverage) {
            indexBoxes = this.addRangeDetails(0, startDeltaCoverage, indexBoxes);
        }

        if (leftOverlap >= 1) {
            indexBoxes = this.pushEllipsisBox(indexBoxes, 'left');
        }

        indexBoxes = this.addRangeDetails(leftDeltaCoverage,rightDeltaCoverage, indexBoxes);

        if (rightOverlap >= 1) {
            indexBoxes = this.pushEllipsisBox(indexBoxes, 'rihgt');
        }

        if (rightDeltaCoverage < pagesCount-1) {
            indexBoxes = this.addRangeDetails(endDeltaCoverage, pagesCount-1, indexBoxes);
        }


        return indexBoxes;
    }

    addRangeDetails(startIndex: number, endIndex: number, indexBoxes: Array<Box>) {
        const boxes = [...indexBoxes];

        for (let i = startIndex; i <= endIndex; i++) {
            boxes.push({
                pageIndex: i,
                active: this.props.currentIndex === i,
                type:BoxTypes.NUMBER
            })
        }

        return boxes;
    }

    pushEllipsisBox(indexBoxes: Array<Box>, key: string) {
        const boxes = [...indexBoxes];

        boxes.push({
            type: BoxTypes.ELLIPSIS,
            key: key,
            pageIndex: -99
        })

        return boxes;
    }

    renderIndexBox(box: Box) {
        return (
            <li className={`${styles.pageNumBox} ${box.active ? styles.activeIndex : ''}`} key={box.pageIndex}
                onClick={(ev)=> {this.props.pageIndexHandler(box.pageIndex)}}>
                {(box.pageIndex || 0) + 1}
            </li>
        );
    }

    renderEllipsis(key: string|undefined) {
        return (
            <li className={`${styles.ellipsisArea}`} key={key}>
               ...
            </li>
        );
    }

    render () {
        const indexBoxes = this.getIndexBoxes();
        return (
            <ul className={`${'ss'} data-table-pagination flex-container items-center`}>
                {indexBoxes.map((box) => {
                    return box.type === BoxTypes.NUMBER ? this.renderIndexBox(box)  : this.renderEllipsis(box.key);
                })}
            </ul>
        );
    }
}