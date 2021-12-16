async function addToCart (fire,productid,document) {
    const ref = await fire.firestore
      .collection("cart")
      .doc(productid);
    const documentobj = {
      brand: document.brand,
      name: document.name,
      images: document.images,
      price: document.price,
      description: document.description,
      quantity:1,
      userId:document.userId
    };
    try {
      await ref.set(documentobj);
    } catch (e) {
      console.error(e);
    }
  }

export default addToCart
