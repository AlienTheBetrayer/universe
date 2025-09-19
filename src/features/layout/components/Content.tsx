import './Content.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const Content = ({ children, ...rest }: Props) => {
    return (
        <div className='content' {...rest}>
            { children }
        </div>
    )
}