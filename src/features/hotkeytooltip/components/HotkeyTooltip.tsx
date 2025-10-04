import './HotkeyTooltip.css';

interface Props {
    className?: string;
    hotkeys?: string[];
}

export const HotkeyTooltip = ({ className, hotkeys }: Props) => {
    return (
        <div className={`hotkey-tooltip ${className ?? ''}`}>
            { hotkeys?.map((hotkey, idx) => (
                <span key={idx}>{ hotkey }</span>
            ))}
        </div>
    )
}