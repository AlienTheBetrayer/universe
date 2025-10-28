import { useState } from 'react';
import { Input } from '../../../ui/Input/components/Input';
import { SelectorMenu } from '../../../ui/SelectorMenu/components/SelectorMenu';
import { ForgePageTemplate } from './ForgePageTemplate';
import './ForgeSaveLoad.css';

type SaveLoadPage = 'save' | 'load';

interface Props {
    onInteract?: () => void;
}

export const ForgeSaveLoad = ({ onInteract }: Props) => {
    const [page, setPage] = useState<SaveLoadPage>('load');

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
                            <>
                                <h4>
                                    World's <mark>name</mark>
                                </h4>
                                <Input placeholder='Enter...' />
                            </>
                        ),
                    },
                    { name: 'Load', jsx: <></> },
                ]}
                onSelect={(item) => {
                    setPage(item.name === 'Save' ? 'save' : 'load');
                }}
            />
        </ForgePageTemplate>
    );
};
