import React, { useState } from 'react'
import Upload from '../assets/Svgs/upload.png'
import Navbar2 from './Navbar2'
import axios from 'axios'
import desEmpty from '../assets/design/desEmpty.png'
import des1 from '../assets/design/des1.png'
import des2 from '../assets/design/des2.png'
import des3 from '../assets/design/des3.png'
import des4 from '../assets/design/des4.png'
import texture1 from '../assets/textures/Texture1.avif'
import texture2 from '../assets/textures/Texture2.png'
import texture3 from '../assets/textures/Texture3.jpg'
import texture4 from '../assets/textures/Texture4.avif'
import texture5 from '../assets/textures/Texture5.jpg'
import texture6 from '../assets/textures/Texture6.jpg'
import texture7 from '../assets/textures/Texture7.jpg'
import { hexToCSSFilter } from 'hex-to-css-filter';
import ReactChromakeyedImage from 'react-chromakeyed-image';
import image1Bg from '../assets/bg/Image1_Bg.png'
import image1 from '../assets/walls/Image1.jpg'
import image2Bg from '../assets/bg/Image2_Bg.png'
import image2 from '../assets/walls/Image2.jpg'
import image3Bg from '../assets/bg/Image3_Bg.png'
import image3 from '../assets/walls/Image3.jpg'
import image4Bg from '../assets/bg/Image4_Bg.png'
import image4 from '../assets/walls/Image4.jpg'
import Midjourney from './Midjourney'

let imgurl = '';

const Dashboard = () => {
  const [color, setColor] = useState('slate-500');
  const [design, setDesign] = useState(desEmpty);
  const [texture, setTexture] = useState(desEmpty);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [x, setX] = useState(20);
  const [y, setY] = useState(20)
  const [size, setSize] = useState(0)
  const [angle, setAngle] = useState(0)
  const [imagedata, setImagedata] = useState(0);


  const handleClick = (value) => {
    if (value === 'slate-500') {
      return;
    }
    setColor(value);
  };

  const handleDesign = (value) => {
    if (value === desEmpty) {
      return;
    }
    setDesign(value);
  };

  const handleTexture = (value) => {
    if (value === desEmpty) {
      return;
    }
    setTexture(value);
  };

  const handleStroke = (value) => {
    var cssFilter = hexToCSSFilter(value);
    var stroke = document.querySelector('#design')
    const filterValue = cssFilter.filter.split(";")[0];
    stroke.style.filter = filterValue
    const filterValueFromStyles = window.getComputedStyle(stroke).getPropertyValue('filter');
    console.log(filterValueFromStyles);
  };

  const [filename, setFilename] = useState('No file selected.');

  const captureFileName = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    setFilename(fileName);
};
  console.log(filename);

  const preset_key = "j5ctqaw8";
  const cloud_name = "dpbtfgqvb";
  const [image, setImage] = useState();
  const [imageBg, setImageBg] = useState();

  function handleFile1(event) {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then(res => {
        imgurl = res.data.secure_url;
        setImage(res.data.secure_url)
      })
      .catch(err => console.error(err));
  }

  function handleuplaod(event) {
    handleFile1(event);
    captureFileName(event);
  }
  console.log(imgurl);

  return (
    <>
      <Navbar2 />
      <div className='fixed bottom-7 right-20 p-4 py-3 rounded-xl text-xl drop-shadow-xl z-50 backdrop-blur-lg'>
        <Midjourney/>
      </div>
      <main className='flex m-10 mt-6 p-7 pt-0 h-[600px]' id='dashboard'>
        {
          image
            ? (
              filename==="Image1.jpg"
              ?
                <div className='h-[450px] w-[35vw] mt-24 pb-20 flex items-center justify-center absolute left-[5vw]' style={{overflow: 'hidden'}}>
                <img src={image} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-10 opacity-70'/>
                <img src={image1Bg} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-20 opacity-90'/>
                <div className="bg-white w-[15%] fixed h-[500px] z-5 opacity-100"
                style={{
                    backgroundImage: `url(${texture})`,
                    backgroundRepeat: "repeat",
                }}>
              </div>
              <div className='w-[40%] object-contain fixed z-50'>
              <div className={`bg-${color} drop-shadow-2xl flex items-center justify-center `}
                      style={{
                          height: `${height}px`,
                          width: `${width}px`,
                          position: "relative",
                          top: `${y}px`,
                          left: `${x}px`,
                          padding: `${size}px`,
                          transform: `rotate(${angle}deg)`,
                      }}
                  >
                      <img src={`${design}`} alt="Design" className={`max-w-full max-h-full rounded-2xl`} id="design"/>
                  </div>
              </div>
              </div>
              :
              filename==="Image2.jpg"
              ?
                <div className='h-[450px] w-[35vw] mt-24 pb-20 flex items-center justify-center absolute left-[5vw]' style={{overflow: 'hidden'}}>
                <img src={image} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-10 opacity-70'/>
                <img src={image2Bg} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-20 opacity-90'/>
                <div className="bg-white w-[40%] fixed h-[280px] z-5 opacity-100"
                style={{
                    backgroundImage: `url(${texture})`,
                    backgroundRepeat: "repeat",
                }}>
              </div>
              <div className='w-[40%] object-contain fixed z-50'>
              <div className={`bg-${color} drop-shadow-2xl flex items-center justify-center `}
                      style={{
                          height: `${height}px`,
                          width: `${width}px`,
                          position: "relative",
                          top: `${y}px`,
                          left: `${x}px`,
                          padding: `${size}px`,
                          transform: `rotate(${angle}deg)`,
                      }}
                  >
                      <img src={`${design}`} alt="Design" className={`max-w-full max-h-full rounded-2xl`} id="design"/>
                  </div>
              </div>
              </div>
              :
              filename==="Image3.jpg"
              ?
                <div className='h-[450px] w-[35vw] mt-24 pb-20 flex items-center justify-center absolute left-[5vw]' style={{overflow: 'hidden'}}>
                <img src={image} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-10 opacity-70'/>
                <img src={image3Bg} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-20 opacity-90'/>
                <div className="bg-white w-[15%] fixed h-[500px] z-5 opacity-100"
                style={{
                    backgroundImage: `url(${texture})`,
                    backgroundRepeat: "repeat",
                }}>
              </div>
              <div className='w-[40%] object-contain fixed z-50'>
              <div className={`bg-${color} drop-shadow-2xl flex items-center justify-center `}
                      style={{
                          height: `${height}px`,
                          width: `${width}px`,
                          position: "relative",
                          top: `${y}px`,
                          left: `${x}px`,
                          padding: `${size}px`,
                          transform: `rotate(${angle}deg)`,
                      }}
                  >
                      <img src={`${design}`} alt="Design" className={`max-w-full max-h-full rounded-2xl`} id="design"/>
                  </div>
              </div>
              </div>
              :
              <div className='h-[450px] w-[35vw] mt-24 pb-20 flex items-center justify-center absolute left-[5vw]' style={{overflow: 'hidden'}}>
              <img src={image} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-10 opacity-70'/>
              <img src={image4Bg} alt="" className='max-w-[40%] h-[500px] object-contain fixed z-20 opacity-90'/>
              <div className="bg-white w-[33%] fixed h-[500px] z-5 opacity-100"
              style={{
                  backgroundImage: `url(${texture})`,
                  backgroundRepeat: "repeat",
              }}>
            </div>
            <div className='w-[40%] object-contain fixed z-50'>
            <div className={`bg-${color} drop-shadow-2xl flex items-center justify-center `}
                    style={{
                        height: `${height}px`,
                        width: `${width}px`,
                        position: "relative",
                        top: `${y}px`,
                        left: `${x}px`,
                        padding: `${size}px`,
                        transform: `rotate(${angle}deg)`,
                    }}
                >
                    <img src={`${design}`} alt="Design" className={`max-w-full max-h-full rounded-2xl`} id="design"/>
                </div>
            </div>
            </div>
            )
            :
            <label htmlFor="img" className='flex-1 p-10 bottom-5 bg-slate-100 rounded-[10%] fixed'>
              <div className='flex flex-col justify-center items-center w-[35vw] h-[450px] border-[8px] border-dashed rounded-[10%]'>
                <img src={Upload} width={150} height={100} alt='' />
                <input id='img' type="file" onChange={handleuplaod} className='opacity-0' />
                <p className='font-one text-2xl text-zinc-800'>Drag and drop a picture or <span className='text-purple-700 font-medium'>browse</span></p>
              </div>
            </label>
        }
        <div className='flex flex-col px-14 h-auto w-1/2'></div>
        <div className='flex flex-col px-14 h-auto w-1/2 text-zinc-800'>
          <p className='font-sans font-bold text-3xl'>Designs: </p>
          <div className='bg-purple-700 h-1 my-3'></div>
          <p>Select the design for preview.</p>
          <div className='font-one text-black my-4 text-xl'>Backdrop Color: </div>
          <div className="w-full flex flex-wrap gap-[50px]">
            <div className='h-[6px] rounded-full drop-shadow-lg bg-purple-700 w-full'></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-red-700" onClick={() => handleClick('red-700')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-orange-500" onClick={() => handleClick('orange-500')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-yellow-300" onClick={() => handleClick('yellow-300')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-green-700" onClick={() => handleClick('green-700')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-blue-800" onClick={() => handleClick('blue-800')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-indigo-600" onClick={() => handleClick('indigo-600')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-violet-400" onClick={() => handleClick('violet-400')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-fuchsia-700" onClick={() => handleClick('fuchsia-700')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-zinc-700" onClick={() => handleClick('zinc-700')}></div>
          <div/>
          <div className='font-one w-full text-black text-xl'>Design: </div>
          <div className="w-full flex flex-wrap gap-[50px]">
            <div className='h-[6px] rounded-full drop-shadow-lg bg-purple-700 w-full'></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-slate-200 opacity-[0.75]" onClick={() => handleDesign(des1)}>
              <img src={des1} alt="Design 1" />
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-slate-200 opacity-[0.75]" onClick={() => handleDesign(des2)}>
              <img src={des2} alt="Design 2" />
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-slate-200 opacity-[0.75]" onClick={() => handleDesign(des3)}>
              <img src={des3} alt="Design 3" />
            </div>
          </div>
          <div className='font-one w-full text-black text-xl'>Stroke Color: </div>
          <div className="w-full flex flex-wrap gap-[50px]">
            <div className='h-[6px] rounded-full drop-shadow-lg bg-purple-700 w-full'></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-white" onClick={() => handleStroke('#ffffff')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-black" onClick={() => handleStroke('#000000')}></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl bg-[#9ca3af]" onClick={() => handleStroke('#9ca3af')}></div>
          </div>
          <div className='font-one w-full text-black text-xl'>Texture: </div>
          <div className="w-full flex flex-wrap gap-[50px]">
            <div className='h-[6px] rounded-full drop-shadow-lg bg-purple-700 w-full'></div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture1)}>
                <img src={texture1} alt="Texture 1" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture2)}>
              <img src={texture2} alt="Texture 2" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture3)}>
              <img src={texture3} alt="Texture 3" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture4)}>
              <img src={texture4} alt="Texture 4" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture5)}>
              <img src={texture5} alt="Texture 5" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture6)}>
              <img src={texture6} alt="Texture 6" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture7)}>
              <img src={texture7} alt="Texture 7" className="w-full h-full rounded-lg"/>
            </div>
            <div className="w-[100px] h-[100px] rounded-lg drop-shadow-xl" onClick={() => handleTexture(texture7)}>
              <input type="color" className='w-full h-full rounded-lg'/>
            </div>
          </div>
            
            <div className="flex gap-2 mb-24">
              <div>
                <div className='flex flex-row my-5'>
                    <button className='bg-violet-500 text-slate-50 rounded-l-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setSize(size+4)}}>-</button>
                    <p className='bg-violet-500 text-slate-50 w-28 p-4 py-2 shadow-md text-md font-semibold text-center'>Size</p>
                    <button className='bg-violet-500 text-slate-50 rounded-r-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setSize(size-4)}}>+</button>
                </div>
                <div className='flex flex-row my-5'>
                  <button className='bg-violet-500 text-slate-50 rounded-l-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setWidth(width+4)}}>+</button>
                  <p className='bg-violet-500 text-slate-50 w-28 p-4 py-2 shadow-md text-md font-semibold text-center'>Width</p>
                  <button className='bg-violet-500 text-slate-50 rounded-r-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setWidth(width-4)}}>-</button>
                </div>
              </div>

              <div className=''>
              <button className='bg-violet-500 text-slate-50 rounded-t-xl w-[180px] py-1 shadow-md text-md font-semibold text-[30px]' onClick={() => {setY(y-4)}}><div className='rotate-0'>&#9650;</div></button>
                <button className='bg-violet-500 text-slate-50 w-[90px] py-1 shadow-md text-md font-semibold text-[30px]' onClick={() => {setX(x-4)}}><div className='-rotate-90'>&#9650;</div></button>
                <button className='bg-violet-500 text-slate-50 w-[90px] py-1 shadow-md text-md font-semibold text-[30px]' onClick={() => {setX(x+4)}}><div className='rotate-90'>&#9650;</div></button>
                <button className='bg-violet-500 text-slate-50 rounded-b-xl w-[180px] py-1 shadow-md text-md font-semibold text-[30px]' onClick={() => {setY(y+4)}}><div className='rotate-180'>&#9650;</div></button>
              </div>
              <div>
              <div className='flex flex-row my-5'>
                  <button className='bg-violet-500 text-slate-50 rounded-l-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setHeight(height+4)}}>+</button>
                  <p className='bg-violet-500 text-slate-50 w-28 p-4 py-2 shadow-md text-md font-semibold text-center'>Height</p>
                  <button className='bg-violet-500 text-slate-50 rounded-r-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setHeight(height-4)}}>-</button>
                </div>

                <div className='flex flex-row my-5'>
                  <button className='bg-violet-500 text-slate-50 rounded-l-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setAngle(angle-4)}}>&#8630;</button>
                  <p className='bg-violet-500 text-slate-50 w-[100px] p-4 py-2 shadow-md text-md font-semibold text-center'>Rotation</p>
                  <button className='bg-violet-500 text-slate-50 rounded-r-xl p-4 py-2 shadow-md text-md font-semibold' onClick={() => {setAngle(angle+4)}}>&#8631;</button>
                </div>
              </div>
              
            </div>
            
          </div>
          
        </div>

        
      </main>
    </>
  )
}


export default Dashboard
export { imgurl}
