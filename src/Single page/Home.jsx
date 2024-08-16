import { useLoaderData } from "react-router-dom"

const Home = () => {
  const Book_items = useLoaderData();
  console.log(Book_items)
  return (
    <div>
        this is loader for {Book_items.length}
        
    </div>
  )
}

export default Home