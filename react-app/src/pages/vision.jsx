import React, { useState, useEffect } from "react";
import Slide from "../components/slide";
import Navbar from "../components/navbar";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import testData from '../test/test4.json'
import { useRef } from "react";

export default function Vision() {
  const { uid, sessionId } = useParams();
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(null);
  const [slides, setSlides] = useState([]);

  const [mutedSlides, setMutedSlides] = useState([]);
  const currentSlideRef = useRef(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //     const response = await axios.post(proxyUrl + 'https://api.example.com/api/session/use', {
    //       session_id: sessionId
    //     });

    //     const { slides } = response.data;
    //     setMax(slides.length)
    //     setSlides(slides);
    //   } catch (error) {
    //     console.error('Error fetching data:', error.message);
    //   }
    // };

    console.log(testData)
    const { slides } = testData;
    setMax(slides.length)
    setSlides(slides);
 

    // fetchData();
  }, [sessionId]);

  const handleNext = () => {
    if (page < max){
      // if (currentSlideRef.current) {
      //   currentSlideRef.current.muteSlide();
      // }
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleBack = () => {
    if (page !== 1){
      setPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <div>
      <Navbar userId={uid} logged={true}/>
      {slides.length > 0 && (
        slides.map((slide, index) => (
          <Slide
            visibility={index + 1 === page}
            audio={slide.slide_audio_url}
            image={slide.slide_image_url}
            text={slide.slide_text}
            muted={false}
          />
        ))
      )}
      <div className="flex flex-row justify-between w-full px-11 py-2">
          <button 
              onClick={handleBack}
              className="text-2xl bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Back
          </button>
          <button
              onClick={handleNext}
              className="text-2xl bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300">
              Next
          </button>
      </div>
    </div>
  );
}
