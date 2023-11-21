import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dzvwbbbca', 
  api_key: '278614369632346', 
  api_secret: 'u65bxmiBN92GszTns-ec6LAMvF8' 
});


cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });