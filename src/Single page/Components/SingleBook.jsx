const SingleBook = ({item}) => {
    const {_id, name, image, description, price, category, ratings, createdDate, createdTime} = item;
  return (
    <div className="card bg-blak w-96 shadow-xl h-auto">
    <figure className="px-10 pt-10">
      <img
        src={image}
        alt="Shoes"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title text-yellow-300">{name}</h2>
      <div className="grid grid-cols-2">
            <div>
               <p>
               {description}
               </p>
               <p className="text-red-500">
                 {category}
               </p>
            </div>
            <div>
                <p>${price}</p>
                <p> ratings  : {ratings}</p>
                <p>{createdDate}</p>
                <p>{createdTime}</p>
            </div>
      </div>
      <div className="card-actions">
        <button className="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
  )
}

export default SingleBook