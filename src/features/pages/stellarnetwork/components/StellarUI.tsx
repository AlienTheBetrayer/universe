import './StellarUI.css';

export interface StellarUIObject {
    title1?: string;
    description1?: string;
    title2?: string;
    description2?: string;
}

interface Props {
    object: StellarUIObject;
}

export const StellarUI = ({ object }: Props) => {
    return (
        <>
            <div className='stellar-ui-left'>
                <h2>{object.title1}</h2>
                <p>{object.description1}</p>
            </div>

            <div className='stellar-ui-right'>
                <h2>{object.title2}</h2>
                <p>{object.description2}</p>
            </div>
        </>
    )
}