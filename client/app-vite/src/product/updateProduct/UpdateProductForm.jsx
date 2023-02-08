import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_PRODUCT } from "../../graphql/mutation";
import { ALL_PRODUCT, FIND_PRODUCT } from "../../graphql/queries";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import isValidUrl from "valid-url";
import toast, { Toaster } from 'react-hot-toast';
import "../productForm/product-form.scss";

const UpdateProductForm = ({ productId, product }) => {
  const url = product?.images?.map((item) => item.url);
  // console.log(url[0])
  const titleImage = product.images.map((item) => item.title);

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [stock, setStock] = useState(product.stock);
  const [images, setImages] = useState([
    { 
    url: url[0],  
    title: titleImage[0] 
    }, 
    {
      url: url[1],
      title: titleImage[1]
    },
]);
  const [img, setImg] = useState([{ url: "" , title: "" }])
  const [open, setOpen] = useState(false);

  const quantityInt = parseInt(quantity, 10);
  
  const [updateProduct, { data, loading }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: ALL_PRODUCT }],
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description || !stock ) 
      return toast('Fill in the fields', {
      duration: 3000,
      });

    const invalidUrls = images.filter((image) => !isValidUrl.isUri(image.url));

    if (invalidUrls.length > 0) {
      console.log(
        `Invalid URLs: ${invalidUrls.map((image) => image.url).join(", ")}`
      );
      return;
    }

    try {
      const response = await updateProduct({
        variables: {
          updateProductId: productId,
          product: { title, price, description, quantity, stock, images },
        },
      });
      if (response) {
        toast.success('Update product!', {
          duration: 3000,
          position: 'top-center',
          icon: '👏',
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      }else{
        toast.error('Please complete the fields correctly',{
          duration: 3000,
          position: 'top-center',
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      };
          setTitle("");
          setPrice("");
          setDescription("");
          setStock("");
          setImages([{ url: "", title: ""}]);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterImage = product?.images?.map((image) => image?.url)
  console.log('filter', filterImage)
  
   const handleDelete = (item) => {
    setImages(filterImage !== item)
   };
  // console.log('images',images?.map((item) => item))
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-create-product">
      <Button
        sx={{
          borderRadius: 5,
          border: 0,
          color: "black",
          borderBlockColor: "black",
          fontFamily: "monospace",
          padding: 1.2,
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Update product
      </Button>
      <Dialog
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogContentText sx={{ padding: 4, fontFamily: "monospace" }}>
          To update product to this website, please enter your data here. We
          will send updates occasionally.
        </DialogContentText>
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              style={{
                padding: 8,
                width: 180,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={{
                padding: 5,
                width: 80,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="price"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              style={{
                padding: 20,
                width: 400,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
             <input
              style={{
                padding: 20,
                width: 400,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="quantity"
              placeholder="quantity"
              value={quantityInt}
              onChange={(e) => setQuantity(e.target.value)}
            />
             <input
              style={{
                padding: 20,
                width: 400,
                borderRadius: 8,
                border: 0,
                backgroundColor: "aliceblue",
                marginTop: 10,
              }}
              type="stock"
              placeholder="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <label style={{ marginTop: 6, color: "gray" }}>
              Images
             
              {images?.map((image, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="url"
                    value={image.url}
                    onChange={(e) =>
                      setImages(
                        images?.map((item, i) =>
                          index === i ? { ...item, url: e.target.value } : item
                        )
                      )
                    }
                    style={{
                      padding: 15,
                      width: 240,
                      borderRadius: 8,
                      border: 0,
                      backgroundColor: "aliceblue",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="title"
                    value={image.title}
                    onChange={(e) =>
                      setImages(
                        images?.map((img, i) =>
                          index === i ? { ...img, title: e.target.value } : img
                        )
                      )
                    }
                    style={{
                      padding: 8,
                      width: 152,
                      borderRadius: 8,
                      border: 0,
                      backgroundColor: "aliceblue",
                      marginTop: 10,
                      marginLeft: 8,
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      paddingLeft: 12,
                      paddingRight: 12,
                      marginLeft: 20,
                      backgroundColor: "Olive",
                      border: 0,
                      borderRadius: 4,
                      color: "white",
                    }}
                    onClick={() =>
                      setImages(
                        images.filter((img, i) =>
                          index > 0 ? i !== index : img
                        )
                      )
                    }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    style={{
                      paddingLeft: 12,
                      paddingRight: 12,
                      marginLeft: 12,
                      backgroundColor: "Olive",
                      border: 0,
                      borderRadius: 4,
                      color: "white",
                    }}
                    onClick={() =>
                      setImages([...images, { url: "", title: "" }])
                    }
                  >
                    +
                  </button>
                </div>
              ))}
            </label>
            <br />
            <div style={{ padding: 8, marginBottom: 6 }}>
                <button
                  style={{
                    borderRadius: 4,
                    padding: 8,
                    border: 0,
                    marginTop: 4,
                    fontFamily: "monospace",
                    color: "white",
                    backgroundColor: "black",
                  }}
                  onClick={handleClose}
                >
                  Update product
                </button>
                <Toaster />
            </div>
          </div>
        </form>
       
      </Dialog>
      <Toaster />
    </div>
  );
};

export default UpdateProductForm;
