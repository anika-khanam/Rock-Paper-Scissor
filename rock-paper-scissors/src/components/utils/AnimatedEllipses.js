import React, { useEffect, useState } from 'react';

const AnimatedEllipses = ({ speed }) => {
    const [els, setEls] = useState('.')

    useEffect(() => {
        const interval = setInterval(() => {
			setEls((prevEls) => {
				if (prevEls === ".") { return ".."; }
				if (prevEls === "..") { return "..."; }
				return ".";
			})
		}, speed)

		return () => clearInterval(interval);
    })
    return (
        <span>{els}</span>
    );
};

export default AnimatedEllipses;