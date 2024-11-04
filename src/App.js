import { useState } from 'react';
import { Fragment } from 'react';
import { ProductList } from './components/ProductList';
import styles from './App.module.css';
import { ProductCard } from './components/ProductCard';
import { ProductFilter } from './components/ProductFilter';
function App() {
  const products = [
  {
    id: 1,
    imageSrc: "images/iphone.png",
    title: "iPhone 15 Pro",
    specification: ["A17 Pro chip with 6-core GPU",
        "3x or 5x Telephoto camera",
        "Up to 29 hours video playback"
    ],
    stockCount: 10,
    price: 999
},
{
  id: 2,
  imageSrc: "images/apple-watch.png",
  title: "Apple Watch 9",
  specification: ["45mm or 41mm case size",
      "Always-On Retina display",
      "Up to 18 hours normal use"
  ],
  stockCount: 10,
  price: 399

},
{
  id: 3,
  imageSrc: "images/airpods.png",
  title: "Airpods Pro 2",
  specification: ["Noise Cancellation",
      "Dust, sweat, and water resistant",
      "Up to 6 hours of listening"
  ],
  stockCount: 0,
  price: 249
  
},
  ];
  const[filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 999
  })
  const[favorites, setFavorites] = useState([])

  function handlePurchase(product) {
    alert(`You clicked on ${product.title} which cost £${product.price}`);
  }

  function handleFilter(key, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }))
  }

  function handleFavorite(productId) {
    if (favorites.includes(productId)) {
      setFavorites((prevFavorites) => prevFavorites.filter(id => id !== productId))
      //remove
    } else {
      //add
      setFavorites((prevFavorites) => [...prevFavorites, productId]);
    }
  }
  return (
    <div className="App">
      <ProductList>
        {products.map((product) => (
        <ProductCard
        key = {product.title}
        product={product} 
        isFavorite = {favorites.includes(product.id)}
        onPurchase={handlePurchase}
        onFavorite={handleFavorite} />))}
      </ProductList>

      <h2>Products filtered by price</h2>
      <ProductFilter filters={filters} onFilter={handleFilter}/>
      <ul>
        {products.filter(({price}) => price >= filters.minPrice && price <= filters.maxPrice)
        .map(({title, price}) => (
          <Fragment key={title}>
          <hr className={styles.ListDivider}/>
          <p className={styles.ListTitle}>
            {title} cost £{price}
          </p>
          </Fragment>
          ))}
      </ul>
    </div>
  );
}

export default App;
