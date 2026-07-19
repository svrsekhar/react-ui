import { useEffect, useState } from 'react';
import './Products.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = `/gs-api/macros/s/AKfycbxs0-7RIKVP6AdirCY7KwR1_KUWnHTIKg1Y84KfTIKRIYQsd3yu0r0V_FGem2Xvdv4jIQ/exec`;
        
        const [catsResponse, prodsResponse] = await Promise.all([
          fetch(`${baseUrl}?sheetName=ProdCats`),
          fetch(`${baseUrl}?sheetName=ProdList`)
        ]);

        if (!catsResponse.ok || !prodsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const catList = await catsResponse.json();
        const prodList = await prodsResponse.json();

        setCategories(catList);
        setProducts(prodList);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[])

  // const getCategoryById = (catId="") => {
  //   if(catId){
  //     return categories.find(cat => cat.catId === catId)?.catName || ""
  //   }else{
  //     return "";
  //   }
  // }
  console.log(categories)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='menu-container'>
      <h3>Our speacial Items</h3>
      {
        products?.length > 0 ? (
          products.map(({itemCategory, itemName, itemDesc, itemPrice}) =>
          <ul className='prodList' key={itemName}>
            <li className='category'><span>{itemCategory} :</span> </li>
            <li><span>Item: </span>{itemName}</li>
            <li><span>Description: </span>{itemDesc}</li>
            <li><span>Price: </span>{itemPrice}</li>
          </ul>
        )) : (
          <p>No products found.</p>
        )
      }
    </div>
  )
};

export default Products;