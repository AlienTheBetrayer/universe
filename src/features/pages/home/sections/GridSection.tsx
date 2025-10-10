import './GridSection.css';
import { motion } from "motion/react";
import { SphereCard } from "../../../spherecard/components/SphereCard";
import { useEffect } from 'react';
import gsap from 'gsap';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';

export const GridSection = () => {
    const hard = [
    {
        title: 'React Architecture',
        description: '<b><mark>Single-handedly</mark></b> built front-end architectures with <b>React</b>, including reusable components, state management, and performance tuning.',
        hoverDescription: 'Design <b>complete front-end architectures</b> with <i>React</i>. From custom hooks to reusable component libraries, state management, and performance tuning, ensuring <i>scalable and maintainable</i> applications.'
    },
    {
        title: 'TypeScript Mastery',
        description: 'Use <b>advanced <mark>TypeScript</mark></b> to enforce <b>type safety</b>, reduce <u>errors</u>, and build reliable front-end applications.',
        hoverDescription: '<b>Leverage TypeScript</b> to enforce <mark>type safety</mark>, reduce <u>bugs</u>, and create highly predictable code. Build complex types, generics, and utility functions for professional-grade reliability.'
    },
    {
        title: 'Motion & 3D',
        description: 'Build interactive experiences with <b>Framer Motion and <mark>Three.js</mark></b>, combining <i>smooth</i> UI transitions with 3D visuals.',
        hoverDescription: 'Create <b>immersive interactive experiences</b> using Framer Motion for smooth UI transitions and Three.js for <b>advanced 3D rendering</b>, particle systems, and real-time visual effects.'
    },
    {
        title: 'Scalable Code Practices',
        description: 'Write modular, maintainable, and scalable code that <mark>balances</mark> readability, performance, and stability.',
        hoverDescription: 'Follow best practices like SOLID principles, modular design, and consistent coding standards. Write code that\'s easy to scale, easy to read, and <b>built for long-term maintainability.</b>'
    }
    ];

    const soft = [
    {
        title: 'English Fluency',
        description: 'Communicate clearly and effectively in English across <b>written and spoken</b> formats, ensuring precise <mark>understanding</mark> in professional contexts.',
        hoverDescription: 'Demonstrate advanced English proficiency, enabling smooth <b>collaboration</b>, presentations, and documentation. Articulate complex ideas clearly to <i>international teams</i> and stakeholders, minimizing <mark>misunderstandings</mark>.'
    },
    {
        title: 'Independent Execution',
        description: 'Take full ownership of projects, from concept to deployment, handling all aspects of <b>development autonomously</b>.',
        hoverDescription: 'Plan, design, and implement entire projects <i>solo</i> with minimal supervision. Manage architecture, coding, testing, and deployment efficiently while maintaining <mark>high-quality standards</mark>.'
    },
    {
        title: 'Clean Code Mindset',
        description: 'Write <b>readable</b>, maintainable, and scalable code that reduces technical debt and supports <mark>long-term</mark> project stability.',
        hoverDescription: 'Prioritize <b>clarity, modularity, and maintainability</b> in all development work. Apply best practices and design patterns consistently to ensure code is easy to <i>extend</i>, debug, and review.'
    },
    {
        title: 'Professional Collaboration',
        description: 'Work <b>seamlessly</b> with <i>cross-functional</i> teams, fostering a <u>respectful</u>, productive, and solution-oriented environment.',
        hoverDescription: 'Engage effectively with <b>designers, engineers, and stakeholders</b>. Facilitate constructive feedback, transparent communication, and team alignment to achieve <mark>project goals</mark> efficiently.'
    }
    ];

    useEffect(() => {
        const headings = document.querySelectorAll('.heading-subgrid > h2');

        headings.forEach(h => {
            gsap.to(h, {
                '--mask-stop': '80%',
                duration: 4,
                delay: 4
            });
        });
    }, []); 

    return (
        <RevealingContainer>
            <motion.section
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            className='container'>
                <div className='heading-grid'>
                    <div className='heading-subgrid'>
                        <h2>Stack</h2>

                        <div className='heading-showcase-grid'>
                            { hard.map(skill => (
                                <SphereCard key={skill.title} title={skill.title} description={skill.description} hoverDescription={skill.hoverDescription}/>
                            ))}
                        </div>
                    </div>

                    <div className='heading-subgrid'>
                        <h2>Qualities</h2>

                        <div className='heading-showcase-grid'>
                            { soft.map(skill => (
                                <SphereCard key={skill.title} title={skill.title} description={skill.description} hoverDescription={skill.hoverDescription}/>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </RevealingContainer>
    )
}