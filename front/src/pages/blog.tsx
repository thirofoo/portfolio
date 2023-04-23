import type { NextPage } from 'next';
import {useState,useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';

type Article = {
  ID: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  title: string
  body: string
}

const Home: NextPage = () => {

	const [articles, setArticle] = useState<Article[]>([])
  useEffect(() => {
    const fetcharticle = async () => {
      const response = await fetch('http://localhost:3000/api/article')
      const data = await response.json()
      setArticle(data)
    }
    fetcharticle()
  },[])

  return (
    <>
			<div className={
        'text-center text-4xl p-10'
      }>
      	{articles.map( (article) => (
					<div key={article.ID}>
						<h2>{article.title}</h2>
						<div>{article.body}</div>
					</div>
      	))}

        <button className={
          'm-20 p-20 bg-bg-primary shadow-lg hover:bg-bg-secondary hover:shadow-none'
        }>
          More
        </button>
    	</div>

    </>
  );
};

export default Home;