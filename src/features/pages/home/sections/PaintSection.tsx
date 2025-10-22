import { Paint } from '../../../paint/components/Paint';
import { PaintProvider } from '../../../paint/context/PaintContext';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';
import './PaintSection.css';

export const PaintSection = () => {
    return (
        <PaintProvider>
            <RevealingContainer>
                <section className='container'>
                    <hr />
                    <h2>
                        <mark>Painting & Drawing</mark> abilities
                    </h2>
                    <Paint />
                    <hr />
                </section>
            </RevealingContainer>
        </PaintProvider>
    );
};
