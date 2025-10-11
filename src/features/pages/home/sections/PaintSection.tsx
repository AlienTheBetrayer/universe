import './PaintSection.css';
import { RevealingContainer } from "../../../revealingcontainer/components/RevealingContainer"
import { Paint } from '../../../paint/components/Paint';

export const PaintSection = () => {
    return (
        <RevealingContainer>
            <section className='container'>
                <h2><mark>Painting & Drawing</mark> abilities</h2>
                <Paint/>
            </section>
        </RevealingContainer>
    )
}