import { initializeApp,getAuth} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBGtCmw3QskPI9jyB-BB5LHN3IkqhwPerk",
    authDomain: "bakery-shop-59e3c.firebaseapp.com",
    projectId: "bakery-shop-59e3c",
    storageBucket: "bakery-shop-59e3c.appspot.com",
    messagingSenderId: "144499188515",
    appId: "1:144499188515:web:53ea8d9b0eb845a45a6296",
    measurementId: "G-KEVGH6JRX7",
  };

  
// Initialize Firebase only if not already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase App Initialized");
} else {
  app = getApps()[0]; // Use the already initialized app
  console.log("Firebase App Already Initialized");
}

const db = getFirestore(app);


// JSON data for boxes products
const boxesProductsData={
  "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/packaging_box1.jpg",
          "name": "box",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price":  "8"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box2.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "12"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box3.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "10"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/packaging_box4.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "15"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box5.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "20"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box6.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "40"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box7.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "40"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/packaging_box8.jpg",
            "name": "box",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "30"
        }
        

    ]
}

//JSON data for cakeToper
const cakeToperData={
  "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/cakeTopper_img2.jpg",
           "name": "caketopper",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "39"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img3.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "100"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img4.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "79"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/cakeTopper_img5.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "110"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/cakeTopper_img6.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "60"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img7.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "139"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img8.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "120"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/cakeTopper_img1.jpg",
            "name": "caketopper",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "99"
        }
        

    ]
}

//JSON data for chocolateMould
const chocolateMouldData={
  "products": [
        {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/mould_img1.jpg",
          "name": "mould",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "120"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/mould_img3.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "180"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/mould_img4.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "200"
        },{
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/mould_img5.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "220"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/mould_img6.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "200"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/mould_img7.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "60"
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1": "../../../Assets/images/mould_img8.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "100"   
        },
        {
            "image": "../../../Assets/images/my-wish-list.png",
            "image1":"../../../Assets/images/mould_img9.jpg",
            "name": "mould",
            "image2": "../../../Assets/images/star_rating_img.webp",
            "price": "250"
        }
        

    ]
}


//JSON Data for ingredient 
const ingredientData=

{
  "products": [
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/baking_powder.jpg",
        "name": "baking powder",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "29"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/baking_soda.jpg",
          "name": "baking soda",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "32"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/brown_sugar.jpg",
          "name": "sugar",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "79"
      },{
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/flour_img1.jpg",
          "name": "maida",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "39"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/food_colour_img1.jpg",
          "name": "food colour",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "22"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/food_colour_img2.jpg",
          "name": "food colour",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "20"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/food_colour_img3.jpg",
          "name": "food colour",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "25"   
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/food_colour_img4.jpg",
          "name": "food colour",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "30"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/gluten_img.jpg",
          "name": "gluten",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "299"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/milk_maid_img.jpg",
          "name": "milk maid",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "147"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/oil.jpg",
          "name": "oil",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "60"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/salt_img.jpg",
          "name": "salt",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "19"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/sprinkles_img.jpg",
          "name": "sprinkle",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "300"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/sugar.jpg",
          "name": "sugar",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "29"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/whipping_img.jpg",
          "name": "whipping cream",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "220"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/yeast_img.jpg",
          "name": "yeast",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "300"
      }
      
      

  ]
}


//JSON Data for kitchenware
const kitchenwareData=
{
  "products": [
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/bread_proofing_img1.jpg",
        "name": "proofing tin",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "$1200"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/bread_proofing_img2.jpg",
          "name": "proofing tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$1500"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/decora_img1.jpg",
          "name": "decora",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$150"
      },{
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/measuring-cup-set.jpg",
          "name": "cup",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$150"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/measuring_spoon.jpg",
          "name": "cup",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "$100"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/palette_knife_img1.jpg",
          "name": "knife",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "300"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/ring-img.jpg",
          "name": "ring",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "329"   
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/silicon_brush_img1.jpg",
          "name": "brush",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "50"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/spatula_img1.jpg",
          "name": "spatula",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "70"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/whisk_img1.jpg",
          "name": "whisk",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "100"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/wooden_board.jpg",
          "name": "wooden board",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "600"
      }
      

  ]
}

//JSON Data for piping
const pipingData=
{
  "products": [
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/piping_bag1.jpg",
        "name": "piping bag",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "9000"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/piping_bag2.jpg",
          "name": "piping bag",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "8200"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/nozzile_img1.jpg",
          "name": "nozzile",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "5000"
      },{
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/nozzile_img2.jpg",
          "name": "nozzile",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "8500"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/nozzile_img3.jpg",
          "name": "nozzile",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "9000"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/nozzile_img4.jpg",
          "name": "nozzile",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "32000"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/nozzile_img5.jpg",
          "name": "nozzile",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "35000"   
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/nozzile_img6.jpg",
          "name": "nozzile",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "9000"
      }
      

  ]
}


//Json data for standMixer
const standMixerData=
{
  "products": [
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/stand_mixers2.jpg",
        "name": "stand mixer",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "9000"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers4.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "8200"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers3.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "5000"
      },{
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/stand_mixers5.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "8500"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers1.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "9000"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers6.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "32000"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers7.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "35000"   
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/stand_mixers8.jpg",
          "name": "stand mixer",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "9000"
      }
      

  ]
}


//JSON Data for tin 
const tinData=
{
  "products": [
      {
        "image": "../../../Assets/images/my-wish-list.png",
        "image1": "../../../Assets/images/bread_tin2.jpg",
        "name": "tin",
        "image2": "../../../Assets/images/star_rating_img.webp",
        "price": "100"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/bread_tin1.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "159"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/bread_tin3.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "899"
      },{
          "image": "../../../Assets/images/my-wish-list.png",
          "image1":"../../../Assets/images/bread_tin4.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "299"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/cake_tin1.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "250"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/cake_tin2.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "300"
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/cake_tin3.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "180"   
      },
      {
          "image": "../../../Assets/images/my-wish-list.png",
          "image1": "../../../Assets/images/cake_tin4.jpg",
          "name": "tin",
          "image2": "../../../Assets/images/star_rating_img.webp",
          "price": "600"
      }
      

  ]
}


// Function to upload the JSON data to Firestore
async function uploadProductsToFirestore() {
  try {
    // Upload cleaning products data
    const boxesRef = doc(db, "products", "boxes");
    console.log("Uploading Cleaning Products to Firestore Document:", boxesRef.path);
    await setDoc(boxesRef, boxesProductsData);
    console.log("boxes products data uploaded successfully!");

    // Upload carrier products data
    const cakeToperRef = doc(db, "products", "cakeToper");
    console.log("Uploading cakeToper Products to Firestore Document:", cakeToperRef.path);
    await setDoc(cakeToperRef, cakeToperData);
    console.log("CakeToper products data uploaded successfully!");

    // Upload medicine products data
    const chocolateMouldRef = doc(db, "products", "chocolate-mould");
    console.log("Uploading chocolate-mould Products to Firestore Document:", chocolateMouldRef.path);
    await setDoc(chocolateMouldRef, chocolateMouldData);
    console.log("chocolateMould products data uploaded successfully!");

    // Upload food and treats products data
    const ingredientRef = doc(db, "products", "ingredient");
    console.log("Uploading ingredient Products to Firestore Document:", ingredientRef.path);
    await setDoc(ingredientRefRef, ingredientDataData);
    console.log("ingredient products data uploaded successfully!");

    // Upload house products data
    const kitchenwareRef = doc(db, "products", "kitchenware");
    console.log("Uploading kitchenware Products to Firestore Document:", kitchenwareRef.path);
    await setDoc(kitchenwareRefRef, kitchenwareDataData);
    console.log("kitchenware products data uploaded successfully!");

    // Upload toys data
    const pipingRef = doc(db, "products", "piping,Nozzile");
    console.log("Uploading piping Products to Firestore Document:", pipingRef.path);
    await setDoc(pipingRef, pipingData);
    console.log("piping products data uploaded successfully!");

    // Upload toys data
    const standMixerRef = doc(db, "products", "standMixer");
    console.log("Uploading standMixer Products to Firestore Document:", standMixerRef.path);
    await setDoc(standMixerRefRef, standMixerDataData);
    console.log("standMixer products data uploaded successfully!");

    // Upload toys data
    const tinRef = doc(db, "products", "tin");
    console.log("Uploading tin Products to Firestore Document:", tinRef.path);
    await setDoc(tinRef, tinDataData);
    console.log("tin products data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products data:", error.message);
  }
}

// Call the function to upload all the product data
uploadProductsToFirestore();






