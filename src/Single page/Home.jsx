import { useLoaderData } from "react-router-dom"
import SingleBook from "./Components/SingleBook";

const Home = () => {
  const Book_items = useLoaderData();
  console.log(Book_items)
  return (
    <div>
       
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
       {
          Book_items.map((item)=> <SingleBook key={item._id} item = {item}></SingleBook>)
        }
       </section>
    </div>
  )
}

export default Home