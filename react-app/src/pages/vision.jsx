import React, { useState, useEffect } from "react";
import Slide from "../components/slide";
import song from "../pages/yeat.mp3";
import image from "../test/man.png"
import Navbar from "../components/navbar";
import { useParams } from 'react-router-dom';

export default function Vision() {
    const { uid, sessionId } = useParams();
    const [visionData, setVisionData] = useState(null);
    const [audioData, setAudioData] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [textData, setTextData] = useState(null);
  
    // useEffect(() => {

    //   axios.get('your_api_endpoint')
    //     .then(response => {
    //       const { audio, image, text } = response.data;
  
    //       axios.get(audio)
    //         .then(audioResponse => setAudioData(audioResponse.data))
    //         .catch(audioError => console.error('Error fetching audio data:', audioError));
  
    //       axios.get(image)
    //         .then(imageResponse => setImageData(imageResponse.data))
    //         .catch(imageError => console.error('Error fetching image data:', imageError));
  
    //       axios.get(text)
    //         .then(textResponse => setTextData(textResponse.data))
    //         .catch(textError => console.error('Error fetching text data:', textError));
  
    //       setVisionData(response.data);
    //     }).catch(error => console.error('Error fetching vision data:', error));
        
    // }, []); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [response1, response2, response3] = await Promise.all([
              axios.get('https://api.example.com/data1'),
              axios.get('https://api.example.com/data2'),
              axios.get('https://api.example.com/data3'),
            ]);
    
            setData1(response1.data);
            setData2(response2.data);
            setData3(response3.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <div>
            <Navbar userId={uid}/>
            <Slide visibility={true} audio={song} image={image} text="Ibrahim song type beat"></Slide>
        </div>
  );
}
