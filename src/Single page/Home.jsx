import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleBook from "./Components/SingleBook";

const Home = () => {
  const Book_items = useLoaderData() || [];
  const [filteredBooks, setFilteredBooks] = useState(Book_items);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    let filtered = Book_items;

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "Low to High") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "High to Low") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest first") {
      filtered = filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    }

    console.log("Filtered and Sorted Books:", filtered);
    setFilteredBooks(filtered);
  }, [Book_items, selectedCategory, searchQuery, sortOption]);

  return (
    <div>
      <section className="flex justify-between mt-6">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="Programming Language">Programming Language</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Motivational">Motivational</option>
          <option value="Self Development">Self Development</option>
        </select>

        <input
          type="text"
          placeholder="Search Your Book"
          className="input input-bordered input-primary w-full max-w-xs"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select
          className="select select-bordered w-full max-w-xs"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Select Option</option>
          <option value="Low to High">Low to High</option>
          <option value="High to Low">High to Low</option>
          <option value="Newest first">Newest first</option>
        </select>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((item) => (
            <SingleBook key={item._id} item={item} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
