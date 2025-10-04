import { CircleGrid } from '../../../circlegrid/components/CircleGrid';
import './ShiftingSection.css';

export const ShiftingSection = () => {
    return (
        <section className='shifting-section container'>
            <h2>Shifting capabilities</h2>
            
            <div className='shifting-section-grid'>
                <CircleGrid/>
            </div>
        </section>
    )
}