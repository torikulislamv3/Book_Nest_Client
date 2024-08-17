import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleBook from "./Components/SingleBook";

const Home = () => {
  const Book_items = useLoaderData(); // Fetching data
  const [filteredBooks, setFilteredBooks] = useState(Book_items); // State for filtered books
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering logic
  useEffect(() => {
    let filtered = Book_items;

    // Filter by category
    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery !== "") {
      filtered = filtered.filter((item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBooks(filtered); // Set filtered books to state
  }, [Book_items, selectedCategory, searchQuery]);

  return (
    <div>
      <section className="flex justify-between mt-6">
        {/* Category Filter */}
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

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Your Book"
          className="input input-bordered input-primary w-full max-w-xs"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Sorting options (currently not implemented) */}
        <select className="select select-bordered w-full max-w-xs">
          <option value="" disabled>
            Select Option
          </option>
          <option>Low to High</option>
          <option>High to Low</option>
          <option>Newest first</option>
        </select>
      </section>

      {/* Book List */}
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
