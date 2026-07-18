import { useEffect, useState } from 'react'
import './App.scss'

function App() {
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async ()=> {
    try {
      const fetchUrl = `https://script.google.com/macros/s/AKfycbxmg6WrmHgcAjKfEWgh8_5iHR4VYSAYntGd_d7awaOikjhOp5V53hlYBMpmqTD7cQjl0g/exec`;
      const response = await fetch(fetchUrl);
      const {data=[]} = await response.json();
      const catList = data || [];
      if(catList.length){
        setCategories(catList);
      }else{
        console.log("No Categories Found!")
      } 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{

    const fetchProducts = async ()=>{
      try {
        const fetchUrl =`https://script.google.com/macros/s/AKfycbxlFYZOCDVNB0ffM1Xyn6YRnHR4W0J8kOfqHTdDa9FHr_WytXbkOEWEOpgdW_MZNYkv0A/exec`;
        const response = await fetch(fetchUrl);
        const {data=[]} = await response.json();
          const prodList = data || [];
          if(prodList.length){
            setProducts(prodList);
          }else{
            console.log("No Products!")
          }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories();
    fetchProducts();

  },[])

  const getCategoryById = (catId="") => {
    if(catId){
      return categories.find(cat => cat.catId === catId)?.catName || ""
    }else{
      return"";
    }
  }


  return (
    <div className='menu-container'>
      <h3>Our speacial Items</h3>
      {
        products.map(({catId, itemName, itemDesc, itemPrice}) =>
          <ul className='prodList' key={itemName}>
            <li className='category'><span>{getCategoryById(catId)} :</span> </li>
            <li><span>Item: </span>{itemName}</li>
            <li><span>Description: </span>{itemDesc}</li>
            <li><span>Price: </span>{itemPrice}</li>
          </ul>
        )
      }
    </div>
  )
}

export default App
