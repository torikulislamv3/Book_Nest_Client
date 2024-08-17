import { useLoaderData } from "react-router-dom"
import SingleBook from "./Components/SingleBook";

const Home = () => {
  const Book_items = useLoaderData();
  console.log(Book_items)
  return (
    <div>

      <section className="flex justify-between mt-6">
      <select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Select Category</option>
  <option>Programming Language</option>
  <option>Science Fiction</option>
  <option>Motivational</option>
  <option>Self Development</option>
</select>

<input
  type="text"
  placeholder="Search Your Book"
  className="input input-bordered input-primary w-full max-w-xs" />

<select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Select Option</option>
  <option> Low to High</option>
  <option>High to Low</option>
  <option>Newest first</option>
</select>
      </section>
       
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
       {
          Book_items.map((item)=> <SingleBook key={item._id} item = {item}></SingleBook>)
        }
       </section>
    </div>
  )
}

export default Home