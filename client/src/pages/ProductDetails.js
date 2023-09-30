import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
const [relatedProducts,setRelatedProducts]=useState([])

//Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };


// get similar product
const getSimilarProduct=async(pid,cid)=>{
  try {
    const {data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
    setRelatedProducts(data?.products)
  } catch (error) {
    console.log(error)
    
  }
}



  return (
    <Layout title={'Product-Details'}>
      <div className='row container mt-2 '>
        <div className='col-md-6' style={{ width: '18rem' }}>
          {product._id && (
            <img src={`/api/v1/product/product-photo/${product._id}`} className='card-img-top ml-6' alt={product.name} />
          )}
        </div>
        <div className='col-md-6 '>
          <h1 className='text-center product-details'>Product Details</h1>
          {product.name && <h4>Name: {product.name}</h4>}
          {product.description && <h4>Description: {product.description}</h4>}
          {product.price && <h4>Price: {product.price}</h4>}
          {product.category && <h4>Category: {product.category.name}</h4>}
          <button className='btn  btn-secondary addtocard ms-1'>ADD TO CART</button>
        </div>
      </div>
<hr/>
      <div className='row container'>
        {relatedProducts.length<1 && (<p className=' text-center'>No Similar Products Found</p>)}
        <h6 className='text-center mt-4 mb-4'> Similar Product</h6>
        
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
      </div>
     
    </Layout>
  );
};

export default ProductDetails;
