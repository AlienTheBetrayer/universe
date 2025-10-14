import { useState } from 'react';
import { Button } from '../../ui/Button/components/Button';
import { Input } from '../../ui/Input/components/Input';
import { useGithubContext } from '../context/GithubContext'
import './GithubRepositorySettings.css'
import { motion } from 'motion/react'
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useHotkeys } from '../../../hooks/useHotkeys';

interface Props {
    onInteract?: () => void;
}

export const GithubRepositorySettings = ({ onInteract }: Props) => {
    const [context, setContext] = useGithubContext();

    const [description, setDescription] = useState<string>(context.data.description.about);
    const [topics, setTopics] = useState<string>(context.data.description.topics.join(' '));

    const handleSave = () => {
        setContext(prev => ({ ...prev, data: { ...prev.data, description: { ...prev.data.description, about: description, topics: topics.split(' ') } }}));
        onInteract?.();
    }

    useHotkeys([
        { hotkey: 'Enter', action: () => handleSave() }
    ]);

    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }
            
            <motion.div className='github-repository-settings'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <div className='github-repository-settings-topline'>
                    <h4>Edit repository details</h4>
                    <Button 
                    ref={el => tooltips.set(0, 'Cancel', el, 'up', 16)}
                    onClick={() => onInteract?.()}>
                        ✕
                    </Button>
                </div>
    
                <div className='github-repository-settings-content'>
                    <div className='github-repository-settings-field'>
                        <h4>Description</h4>
                        <Input 
                        value={description}
                        onChange={val => setDescription(val)}/>
                    </div>

                    <div className='github-repository-settings-field'>
                        <h4>Topics <small>(separate with spaces)</small></h4>
                        <Input 
                        value={topics}
                        onChange={val => setTopics(val)}/>
                    </div>
                </div>

                <div className='github-repository-settings-bottom'>
                    <Button 
                    ref={el => tooltips.set(1, 'Cancel', el, 'down', 16)}
                    onClick={() => onInteract?.()}>
                        Cancel
                        <HotkeyTooltip hotkeys={['Esc']}/>
                    </Button>

                    <Button 
                    ref={el => tooltips.set(2, 'Apply and update changes', el, 'down', 16)}
                    onClick={handleSave}
                    className='github-repository-settings-save-button'>
                        Save changes
                        <HotkeyTooltip hotkeys={['Enter']}/>
                    </Button>
                </div>
            </motion.div>
        </>
    )
}