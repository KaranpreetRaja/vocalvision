import React, { useState, useEffect } from "react";
import Slide from "../components/slide";
import Navbar from "../components/navbar";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Vision() {
  const { uid, sessionId } = useParams();
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        const audioResponse = await axios.get(proxyUrl + 'https://automatelife.pythonanywhere.com/test/audio', { responseType: 'arraybuffer' });
        const imageResponse = await axios.get(proxyUrl + 'https://automatelife.pythonanywhere.com/test/image', { responseType: 'blob' });

        const audioBlob = new Blob([audioResponse.data], { type: 'audio/mpeg' });
        const audioDataUrl = URL.createObjectURL(audioBlob);

        // For the image, convert the blob to a data URL
        const imageBlob = new Blob([imageResponse.data], { type: 'image/png' }); // Adjust the image type accordingly
        const imageDataUrl = URL.createObjectURL(imageBlob);

        setAudioUrl(audioDataUrl);
        setImageUrl(imageDataUrl);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar userId={uid} />
      <Slide visibility={true} audio={audioUrl} image={imageUrl} text="Ibrahim song type beat" />
    </div>
  );
}
