import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';


function ExportImage() {

    const divRef = useRef(null);
    const [imageData, setImageData] = useState(null);

    const convertToImage = () => {
        if (divRef.current) {
            html2canvas(divRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                setImageData(imgData);
            });
        }
    };

    // console.log(imageData)

    const downloadImage = () => {
        if (imageData) {
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'div_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <div ref={divRef}>
                <h1>This is a div</h1>
                <p>Some text inside the div</p>
            </div>
            <button onClick={convertToImage}>Convert to Image</button>
            <button onClick={downloadImage}>Download Image</button>
            {imageData && (
                <div>
                    <h2>Generated Image:</h2>
                    <img src={imageData} alt="Generated" />
                </div>
            )}
        </div>
    );
}

export default ExportImage;