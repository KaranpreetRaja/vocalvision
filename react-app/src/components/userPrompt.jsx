import { useState } from "react";

export default function UserPrompt({ visibility, onChange }) {
  const [prompt, setCreationalPrompt] = useState('');
  const [behavioral, setBehavioralPrompt] = useState('');
  const [promptType, setPromptType] = useState('lecture');
  const [slideLimit, setSlideLimit] = useState(10); 

  const handleInputChange = () => {
    const adjustedBehavioralPrompt = ['lecture', 'story'].includes(promptType) ? promptType : behavioral;

    onChange({ prompt, behavioral: adjustedBehavioralPrompt, slideLimit });
  };

  return (
    <div className={visibility ? '' : 'hidden'}>
      <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto">
        <div>
          <p className="text-lg text-gray-600 mt-4 mb-4">
            Please provide a creational prompt
          </p>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md text-md max-h-20"
            placeholder="Creational prompt..."
            value={prompt}
            onChange={(e) => {
              setCreationalPrompt(e.target.value);
              handleInputChange();
            }}
          ></textarea>
        </div>

        <div>
          <p className="text-lg text-gray-600 mt-4 mb-4">
            Select the behavioral prompt type:
          </p>
          <select
            className="w-full border border-gray-300 p-2 rounded-md text-md"
            value={promptType}
            onChange={(e) => {
              setPromptType(e.target.value);
              handleInputChange();
            }}
          >
            <option value="lecture">Lecture</option>
            <option value="story">Story</option>
            <option value="other">Other</option>
          </select>
        </div>

        {['lecture', 'story'].includes(promptType) ? null : (
          <div>
            <p className="text-lg text-gray-600 mt-4 mb-4">
              {`Please provide a behavioral prompt (Optional)`}
            </p>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md text-md max-h-20"
              placeholder="Behavioral prompt..."
              value={behavioral}
              onChange={(e) => {
                setBehavioralPrompt(e.target.value);
                handleInputChange();
              }}
            ></textarea>
          </div>
        )}

        <div>
          <p className="text-lg text-gray-600 mt-4 mb-4">
            {`Set the slide limit:`}
          </p>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-md text-md"
            value={slideLimit}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setSlideLimit(isNaN(value) || value <= 0 ? 1 : value);
              handleInputChange();
            }}
          />
        </div>
      </div>
    </div>
  );
}
