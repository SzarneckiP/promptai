import '@styles/global.css'
import { Nav, Provider } from '@components'

export const metadata = {
    title: 'PromptAI | Generate prompts for Chat AI',
    description: 'Generate simple prompts for AI Chat like a professional to being better!',
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout