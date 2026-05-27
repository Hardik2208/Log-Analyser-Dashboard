import React, { useEffect, useState, useRef } from 'react';

const AnimatedNumber = ({ value, duration = 800, decimals = 0, prefix = '', suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef(null);
  const startValue = useRef(0);

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuart
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      const currentVal = startValue.current + (value - startValue.current) * ease;
      setDisplayValue(currentVal);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <span className={className} style={{ fontFamily: 'var(--font-mono)' }}>
      {prefix && <span style={{ opacity: 0.7, fontSize: '0.8em', marginRight: '2px' }}>{prefix}</span>}
      {formattedValue}
      {suffix && <span style={{ opacity: 0.7, fontSize: '0.8em', marginLeft: '2px' }}>{suffix}</span>}
    </span>
  );
};

export default AnimatedNumber;
