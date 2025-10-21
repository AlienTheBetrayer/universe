import './GridSection.css';
import { motion } from 'motion/react';
import { SphereCard } from '../../../spherecard/components/SphereCard';
import { useEffect } from 'react';
import gsap from 'gsap';
import { RevealingContainer } from '../../../revealingcontainer/components/RevealingContainer';

export const GridSection = () => {
    const hard = [
        {
            title: 'Advanced React Patterns',
            description:
                'Build <b><mark>scalable UIs</mark></b> with React using reusable <b>hooks, Context, Redux, and Zustand</b>. Focus on performance, <u>accessibility</u>, and <b>maintainable architecture.</b>',
            hoverDescription:
                'Go beyond fundamentals with <b>advanced component patterns</b>, <i>memoization</i> for <mark>rendering efficiency</mark>, and fine-grained <b>state separation</b>. Design <b><u>modular architectures</u></b> that scale with project complexity. Leverage <mark>lazy loading</mark>, <b>dynamic imports</b>, and <i>custom hooks</i> to streamline performance while maintaining clarity and stability.',
        },
        {
            title: 'TypeScript Proficiency',
            description:
                'Use <b><mark>TypeScript</mark></b> for <u>strict types</u>, generics, and unions to <b>ensure</b> predictable, error-free, large-scale code.',
            hoverDescription:
                'Apply <b><mark>type-driven architecture</mark></b> to prevent <u>runtime errors</u> and ensure consistency across layers. Extend logic with <b>custom utility types</b>, <mark>mapped types</mark>, and <i>advanced generics</i> for reusable abstractions. Integrate seamlessly with React and APIs to achieve <b>strong type safety</b> and <i>predictable scalability</i>.',
        },
        {
            title: 'Responsive Design & CSS',
            description:
                'Create <b><mark>adaptive layouts</mark></b> with <b>Grid, Flexbox</b>, and component-driven styling. Fully responsive across all screen sizes.',
            hoverDescription:
                'Adopt a <b><mark>mobile-first strategy</mark></b> using Grid and Flexbox for <i>seamless adaptability</i>. Implement <b>CSS variables</b>, <i>mixins</i>, and <u>design tokens</u> to unify themes across components. Combine tools like <mark>Tailwind</mark>, CSS Modules, and styled-components to deliver <b>clean, consistent, and accessible</b> front-end systems.',
        },
        {
            title: 'Animations, 3D & UX',
            description:
                'Develop <b>motion-rich UIs</b> using <mark>Framer Motion, GSAP, and Three.js.</mark> Blend animation with UX to <b>enhance</b> flow and feedback.',
            hoverDescription:
                'Create <b><mark>immersive interfaces</mark></b> by blending <i>micro-interactions</i> with meaningful motion. Use <b>Framer Motion</b> for declarative animation flow, <mark>GSAP</mark> for timeline precision, and <b>Three.js</b> for <u>real-time 3D experiences</u>. Integrate motion as a <i>functional layer</i> of UX that enhances clarity, storytelling, and emotional engagement.',
        },
    ];

    const soft = [
        {
            title: 'Technical Leadership',
            description:
                'Lead with <b><mark>clarity</mark></b>, aligning design, code, and business. Mentor peers and guide architecture for stable delivery.',
            hoverDescription:
                'Blend <b><mark>strategic vision</mark></b> with hands-on guidance to bridge <i>technical</i> and <i>creative</i> disciplines. Establish <b>best practices</b>, enforce <u>standards</u>, and maintain <mark>detailed documentation</mark>. Mentor teammates, encourage <b>knowledge-sharing</b>, and ensure <i>architectural consistency</i> for sustainable scalability.',
        },
        {
            title: 'Autonomous Execution',
            description:
                'Own <b><mark>end-to-end builds</mark></b>. Have single-handedly delivered full applications with complete architecture and deployment.',
            hoverDescription:
                'Deliver <b><mark>full-scale applications</mark></b> independently—from concept to deployment. Manage architecture, <i>infrastructure</i>, testing, and CI/CD pipelines with <b>precision</b>. Maintain <mark>high-quality standards</mark> under pressure, balancing <i>speed</i> and <u>technical depth</u> while executing autonomously with measurable results.',
        },
        {
            title: 'Design-Driven Thinking',
            description:
                'Code with <b><mark>design intent</mark></b>, turning layout and motion into clear, functional UX.',
            hoverDescription:
                'Collaborate with designers to <b><mark>translate visual language</mark></b> into interactive, intuitive products. Prototype quickly to validate flow and <i>interaction logic</i>. Apply <b>UX heuristics</b> and maintain a <u>consistent visual rhythm</u> that merges design craft with engineering precision for a truly unified user experience.',
        },
        {
            title: 'Professional Collaboration',
            description:
                'Work with <b><mark>transparency</mark></b> across teams, keeping communication and accountability consistent.',
            hoverDescription:
                'Engage <b><mark>cross-functionally</mark></b> with designers, engineers, and stakeholders to maintain <i>clear communication</i> and aligned goals. Encourage <u>open feedback loops</u> and build trust through documentation and clarity. Cultivate <b>team synergy</b> where ownership is shared and delivery is <mark>predictable, consistent, and professional</mark>.',
        },
    ];

    useEffect(() => {
        const headings = document.querySelectorAll('.heading-subgrid > h2');

        headings.forEach((h) => {
            gsap.to(h, {
                '--mask-stop': '80%',
                duration: 4,
                delay: 4,
            });
        });
    }, []);

    return (
        <RevealingContainer>
            <motion.section
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                className='container'
            >
                <div className='heading-grid'>
                    <div className='heading-subgrid'>
                        <h2>Stack</h2>

                        <div className='heading-showcase-grid'>
                            {hard.map((skill) => (
                                <SphereCard
                                    key={skill.title}
                                    title={skill.title}
                                    description={skill.description}
                                    hoverDescription={skill.hoverDescription}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='heading-subgrid'>
                        <h2>Qualities</h2>

                        <div className='heading-showcase-grid'>
                            {soft.map((skill) => (
                                <SphereCard
                                    key={skill.title}
                                    title={skill.title}
                                    description={skill.description}
                                    hoverDescription={skill.hoverDescription}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </RevealingContainer>
    );
};
