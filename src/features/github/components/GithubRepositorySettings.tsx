import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useHotkeys } from '../../../hooks/useHotkeys';
import { HotkeyTooltip } from '../../hotkeytooltip/components/HotkeyTooltip';
import { useTooltips } from '../../tooltip/hooks/useTooltips';
import { Button } from '../../ui/Button/components/Button';
import { Input } from '../../ui/Input/components/Input';
import { useGithubContext } from '../context/GithubContext';
import './GithubRepositorySettings.css';

interface Props {
    onInteract?: () => void;
}

export const GithubRepositorySettings = ({ onInteract }: Props) => {
    const [state, dispatch] = useGithubContext();

    const about = useState<string>(state.data.description.about);
    const repositoryName = useState<string>(
        state.data.description.repositoryName,
    );
    const topics = useState<string>(state.data.description.topics.join(' '));
    const languagesChecked = useState<boolean>(state.data.visibility.languages);
    const packagesChecked = useState<boolean>(state.data.visibility.packages);
    const releasesChecked = useState<boolean>(state.data.visibility.releases);

    const handleSave = () => {
        dispatch({
            type: 'DESCRIPTION_SET',
            about: about[0],
            repositoryName: repositoryName[0],
            topics: topics[0].trim().length > 0 ? topics[0].split(' ') : [],
        });

        dispatch({
            type: 'VISIBILITY_SET',
            languages: languagesChecked[0],
            releases: releasesChecked[0],
            packages: packagesChecked[0],
        });

        onInteract?.();
    };

    useHotkeys([
        { hotkey: 'Enter', action: () => handleSave(), ignoreFocus: true },
    ]);

    return (
        <motion.div
            className='github-repository-settings'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <GithubRepositorySettingsTopline onInteract={onInteract} />
            <GithubRepositorySettingsContent
                topics={topics}
                repositoryName={repositoryName}
                about={about}
                languagesChecked={languagesChecked}
                packagesChecked={packagesChecked}
                releasesChecked={releasesChecked}
            />
            <GithubRepositorySettingsBottom handleSave={handleSave} />
        </motion.div>
    );
};

interface ToplineProps {
    onInteract?: () => void;
}

const GithubRepositorySettingsTopline = ({ onInteract }: ToplineProps) => {
    const tooltips = useTooltips();

    return (
        <div className='github-repository-settings-topline'>
            {tooltips.render()}

            <h4>Edit repository details</h4>
            <Button
                className='github-cancel-button'
                ref={(el) => tooltips.set(0, 'Cancel', el, 'up', 16)}
                onClick={() => onInteract?.()}
            >
                ✕
            </Button>
        </div>
    );
};

interface ContentProps {
    repositoryName: [string, React.Dispatch<React.SetStateAction<string>>];
    about: [string, React.Dispatch<React.SetStateAction<string>>];
    topics: [string, React.Dispatch<React.SetStateAction<string>>];
    languagesChecked: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    packagesChecked: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    releasesChecked: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const GithubRepositorySettingsContent = ({
    repositoryName,
    about,
    topics,
    languagesChecked,
    packagesChecked,
    releasesChecked,
}: ContentProps) => {
    return (
        <div className='github-repository-settings-content'>
            <div className='github-repository-settings-field'>
                <h4>Repository name</h4>
                <Input
                    placeholder='Repository name'
                    value={repositoryName[0]}
                    onChange={(val) => repositoryName[1](val)}
                    onClear={() => repositoryName[1]('')}
                />
            </div>

            <div className='github-repository-settings-field'>
                <h4>Description</h4>
                <Input
                    placeholder='Description'
                    value={about[0]}
                    onChange={(val) => about[1](val)}
                    onClear={() => about[1]('')}
                />
            </div>

            <div className='github-repository-settings-field'>
                <h4>
                    Topics <small>(separate with spaces)</small>
                </h4>
                <Input
                    placeholder='Topics'
                    value={topics[0]}
                    onChange={(val) => topics[1](val)}
                    onClear={() => topics[1]('')}
                />
            </div>

            <div className='github-repository-settings-field'>
                <h4>Include in the form description </h4>

                <label>
                    <input
                        type='checkbox'
                        checked={languagesChecked[0]}
                        onChange={(e) => languagesChecked[1](e.target.checked)}
                    />
                    Languages
                </label>

                <label>
                    <input
                        type='checkbox'
                        checked={packagesChecked[0]}
                        onChange={(e) => packagesChecked[1](e.target.checked)}
                    />
                    Packages
                </label>

                <label>
                    <input
                        type='checkbox'
                        checked={releasesChecked[0]}
                        onChange={(e) => releasesChecked[1](e.target.checked)}
                    />
                    Releases
                </label>
            </div>
        </div>
    );
};

interface BottomProps {
    onInteract?: () => void;
    handleSave: () => void;
}

const GithubRepositorySettingsBottom = ({
    onInteract,
    handleSave,
}: BottomProps) => {
    const tooltips = useTooltips();

    return (
        <div className='github-repository-settings-bottom'>
            {tooltips.render()}

            <Button
                ref={(el) => tooltips.set(0, 'Cancel', el, 'down', 16)}
                onClick={() => onInteract?.()}
            >
                Cancel
                <HotkeyTooltip hotkeys={['Esc']} />
            </Button>

            <Button
                ref={(el) =>
                    tooltips.set(1, 'Apply and update changes', el, 'down', 16)
                }
                onClick={handleSave}
                className='github-save-button'
            >
                Save changes
                <HotkeyTooltip hotkeys={['Enter']} />
            </Button>
        </div>
    );
};
