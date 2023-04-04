import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

export const Togglebutton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={{display: "flex", flexDirection: "row",}}>
      <Text style={{fontSize: 20, alignSelf: "center", marginRight: 20}}>{isEnabled ? 'Dark Mode' : 'Light Mode'}</Text>

      <Switch
        value={isEnabled} onValueChange={setIsEnabled} thumbColor={isEnabled ? '#141414' : '#D9D9D9'}
      />
    </View>
  );
};