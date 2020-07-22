import React from "react";

export const AvailabilityColorCode = {
    ranges: [
        {
            start: 0,
            end: 10,
            color: '#dc4646'
        },
        {
            start: 11,
            end: 50,
            color: '#dc8866'
        },
        {
            start: 50,
            end: 100,
            color: '#dcbc73'
        },
        {
            start: 100,
            end: Number.POSITIVE_INFINITY,
            color: '#33cc44'
        },
    ],
    getColorCode: (value: number) => {
        for (let range of AvailabilityColorCode.ranges) {
            if (value >= range.start && value <= range.end ) {
                return range.color;
            }
        }
    }
}

export const AvailabilityColorContext = React.createContext(AvailabilityColorCode.getColorCode);