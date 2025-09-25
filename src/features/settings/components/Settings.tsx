import type React from 'react';
import { ToggleButton } from '../../ui/ToggleButton/ToggleButton';
import './Settings.css';
import { useAppStore } from '../../../zustand/store';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    toggleKey?: string;
}

export const Settings = ({ toggleKey }: Props) => {
    const appStore = useAppStore();

    return (
        <ToggleButton key={toggleKey} value={appStore.theme == 'light'} onToggled={() => appStore.toggleTheme()} />
    )
}