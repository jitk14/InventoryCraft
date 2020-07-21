import React from 'react';
import styles from './pagination.module.scss';

interface IPaginationProps {
    itemsPerPage: number;
    totalLength: number;
    currentIndex: number;
    deltaCoverage? : number;
    pageIndexHandler: (index: number) => void;
}

export class Pagination extends React.Component<IPaginationProps, any> {
    constructor(props: IPaginationProps) {
        super(props);
    }

    getIndexBoxes() {
        const deltaCoverage = this.props.deltaCoverage || 1;
        const pagesCount = Math.ceil(this.props.totalLength / this.props.itemsPerPage);
        const indexBoxes = [];

        const startDeltaCoverage = deltaCoverage;
        const endDeltaCoverage = this.props.totalLength - deltaCoverage - 1;
        const rightDeltaCoverage = Math.max(this.props.currentIndex - deltaCoverage, 0);
        const leftDeltaCoverage = Math.min(this.props.currentIndex + deltaCoverage, this.props.totalLength-1);


    }

    generateBoxDetails(startIndex: number, endIndex: number) {
        const boxDetails = [];

        for (let i = startIndex; i <= endIndex; i++) {

        }
    }

    render () {
        return (
            <ul className={`${'ss'} data-table-pagination flex-container items-center`}>
                <li className={`${styles.pageNumBox}`}>1</li>
                <li className={`${styles.pageNumBox}`}>2</li>
                <li className={`${styles.ellipsisArea}`}>...</li>
                <li className={`${styles.pageNumBox}`}>5</li>
            </ul>
        );
    }
}