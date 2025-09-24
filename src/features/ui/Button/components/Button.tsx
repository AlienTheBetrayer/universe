import './Button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button = ({ className, children, ...rest }: Props) => {
    return (
        <button className={`button ${className ?? ''}`} {...rest}>
            { children }
        </button>
    )   
}