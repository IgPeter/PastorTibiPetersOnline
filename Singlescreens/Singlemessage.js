// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import Video from 'react-native-video';

// export const Singlemessage = () => {
//   const [paused, setPaused] = useState(true);

//   const handlePlay = () => {
//     setPaused(false);
//   };

//   const handlePause = () => {
//     setPaused(true);
//   };

//   return (
//     <View>
//       <Video
//         paused={paused}
//         style={{ width: '100%', height: 300 }}
//       />

//       <View>
//         {paused ? (
//           <Button title="Play" onPress={handlePlay} />
//         ) : (
//           <Button title="Pause" onPress={handlePause} />
//         )}
//       </View>
//     </View>
//   );
// };