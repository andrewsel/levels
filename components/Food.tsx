import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Food = () => {
  const [response, setResponse] = React.useState<any>(null);

  const handleCameraPress = () => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
    console.log(response);
  };

  const handleLibraryPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
    console.log(response);
  };

  return (
    <View style={s.foodContainer}>
      <View style={s.imageContainer}>
        <Icon name="camera" size={40} color={colour.grey400} />
      </View>
      <View>
        {/* <Text style={s.foodTitle}>Title</Text>
        <Text style={s.foodDescription}>Description</Text> */}
        <Text style={s.foodDescription} onPress={handleCameraPress}>
          Camera
        </Text>
        <Text style={s.foodDescription} onPress={handleLibraryPress}>
          Photo Lib
        </Text>
        <Text style={s.foodDescription}>Res: {JSON.stringify(response)}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  foodTitle: {
    fontWeight: 'bold',
    fontSize: fontSize.lg,
    color: colour.grey300,
    marginBottom: spacing * 2,
  },
  foodDescription: {
    fontSize: fontSize.lg,
    color: colour.grey300,
  },
  foodContainer: {
    backgroundColor: colour.black,
    paddingHorizontal: spacing,
    paddingVertical: spacing * 2,
    display: 'flex',
    flexDirection: 'row',
    marginTop: spacing,
  },
  imageContainer: {
    backgroundColor: colour.grey900,
    width: 100,
    height: 100,
    borderRadius: radius.round,
    marginRight: spacing * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Food;
