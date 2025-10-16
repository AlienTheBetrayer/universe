import { Input } from "../../../ui/Input/components/Input";
import { useGithubContext, type FormContent } from "../../context/GithubContext";
import { GithubPopover } from "./GithubPopover";

interface Props {
    newContent: FormContent;
    onCancel?: () => void;
}

export const PopoverFormEditCommit = ({ newContent, onCancel }: Props) => {
    const [context, setContext] = useGithubContext();
    
    return (
        <GithubPopover
        title='<mark>Commit</mark> this <b>change</b>'
        className='popover-form-edit-commit'
        onCancel={() => onCancel?.()}
        success={{ text: 'Commit', action: () => {
            setContext(prev => {
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        currentForm: false,
                        commits: [...prev.data.commits],
                        branches: prev.data.branches.map(b =>
                            b.idx === prev.data.currentBranch
                            ? {
                                ...b,
                                forms: b.forms.map(f =>
                                    f.idx === prev.data.currentForm
                                    ? { ...f, content: newContent }
                                    : f
                                ),
                                }
                            : b
                    )}}})}
                }}>
            <h4>Name</h4>
            <Input/>
            <h4>Description</h4>
            <Input/>
        </GithubPopover>
    )
}