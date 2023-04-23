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
      <h1 className={
        'text-center text-4xl'
      }>This is My Blog !</h1>
			<div>
      	<ul>
      	  {articles.map( (article) => (
						<div key={article.ID}>
							<h2>{article.title}</h2>
							<div>{article.body}</div>
						</div>
      	  ))}
      	</ul>
    	</div>
    </>
  );
};

export default Home;