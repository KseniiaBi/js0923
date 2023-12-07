export default function Blog() {
  return (
    <main className=''>
      <h1>Blog</h1>
      <Article text={blog[0].text} title={blog[0].title} />
    </main>
  )
}

const blog = [
  {
    title: 'Article 1',
    text: `If you’re new to Next.js, check out the learn Next.js course.
    Next.js is maintained by Vercel. You can deploy a Next.js app to any Node.js or 
    serverless hosting, or to your own server. Next.js also supports a static 
    export which doesn’t require a server.`
  }
];

function Article(props){
  
  return(
    <article>
      <h2>{props.title}</h2>
      <p>{props.text}</p>   
      <button>click me!</button>  
    </article>
  )
}