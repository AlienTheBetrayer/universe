import './BackgroundBlur.css';

interface Props {
    zIndex?: number;
}

export const BackgroundBlur = ({ zIndex }: Props) => {
    return (
        <div className='background-blur' style={{ zIndex: zIndex }}>

        </div>
    )
}