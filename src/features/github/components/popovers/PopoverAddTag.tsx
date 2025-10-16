import './PopoverAddTag.css';
import { GithubPopover } from "./GithubPopover"

interface Props {
    onCancel?: () => void;
}

export const PopoverAddTag = ({ onCancel }: Props) => {
    return (
        <GithubPopover 
        className='popover-add-tag'
        onCancel={() => onCancel?.()}
        title='<mark>Add</mark> a Tag'>
            hi
        </GithubPopover>
    )
}