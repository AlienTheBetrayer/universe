import type React from 'react';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import './Settings.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    
}

export const Settings = ({ className }: Props) => {
    return (
        <div className={`settings ${className}`}>
            <ToggleButton/>
        </div>
    )
}