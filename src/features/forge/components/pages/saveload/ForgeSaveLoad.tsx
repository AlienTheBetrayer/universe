import { useState } from 'react';
import { Button } from '../../../../ui/Button/components/Button';
import { Input } from '../../../../ui/Input/components/Input';
import { SelectorMenu } from '../../../../ui/SelectorMenu/components/SelectorMenu';
import { useWorldContext } from '../../../context/WorldContext';
import { ForgePageTemplate } from '../ForgePageTemplate';
import { useForgeSaveLoad } from '../hooks/useForgeSaveLoad';
import './ForgeSaveLoad.css';

interface Props {
    onInteract?: () => void;
}

export const ForgeSaveLoad = ({ onInteract }: Props) => {
    const [, dispatch] = useWorldContext();

    const [saveInputValue, setSaveInputValue] = useState<string>('');

    const controller = useForgeSaveLoad();

    return (
        <ForgePageTemplate
            className='forge-save-load'
            onInteract={() => onInteract?.()}
            title='Save or load a <mark>world</mark>!'
        >
            <SelectorMenu
                items={[
                    {
                        name: 'Save',
                        jsx: (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <h4>
                                    World's <mark>name</mark>
                                    <small> (5 characters minimum) </small>
                                </h4>
                                <Input
                                    placeholder='Enter...'
                                    value={saveInputValue}
                                    onChange={(val) => setSaveInputValue(val)}
                                    onClear={() => setSaveInputValue('')}
                                />
                                <Button
                                    enabled={saveInputValue.length >= 5}
                                    onClick={() =>
                                        controller.save(
                                            saveInputValue.replaceAll(' ', '_')
                                        )
                                    }
                                >
                                    Save <small>(to your computer)</small>
                                </Button>
                            </div>
                        ),
                    },
                    {
                        name: 'Load',
                        jsx: (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        controller.load().then((val) => {
                                            onInteract?.();
                                            dispatch({
                                                type: 'LOAD_WORLD',
                                                world: val,
                                            });
                                            dispatch({
                                                type: 'GENERATE_FIELD',
                                            });
                                        });
                                    }}
                                >
                                    Load <small>(open a file)</small>
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />
        </ForgePageTemplate>
    );
};
