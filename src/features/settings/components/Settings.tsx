import type React from 'react';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import './Settings.css';
import { useLocalStore } from '../../../zustand/localStore';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    toggleKey?: string;
}

export const Settings = ({ toggleKey }: Props) => {
    const { theme, toggleTheme } = useLocalStore();

    return (
        <ToggleButton key={toggleKey} value={theme == 'light'} onToggled={() => toggleTheme()} />
    )
}