import { Button, Popover, Tooltip } from 'antd';


export const SubtitleInfo = ({ custom, children, title, className = "" }) => {
    return <div className="flex justify-between items-center">
        <div className="uppercase text-[16px] text-blue">
            {title}
        </div>
        {!custom ? children && <div>
            <Popover placement="rightTop" title={<div className="text-blue font-bold uppercase">{title}</div>} content={<div className="max-w-sm text-blue">{children}</div>} trigger="click">
                <Tooltip title="INFORMATION">
                    <button className={`p-2 text-blue ${className}`}> [ ? ]</button>
                </Tooltip>
            </Popover>
        </div> : children}

    </div>
}