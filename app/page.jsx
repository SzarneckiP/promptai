'use client'
import { Feed } from '../components'
import { motion } from 'framer-motion'
import { useSession } from "next-auth/react"

const Home = () => {

    const { data: session } = useSession()

    return (
        <motion.section
            className="w-full flex-center flex-col"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center"> AI-Powered Prompts</span>
            </h1>
            <p className="text-center desc">PromptAI is an open-source AI prompting tool for modern world to discover, create and share creative prompts.</p>

            {session?.user.id ? (
                <Feed />
            ) : (
                <h1 className='mt-32 text-5xl font-bold'>
                    Sign in first!
                </h1>
            )}

        </motion.section>
    )
}

export default Home