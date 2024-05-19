import React, { useState } from 'react';
import GenranNav from '../../Genral';

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
      switch (name) {
        case 'password':
          setPassword(value);
          setCharCount(value.length)
          break;
        case 'confirmPassword':
          setConfirmPassword(value);
          break;
        default:
          break;
    }
  };


  const handleUpdateInfo = () => {
    console.log('Changing password...');
  };

  return (
    <div className="space-y-8">
      <GenranNav />
      <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Change Password</h3>
        </div>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <span className="text-sm">*Must be between 8-32 characters (Characters count {charCount})</span>
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 bg-primary p-3 font-mediu hover:bg-opacity-90"
              onClick={handleUpdateInfo}
            >
              Change Password
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
