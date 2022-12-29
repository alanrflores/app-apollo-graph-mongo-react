import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import './product-image-slider.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const ProductImageSlider = props => {

    const [activeThumb, setActiveThumb] = useState();
    const [showBackground, setShowBackground] = useState(false);

    const urlImg = 'https://c.static-nike.com/a/images/i7uaonkqzhahrozhpake/air-jordan-2.png'
    const urlImgTwo = 'https://static.nike.com/a/images/gmp2gru4y1xlw279fs3x/air-jordan-4.png'
    const urlImgThree = 'https://static.nike.com/a/images/ztgw7rob4n8xqtbtggcw/air-jordan-15.png'
   
     useEffect(()=> {
         const set = setTimeout(() => {
             setShowBackground(true)
          },3000);
     }, []);
    

  return (
    <>
    <Swiper
    style={{
        "--swiper-navigation-color": "black",
        "--swiper-navigation-size": "1.1rem"
    }}
     loop={true}
     centeredSlides={true}
     slidesPerView={'auto'}
     spaceBetween={16}
     navigation={true}
     modules={[Navigation, Autoplay, Pagination]}
     grabCursor={true}
     thumbs={{ swiper: activeThumb }}
     effect={'coverflow'}
     coverflow={{
         rotate:20,
         stretch:0,
         depth: 200,
         modifier: 1,
         slideShadows: true,
     }}
     className='product-images-slider'
    >
         {
             props?.images?.map((item, index)=> {
              const word = item.substring(19, 31)
              return (
                  
                    <SwiperSlide key={index} style={{ 
                        backgroundImage: `url(${ showBackground && word === 'air-jordan-1'  ? urlImg 
                        : showBackground && word === 'air-jordan-2' ?  urlImgTwo : urlImgThree })`,
                        }}>
                        <div className='container-slider-img'>
                        <div className='slider-img'>
                        <img src={item} alt="slider-images" /> 
                        </div>
                        </div> 
                        <div className='title-sneakers'>
                        <span style={{ color: 'white', fontSize: 22}}>
                        { word === 'air-jordan-1' ? 'AIR JORDAN XX8' 
                        : word === 'air-jordan-2' ?  'AIR JORDAN XX9' 
                        : word === 'air-jordan-3' ?  'AIR JORDAN XXX' 
                        : 'AIR JORDAN XXXI'  }</span>
                        <h1 style={{ color: 'white',fontSize: 50, marginTop: 30}}>{ word === 'air-jordan-1' ? 'THE CONCEPT CAR OF BASKETBALL' :  word === 'air-jordan-2' ? 'THE WORLD’S BEST BASKETBALL SHOE' : word === 'air-jordan-3' ? 'THE NEXT FRONTIER OF FLIGHT' : 'THE NEW ANTI-GRAVITY MACHINES'  }</h1>
                        <p style={{ color: 'white',fontSize: 30, marginTop: 30}}>{ word === 'air-jordan-1' ? 'As a pioneer of innovation for nearly three decades, the Jordan brand once again pushed the envelope with the Air Jordan XX9 — the world’s first woven basketball shoe. Drawing from Italian tailoring, the shoe had an entirely woven upper and set a new benchmark for the lightest Air Jordan ever.' :  word === 'air-jordan-2' ? 'In 2013, with the introduction of the AJ XX8, came a sea change for the Air Jordan line. Performance footwear had never seen anything like it. Within its unique, boot-high casing was veiled a surprisingly responsive shoe with less weight than players had reasonably come to expect.' :  word === 'air-jordan-3' ? 'With the third X comes an epic milestone in the Air Jordan lineage. Three decades of innovation and accomplishment culminate here, in a shoe for the ages. A celebration is in order, as again, sights are set toward the next frontier.' : 'The AJ XXXI pays its respects to the Air Jordan heritage in a way no other model yet has. From the brash, energetic figure MJ was in his Air Jordan Is, to the 30+ year legacy of Air that he inspired, the XXXI is the uniquely positioned to carry the torch and hold it high.'}</p>
                        </div>
                    </SwiperSlide>
                
              )
              
          })
         } 
    </Swiper>
    </>
  )
}

export default ProductImageSlider;
