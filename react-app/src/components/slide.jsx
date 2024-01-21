import ReactAudioPlayer from 'react-audio-player';


export default function Slide({ audio, text, image, visibility, muted }) {
  return (
    <div className={visibility ? '' : 'hidden'}>
        <div className='bg-gray-200 w-screen h-full flex flex-col items-center justify-between space-y-11'>
            <img
                src={image}
                alt="Album Cover"
                className='h-1/2 w-1/2'
            />
            <span className='text-xl text-center font-medium '>{text}</span>
            <ReactAudioPlayer
                className='w-1/2 h-20 mb-11'
                src={audio}
                autoPlay
                controls
                muted={muted}
            />
        </div>
    </div>
  );
}
