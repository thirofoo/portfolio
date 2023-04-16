import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header'

type Props = {
    children?: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={
            'text-slate-400 bg-slate-200'
        }>
            <Head>
                <title>MyTemplate</title>
            </Head>

            <Header></Header>

            <div className={
                'h-screen'
            }>{children}</div>

            <footer>
                <p>2023/4 through</p>
            </footer>
        </div>
    );
};
export default Layout;