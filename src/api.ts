import axios from "axios";

interface IUser {
    email: string;
    name: {
      title: string;
      last: string;
      first: string;
    };
    picture: {
      thumbnail: string;
    };
  }
  interface User {
    results: IUser[];
  }
export const fetchUserData = async () => {
    try {
      const response = await axios.get<User>('https://randomuser.me/api');
      const {
        name: { first, last },
        email,
        picture:{thumbnail},
      } = response.data?.results[0];
      const fullName = `${first} ${last}`;
      console.log(fullName)
      localStorage.setItem(
        'userData',
        JSON.stringify({ name: fullName, email, thumbnail }),
      );
    } catch (error) {
      console.log('Error fetching:', error);
      throw error;
    }
  };