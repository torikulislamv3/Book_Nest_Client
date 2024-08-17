import { useLoaderData } from "react-router-dom"
import SingleBook from "./Components/SingleBook";

const Home = () => {
  const Book_items = useLoaderData();
  console.log(Book_items)
  return (
    <div>
        this is loader for {Book_items.length}
        {
          Book_items.map((item)=> <SingleBook key={item._id} item = {item}></SingleBook>)
        }
    </div>
  )
}

export default Home