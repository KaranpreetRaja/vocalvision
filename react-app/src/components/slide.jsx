import ReactAudioPlayer from 'react-audio-player';


export default function Slide({ audio, text, image, visibility }) {
  return (
    <div className={visibility ? '' : 'hidden'}>
        <div className='bg-gray-200 w-screen h-screen flex flex-col items-center justify-evely space-y-11'>
            <img
                src={image}
                alt="Album Cover"
                className='h-1/2 w-1/2'
            />
            <span className='text-3xl font-medium '>{text}</span>
            <ReactAudioPlayer
                className='w-1/2 h-20'
                src={audio}
                autoPlay
                controls
            />
        </div>
    </div>
  );
}
