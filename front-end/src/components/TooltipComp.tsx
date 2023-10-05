import React, { useMemo, useState } from 'react'
import { Button, Divider, Segmented, Tooltip } from 'antd';

interface TooltipProps {
    text: String,
    children: any
}

const TooltipComp:React.FC<TooltipProps> = ({text, children}) => {
    const options = ['Show', 'Hide', 'Center'];
    const [arrow, setArrow] = useState('Show');

    const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <Tooltip placement="bottom" title={text} arrow={mergedArrow}>
        {children}
    </Tooltip>
  )
}

export default TooltipComp