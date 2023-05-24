import AsyncStorage from "@react-native-async-storage/async-storage";

export const cacheUsers = async (user) => {
    try{
        await AsyncStorage.setItem('user', JSON.stringify(user))
    }catch(err){
      console.log(err)
    }
  }

  //Getting users
  export const getCachedUsers = async () => {
    try{
        const users = await AsyncStorage.getItem('user')

        if(users != null){
          const parsedUsers = JSON.parse(users);
          return parsedUsers;
        }
    }catch(err){
      console.log(err)
    }
  }