import './HotkeyTooltip.css';

interface Props {
    className?: string;
    hotkeys?: string[];
}

export const HotkeyTooltip = ({ className, hotkeys }: Props) => {
    return (
        <div className={`hotkey-tooltip ${className ?? ''}`}>
            { hotkeys?.map(hotkey => (
                    <span>{ hotkey }</span>
            ))}
        </div>
    )
}