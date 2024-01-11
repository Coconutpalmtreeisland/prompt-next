import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptivortex ",
    description: 'Discover & Share AI Promtpts, AI 프롬포트 검색 & 공유'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='ko'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout