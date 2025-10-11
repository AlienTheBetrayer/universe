import './PaintSection.css';
import { RevealingContainer } from "../../../revealingcontainer/components/RevealingContainer"
import { Paint } from '../../../paint/components/Paint';
import { PaintProvider } from '../../../paint/context/PaintContext';

export const PaintSection = () => {
    return (
        <PaintProvider>
            <RevealingContainer>
                <section className='container'>
                    <h2><mark>Painting & Drawing</mark> abilities</h2>
                    <Paint/>
                </section>
            </RevealingContainer>
        </PaintProvider>
    )
}