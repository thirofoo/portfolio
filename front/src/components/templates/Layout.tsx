import Head from 'next/head';
import { ReactNode } from 'react';
import Header from '../organisms/Header'

type Props = {
    children?: ReactNode;
};

const Layout = ({ children }: Props) => {
    // body要素の全体的な構造の定義
    return (
        <>
            <Header></Header>

            <div className={
                'h-screen'
            }>{children}</div>

            <footer>
                <p>2023/4 through</p>
            </footer>
        </>
    );
};
export default Layout;