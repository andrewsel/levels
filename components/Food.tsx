import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const Food = () => {
  const [response, setResponse] = React.useState<any>(null);
  const [image, setImage] = React.useState(
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
  );

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

  const handleBase64 = async () => {
    const path: string = response.assets[0].uri;
    console.log('PATH: ' + path);
    // const resizedImageUrl = await ImageResizer.createResizedImage(path, 200, 80, 'PNG', 80, 0, RNFS.DocumentDirectoryPath);
    const base64 = await RNFS.readFile(path, 'base64');
    setImage(base64);
    // console.log('BASE64: ' + base64);
  };

  return (
    <View style={s.foodContainer}>
      <View style={s.imageContainer}>
        {/* <Icon name="camera" size={40} color={colour.grey400} /> */}
        <Image
          style={s.image}
          source={{
            uri: 'data:image/png;base64,' + image,
          }}
        />
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
        <Text style={s.foodDescription} onPress={handleBase64}>
          Base64
        </Text>
        {/* <Text style={s.foodDescription}>Res: {JSON.stringify(response)}</Text> */}
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
    marginRight: spacing * 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: radius.round,
  },
});

export default Food;
