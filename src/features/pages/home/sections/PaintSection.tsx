import './PaintSection.css';
import { RevealingContainer } from "../../../revealingcontainer/components/RevealingContainer"
import { Paint } from '../../../paint/components/Paint';

export const PaintSection = () => {
    return (
        <RevealingContainer>
            <section className='container'>
                <Paint/>
            </section>
        </RevealingContainer>
    )
}