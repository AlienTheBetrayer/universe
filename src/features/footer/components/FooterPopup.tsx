import './FooterPopup.css';

interface Props {
    left: number;
    top: number;
}


// MILLION RERENDERS!!!
export const FooterPopup = ({ left, top }: Props) => {

    
    return (
        <div className='footer-popup'
        style={{ left: left, top: top - 64 }}>
            hi
        </div>
    )
}