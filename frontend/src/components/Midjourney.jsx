import React, { useEffect, useState } from 'react';

const Midjourney = () => {
	const [result, setResult] = useState("");
	const [prompt, setPrompt] = useState("");

	useEffect(() => {
		async function fetchQuery() {
			const data = { "inputs": prompt };
			console.log(prompt)
			const response = await query(data);
			const reader = new FileReader();
			reader.readAsDataURL(response);
			reader.onload = () => {
				setResult(reader.result);
			};
		}

		fetchQuery();
	});

  const handlePrompt = (text) =>{
    setPrompt(text);
  }

	return (
		<div>
			<div >
			<div className={(prompt != "")? 'flex flex-col gap-[20px] backdrop-blur-3xl items-center p-4': 'hidden'}>
				{result && <img src={result} alt="Generated Image" className='rounded-2xl drop-shadow-2xl'/>}
				<button className='p-3 text-white bg-purple-700 w-[130px] rounded-xl text-center font-one text-[18px]'>Download</button>
			</div>
			</div>
			<div className='flex flex-row justify-center'>
				<input type="text" name="prompt" id="prompt" className={'w-[300px] rounded-l-xl bg-white border-2 border-purple-700 px-3 prompt'} placeholder= 'Enter the prompt to search...'/>
				<button className='bg-purple-700 text-slate-50  p-4 py-3 rounded-r-xl text-xl font-one drop-shadow-xl hover:bg-purple-600'
					onClick={()=>{handlePrompt(document.getElementById('prompt').value)}}
				>
					Generate
				</button>
			</div>
			{/* Display the image using the result Data URI */}
			
			
		</div>
	);
};


async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Kvikontent/midjourney-v6",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

export default Midjourney;