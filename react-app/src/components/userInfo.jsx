import { useState } from "react";

export default function UserInfo({ visibility, onChange, userid }) {
  const [session_name, setVisionName] = useState('');
  const [description, setDescription] = useState('');

  const session_owner = userid;
  
  const handleInputChange = () => {
    onChange({ session_name,  session_owner, userid});
  };

  return (
    <div className={visibility ? '' : 'hidden'}>
      <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto">
        <div className="flex justify-between items-center mb-11">
          <h1 className="text-3xl font-semibold">Vision Information</h1>
        </div>
        <div>
          <label htmlFor="courseName" className="block text-lg text-gray-600 mb-2">
            Vision Name:
          </label>
          <input
            type="text"
            id="session_name"
            className="w-full border border-gray-300 p-2 rounded-md text-md"
            placeholder="Enter vision name"
            value={session_name}
            onChange={(e) => {
              setVisionName(e.target.value);
              handleInputChange();
            }}
          />
        </div>

        <p className="text-lg text-gray-600 mt-4 mb-4">
          Please provide a brief description of your course (Optional):
        </p>
        <textarea
          className="w-full border border-gray-300 p-2 rounded-md text-md max-h-20"
          placeholder="Add a description..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            handleInputChange();
          }}
        ></textarea>
      </div>
    </div>
  );
}