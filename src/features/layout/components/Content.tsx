import './Content.css';

interface Props {
    children?: React.ReactNode;
}

export const Content = ({ children }: Props) => {
    return (
        <div className='content'>
            { children }
        </div>
    )
}