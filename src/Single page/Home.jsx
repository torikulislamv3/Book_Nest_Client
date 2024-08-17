import { useState, useEffect } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import SingleBook from './Components/SingleBook';
import Pagination from './Pagination';

const Home = () => {
  const { books, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const filteredBooks = books.filter((book) => {
    if (selectedCategory && book.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sortedBooks = (() => {
    if (sortOption === "Low to High") {
      return filteredBooks.sort((a, b) => a.price - b.price);
    } else if (sortOption === "High to Low") {
      return filteredBooks.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest first") {
      return filteredBooks.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    }
    return filteredBooks;
  })();

  return (
    <div>
      <section className="flex justify-between mt-6">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="select select-bordered w-full max-w-xs"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="Low to High">Low to High</option>
          <option value="High to Low">High to Low</option>
          <option value="Newest first">Newest first</option>
        </select>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {sortedBooks.length > 0 ? (
          sortedBooks.map((item) => (
            <SingleBook key={item._id} item={item} />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </section>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
