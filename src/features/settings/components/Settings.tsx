import type React from 'react';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import './Settings.css';
import { useAppStore } from '../../../zustand/store';
import { useEffect } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    toggleKey?: string;
}

export const Settings = ({ toggleKey }: Props) => {
    const { theme, toggleTheme } = useAppStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ToggleButton key={toggleKey} value={theme == 'light'} onToggled={() => toggleTheme()} />
    )
}