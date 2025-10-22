import { ForgeCard } from './ForgeCard';
import './ForgeCards.css';

interface Props {}

export const ForgeCards = () => {
    return (
        <div className='forge-cards'>
            {Array.from({ length: 9 }).map((_, idx) => (
                <ForgeCard key={idx}/>
            ))}
        </div>
    );
};
