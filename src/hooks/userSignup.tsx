// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { message } from 'antd';

// interface UserSignupProps {
//   loading: boolean;
//   error: string | null;
//   registerUser: (values: { username: string; password: string; phone: string;email:string }) => Promise<void>;
// }

// const UserSignup: React.FC <UserSignupProps> = () => {
  
//   const { login } = useAuth();
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const registerUser = async (values: { username: string; password: string; passwordConfirm: string }) => {
//     if (values.password !== values.passwordConfirm) {
//       return setError('Passwords are not the same');
//     }
//     try {
//       setError(null);
//       setLoading(true);
//       const res = await fetch('http://localhost:8070/Detecto/auth/signup', {
//         method: 'POST',
//         body: JSON.stringify(values),
//       });
//       const data = await res.json();
//       if (res.status === 201) {
//         message.success(data.message);
//         login(data.token, data.user);
//       } else if (res.status === 400) {
//         setError(data.message);
//       } else {
//         message.error('Registration failed');
//       }
//     } catch (error) {
//       message.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, registerUser };
// };

// export default UserSignup;
