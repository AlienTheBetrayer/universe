import { Page } from "../../layout/components/Page"
import { HomeCanvas } from "../components/HomeCanvas"

export const Home = () => {
    return (
        <Page>
            <section>
                <h1 className='text-center'>The beginning of something great</h1>

                <HomeCanvas/>
            </section>
        </Page>
    )
}