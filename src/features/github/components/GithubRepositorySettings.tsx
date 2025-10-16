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
    const [repoName, setRepoName] = useState<string>(context.data.repositoryName);
    const [topics, setTopics] = useState<string>(context.data.description.topics.join(' '));
    const [languagesChecked, setLanguagesChecked] = useState<boolean>(context.data.visibility.languages);
    const [packagesChecked, setPackagesChecked] = useState<boolean>(context.data.visibility.packages);
    const [releasesChecked, setReleasesChecked] = useState<boolean>(context.data.visibility.releases);

    const handleSave = () => {
        setContext(prev => ({ ...prev,
            data: { 
                ...prev.data, 
                description: { 
                    ...prev.data.description, 
                    about: description, 
                    topics: topics.trim().length === 0 ? [] : topics.split(' ')
                }, visibility: {
                    languages: languagesChecked,
                    packages: packagesChecked,
                    releases: releasesChecked
                },
                repositoryName: repoName
        }}));
        onInteract?.();
    }

    useHotkeys([
        { hotkey: 'Enter', action: () => handleSave(), ignoreFocus: true }
    ]);

    const tooltips = useTooltips();

    return (
        <>
            { tooltips.render() }
            
            <motion.div className='github-repository-settings'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                {/* top */}
                <div className='github-repository-settings-topline'>
                    <h4>Edit repository details</h4>
                    <Button 
                    className='github-cancel-button'
                    ref={el => tooltips.set(0, 'Cancel', el, 'up', 16)}
                    onClick={() => onInteract?.()}>
                        ✕
                    </Button>
                </div>

                {/* content */}
                <div className='github-repository-settings-content'>
                    <div className='github-repository-settings-field'>
                        <h4>Repository name</h4>
                        <Input
                        placeholder='Repository name'
                        value={repoName}
                        onChange={val => setRepoName(val)}/>
                    </div>

                    <div className='github-repository-settings-field'>
                        <h4>Description</h4>
                        <Input
                        placeholder='Description'
                        value={description}
                        onChange={val => setDescription(val)}/>
                    </div>

                    <div className='github-repository-settings-field'>
                        <h4>Topics <small>(separate with spaces)</small></h4>
                        <Input 
                        placeholder='Topics'
                        value={topics}
                        onChange={val => setTopics(val)}/>
                    </div>

                    <div className='github-repository-settings-field'>
                        <h4>Include in the form description </h4>

                        <label>
                            <input type='checkbox'
                            checked={languagesChecked}
                            onChange={e => setLanguagesChecked(e.target.checked)}/>
                            Languages
                        </label>

                        <label>
                            <input type='checkbox'
                            checked={packagesChecked}
                            onChange={e => setPackagesChecked(e.target.checked)}/>
                            Packages
                        </label>

                        <label>
                            <input type='checkbox'
                            checked={releasesChecked}
                            onChange={e => setReleasesChecked(e.target.checked)}/>
                            Releases
                        </label>
                    </div>
                </div>

                {/* bottom */}
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
                    className='github-save-button'>
                        Save changes
                        <HotkeyTooltip hotkeys={['Enter']}/>
                    </Button>
                </div>
            </motion.div>
        </>
    )
}