import './Content.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    
}

export const Content = ({ children, ...rest }: Props) => {
    return (
        <div className='content' {...rest}>
            { children }
        </div>
    )
}