import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

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

            <header className={
                'flex justify-between p-10'
            }>
                <Link href='/' legacyBehavior>
                    <a className={
                        'text-9xl m-auto'
                    }>Portfolio</a>
                </Link>
                <div className={
                    'text-4xl m-auto'
                }>
                    <Link href='/AboutMe' legacyBehavior>
                        <a className={
                            'block p-2'
                        }>AboutMe</a>
                    </Link>
                    <Link href='/Works' legacyBehavior>
                        <a className={
                            'block p-2'
                        }>Works</a>
                    </Link>
                    <Link href='/Blog' legacyBehavior>
                        <a className={
                            'block p-2'
                        }>Blog</a>
                    </Link>
                </div>
            </header>

            <div className={
                'h-screen bg-slate-200'
            }>{children}</div>

            <footer className={
                'text-2xl'
            }>
                <p>2023/4 through</p>
            </footer>
        </div>
    );
};

export default Layout;