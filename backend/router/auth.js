const express = require('express');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const router = express.Router();
require('../db/connection');
const User = require('../model/schema');
const authenticate = require('../middleware/authenticate');

const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// router.get('/', (req,res)=>{

//     res.send('hello world from router');
   
// })




router.post('/register', async(req,res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:'please fill in the form correctly'});

    }
try{
    const userExist = await User.findOne({email:email});
    if(userExist){ 
     return res.status(422).json({error: "User already exists"})
    }else if (password != cpassword){
        return res.status(422).json({error: "password does not match"})
    }else{
        const user = new User ({name, email, phone, work, password, cpassword})
            
    await user.save()
   
        res.status(201).json({message: 'user registered successfully'})}
            
           
        

    
}
catch (err){
    console.log("error")
}
    })

   
    router.post('/savedata', async(req,res)=>{
        const {imgURL, caption} = req.body;
       
    try{
        
            const instadata = new instaData ({imgURL, caption})
                
        await instadata.save()
       
            res.status(201).json({message: 'user registered successfully'})
            
               
            
    
        
    }
    catch (err){
        console.log("error")
    }
        })

        

    router.post('/signin', async(req, res)=>{

        const {email , password} = req.body;

        try{

        if(!email || !password){
            res.status(400).json({message:"please fill in correctly"})
        }

        const userLogin = await User.findOne({email:email})
        let token
        if(userLogin){
            const isMatch = await bcryptjs.compare(password, userLogin.password)
          token =  await userLogin.generateAuthToken();
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 258900000),
            httpOnly:true
          })
            if(!isMatch){
                res.status(400).json({message:"invalid"})
            }else{
                res.json({message:"logged in successfully"})
            }
        }else{
        res.status(400).json({message:"User does not exists"})
    }
}
catch(err){
    console.log(err)
}
    })



router.get('/displaydata' , authenticate, (req, res) =>{

    res.send(req.rootUser)
})

router.get('/logout' , authenticate, (req, res) =>{

    res.clearCookie('jwtoken' , {path:'/'});
    res.status(200).send("Logged Out")
})





router.post('/addtocart', authenticate, async (req, res) => {
    const { title, price } = req.body;

    try {
        // Assuming you have a way to identify the user, like through authentication
        const userId = req.rootUser._id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Add the item to the cartItems array
        user.cartItems.push({ title: title, price:price });

        // Save the user with the updated cartItems
        await user.save();

        res.status(201).json({ message: 'Added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// router.delete('/deleteItem', authenticate, async (req, res) => {
//     const { product, price } = req.body;
//     const userId = req.rootUser._id;
  
//     try {
//       // Find the user by ID
//       const user = await User.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
  
//       // Find the index of the item with the specified product and price
//       const indexToRemove = user.cartItems.findIndex(item => item.title === product && item.price === price);
  
//       if (indexToRemove === -1) {
//         return res.status(404).json({ success: false, message: 'Item not found in the user\'s cart' });
//       }
  
//       // Remove the item from the cartItems array
//       user.cartItems.splice(indexToRemove, 1);
  
//       // Save the updated user
//       await user.save();
  
//       res.json({ success: true, message: 'Item deleted successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });


router.delete('/deleteItem', authenticate, async (req, res) => {
    try {
      // Assuming the user ID is stored in req.user.id after authentication
      const userId = req.rootUser._id;
  
      // Extracting title and price from the request body
      const { title, price } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Filter out the item to be deleted from the cartItems array
      user.cartItems = user.cartItems.filter(item => item.title !== title && item.price !== price);
  
      // Save the updated user document
      await user.save();
  
      res.json({ msg: 'Item deleted successfully', cartItems: user.cartItems });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.delete('/clearcart', authenticate, async (req, res) => {
    try {
      // Assuming you have the user data available in the request object from the authentication middleware
      const userId = req.rootUser._id;
      const user = await User.findById(userId);
      // Set the cartItems array to an empty array
      user.cartItems = [];
  
      // Save the updated user data
      await user.save();
  
      res.status(200).json({ message: 'Cart items deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/address', authenticate, async (req, res) => {
    try {
      const { zipCode, city, streetName, houseNumber, cartItems } = req.body;
  
      // Check if required fields are present
      if (!zipCode || !city || !streetName || !houseNumber || !cartItems) {
        return res.status(400).json({ error: 'Please provide all the required details' });
      }
  
      // Find the user by userId
      const userId = req.rootUser._id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the address details in the user's addressDetails array
      let addressIndex = user.addressDetails.findIndex(
        (address) =>
          address.zipCode === zipCode &&
          address.city === city &&
          address.streetName === streetName &&
          address.houseNumber === houseNumber
      );
  
      if (addressIndex === -1) {
        // If the address is not found, create a new address object
        const newAddress = {
          zipCode,
          city,
          streetName,
          houseNumber,
          orderDetails: [],
        };
        user.addressDetails.push(newAddress);
        addressIndex = user.addressDetails.length - 1;
      }
  
      // Push each item from cartItems to the orderDetails array of the found or new address
      cartItems.forEach((item) => {
        user.addressDetails[addressIndex].orderDetails.push({
          title: item.title,
          price: item.price,
        });
      });
      user.cartItems = [];
      // Save the updated user object
      await user.save();
  
      // Send a success response back to the client
      return res.status(200).json({ message: 'Items added to orderDetails array' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.post('/contact', authenticate, async (req, res) => {
    const { message } = req.body;

    try {
        // Assuming you have a way to identify the user, like through authentication
        if (!message) {
            return res.status(422).json({ message: 'Empty' });
        }
        const userId = req.rootUser._id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Add the item to the cartItems array
        user.messages.push({ message:message });

        // Save the user with the updated cartItems
        await user.save();

        res.status(201).json({ message: 'Added to cart' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;




