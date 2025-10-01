import './StellarNetwork.css';
import { Page } from "../../../layout/components/Page"
import { StellarCanvas } from '../../../stellars/components/StellarCanvas';
import { useReducer } from 'react';
import { AnimatePresence } from 'motion/react';
import { StellarContext, StellarReducer, type StellarState } from '../../../stellars/context/StellarContext';
import { SelectedStellarUI } from '../../../stellars/components/SelectedStellarUI';
import { StellarUI } from '../../../stellars/components/StellarUI';
import { motion } from 'motion/react';

export const StellarNetwork = () => {
    const initial: StellarState = { 
        stellars: [
            {
                idx: 0,
                content: {
                    first: { 
                        title: 'Astra', 
                        description: [
                            'A bright blue planet with swirling clouds and glowing rings.',
                            'Its surface reflects light in a mesmerizing pattern.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'Rich in energy crystals',
                            'Atmosphere contains rare gases',
                            'Known to influence nearby starships with mild gravitational waves'
                        ] 
                    }
                }
            },
            {
                idx: 1,
                content: {
                    first: { 
                        title: 'Luna', 
                        description: [
                            'A silvery moon orbiting a gas giant, calm and serene.',
                            'Surface marked by deep craters and luminous streaks.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'High mineral content',
                            'Tidal pull affects nearby planets',
                            'Ideal for quiet observation outposts'
                        ] 
                    }
                }
            },
            {
                idx: 2,
                content: {
                    first: { 
                        title: 'Orbis', 
                        description: [
                            'A planet with multiple orbiting rings that shimmer in sunlight.',
                            'Cloud patterns shift rapidly across its surface.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'Magnetic storms are frequent',
                            'Rings composed of ice and rare metals',
                            'Stable rotation, excellent for colonization experiments'
                        ] 
                    }
                }
            },
            {
                idx: 3,
                content: {
                    first: { 
                        title: 'Nova', 
                        description: [
                            'A tiny star with a brilliant, pulsating light.',
                            'Flashes every few minutes, illuminating surrounding space.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'High radiation output',
                            'Core temperature extremely high',
                            'Flares can temporarily disrupt nearby communications'
                        ] 
                    }
                }
            },
            {
                idx: 4,
                content: {
                    first: { 
                        title: 'Aurora', 
                        description: [
                            'A gas giant with colorful auroras visible from space.',
                            'Bands of clouds swirl in hypnotic patterns.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'Strong magnetic field',
                            'Atmosphere rich in exotic gases',
                            'Auroral activity highly unpredictable'
                        ] 
                    }
                }
            },
            {
                idx: 5,
                content: {
                    first: { 
                        title: 'Lyra', 
                        description: [
                            'A rocky planet with jagged mountains and crystal caves.',
                            'Surface glows faintly in twilight.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'High mineral density',
                            'Contains rare crystals',
                            'Ideal for mining operations'
                        ] 
                    }
                }
            },
            {
                idx: 6,
                content: {
                    first: { 
                        title: 'Phoenix', 
                        description: [
                            'A volcanic planet with rivers of molten lava.',
                            'Eruptions are frequent, lighting up the skies.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'Surface temperature extremely high',
                            'Lava fields rich in rare metals',
                            'Volcanic activity generates unique energy signatures'
                        ] 
                    }
                }
            },
            {
                idx: 7,
                content: {
                    first: { 
                        title: 'Eclipse', 
                        description: [
                            'A dark planet that periodically blocks a nearby star.',
                            'Shadows move quickly across its jagged surface.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'Strong gravitational pull',
                            'Known for shadow phenomena',
                            'Minimal atmosphere, extreme temperature swings'
                        ] 
                    }
                }
            },
            {
                idx: 8,
                content: {
                    first: { 
                        title: 'Solara', 
                        description: [
                            'A radiant sun-like star, bright enough to light up nearby planets.',
                            'Emits powerful bursts of solar wind.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'High energy output',
                            'Influences planetary orbits nearby',
                            'Source of rare solar materials'
                        ] 
                    }
                }
            },
            {
                idx: 9,
                content: {
                    first: { 
                        title: 'Nebula', 
                        description: [
                            'A colorful cloud of gas and dust in space.',
                            'Glows softly, illuminating the void around it.'
                        ] 
                    },
                    second: { 
                        title: 'Properties', 
                        description: [
                            'Cradle of new stars',
                            'Contains complex molecules',
                            'Influences interstellar navigation'
                        ] 
                    }
                }
            }
        ],
        selected: -1,
        hovered: -1,
        editing: false
    };

    const [state, dispatch] = useReducer(StellarReducer, initial);    

    return (
        <Page>
            <StellarContext.Provider value={[state, dispatch]}>
                <motion.div className='stellar-wrapper'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: 'backInOut'}}>
                    <StellarCanvas/>

                    <AnimatePresence>
                        { state.selected !== -1 && (
                            <SelectedStellarUI idx={state.selected}/>
                        )}
                    </AnimatePresence>

                    <StellarUI/>
                </motion.div>
            </StellarContext.Provider>
        </Page>
    )
}