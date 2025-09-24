import './GridSection.css';
import { motion } from "motion/react";
import { SphereCard } from "../../../spherecard/components/SphereCard";

export const GridSection = () => {
    const hard = [
    {
        title: 'React Architecture',
        description: 'Design complete front-end architectures with React, including reusable components, state management, and performance tuning.',
        hoverDescription: 'Design complete front-end architectures with React. From custom hooks to reusable component libraries, state management, and performance tuning, ensuring scalable and maintainable applications.'
    },
    {
        title: 'TypeScript Mastery',
        description: 'Use advanced TypeScript to enforce type safety, reduce errors, and build reliable front-end applications.',
        hoverDescription: 'Leverage TypeScript to enforce type safety, reduce bugs, and create highly predictable code. Build complex types, generics, and utility functions for professional-grade reliability.'
    },
    {
        title: 'Motion & 3D',
        description: 'Build interactive experiences with Framer Motion and Three.js, combining smooth UI transitions with 3D visuals.',
        hoverDescription: 'Create immersive interactive experiences using Framer Motion for smooth UI transitions and Three.js for advanced 3D rendering, particle systems, and real-time visual effects.'
    },
    {
        title: 'Scalable Code Practices',
        description: 'Write modular, maintainable, and scalable code that balances readability, performance, and stability.',
        hoverDescription: 'Follow best practices like SOLID principles, modular design, and consistent coding standards. Write code that’s easy to scale, easy to read, and built for long-term maintainability.'
    }
    ];

    const soft = [
    {
        title: 'Adaptive Problem Solving',
        description: 'Adjust quickly to new challenges and frameworks while finding practical solutions.',
        hoverDescription: 'Quickly adapt to new technologies, frameworks, and challenges. Approach obstacles with creativity, persistence, and a methodical problem-solving mindset.'
    },
    {
        title: 'Creative Systems Thinking',
        description: 'Connect design, features, and architecture into cohesive solutions.',
        hoverDescription: 'Think beyond individual features. Design cohesive, integrated systems that bring UI, architecture, and user experience together seamlessly.'
    },
    {
        title: 'Focused Persistence',
        description: 'Stay consistent and focused through demanding projects and complex problems.',
        hoverDescription: 'Maintain sharp focus and resilience through long coding sessions or tough problem-solving situations, delivering results no matter the pressure.'
    },
    {
        title: 'User-Centered Innovation',
        description: 'Keep user experience central while balancing design, functionality, and accessibility.',
        hoverDescription: 'Prioritize the end-user experience in every decision. Balance aesthetics, performance, and accessibility to create apps that are both powerful and delightful to use.'
    }
    ];

    return (
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
    )
}