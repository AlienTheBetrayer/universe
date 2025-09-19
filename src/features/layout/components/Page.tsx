interface PageSettings {

}

interface Props {
    settings?: PageSettings;
    children?: React.ReactNode;
}

export const Page = ({ settings, children }: Props) => {
    return (
        <main className='flex-col gap padding min-h-screen w-full bg'>
            { children }
        </main>
    )
}