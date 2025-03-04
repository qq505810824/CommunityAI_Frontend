import cn from 'classnames';
import type { FC } from 'react';

type Option = {
    value: string;
    text: string;
    icon?: React.ReactNode;
};
type TabSliderProps = {
    className?: string;
    optionClassName?: string;
    optionSelectClassName?: string;
    value: string;
    onChange: (v: string) => void;
    options: Option[];
};
const TabSliderNew: FC<TabSliderProps> = ({
    className,
    optionClassName,
    optionSelectClassName,
    value,
    onChange,
    options
}) => {
    return (
        <div className={cn(className, 'relative  flex flex-wrap')}>
            {options.map((option) => (
                <div
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={cn(
                        'mr-1 px-3 py-[7px] h-[32px] flex items-center rounded-lg border-[0.5px] border-transparent text-gray-700 text-[13px] font-medium leading-[18px] cursor-pointer hover:bg-gray-200',
                        value === option.value &&
                            (optionSelectClassName ||
                                'bg-white border-gray-200 shadow-xs text-primary-600 hover:bg-white'),
                        optionClassName
                    )}
                >
                    {option.icon}
                    {option.text}
                </div>
            ))}
        </div>
    );
};

export default TabSliderNew;
