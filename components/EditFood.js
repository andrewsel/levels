import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {colour, fontSize, spacing, radius} from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const EditFood = ({foods, setFoods, partIndex}) => {
  const [response, setResponse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCameraPress = () => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
    // console.log(response);
  };

  const handleLibraryPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      displayImage,
    );
  };

  const displayImage = async imageResponse => {
    const path = imageResponse.assets[0].uri;
    console.log('PATH: ' + path);
    // const resizedImageUrl = await ImageResizer.createResizedImage(path, 200, 80, 'PNG', 80, 0, RNFS.DocumentDirectoryPath);
    const base64 = await RNFS.readFile(path, 'base64');
    const newfoods = foods.slice();
    newfoods[partIndex].image = base64;
    setFoods(newfoods);
    setModalVisible(false);
  };

  return (
    <View style={s.foodContainer}>
      <Pressable style={s.imageContainer} onPress={() => setModalVisible(true)}>
        {!foods[partIndex].image && (
          <Icon name="camera" size={40} color={colour.grey400} />
        )}
        {foods[partIndex].image && (
          <Image
            style={s.image}
            source={{
              uri: 'data:image/png;base64,' + foods[partIndex].image,
            }}
          />
        )}
      </Pressable>
      <View style={s.titleAndDesc}>
        <TextInput
          style={s.foodTitle}
          multiline={true}
          onChangeText={t => {
            const newfoods = foods.slice();
            newfoods[partIndex].title = t;
            setFoods(newfoods);
          }}
          value={foods[partIndex].title}
          placeholder="Title"
          placeholderTextColor="#444"
        />
        <TextInput
          style={s.foodDescription}
          multiline={true}
          onChangeText={d => {
            const newfoods = foods.slice();
            newfoods[partIndex].desc = d;
            setFoods(newfoods);
          }}
          value={foods[partIndex].desc}
          placeholder="Description"
          placeholderTextColor="#444"
        />
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={s.centeredView}>
          <View style={s.modalView}>
            <Pressable style={s.modalButton}>
              <Text style={s.modalButtonText} onPress={handleCameraPress}>
                Camera
              </Text>
            </Pressable>
            <Pressable style={s.modalButton} onPress={handleLibraryPress}>
              <Text style={s.modalButtonText}>Photo Library</Text>
            </Pressable>
            <Pressable
              style={[s.modalButton, s.modalButtonCancel]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[s.modalButtonText, s.modalButtonTextCancel]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  titleAndDesc: {
    width: 220,
  },
  foodTitle: {
    fontWeight: 'bold',
    fontSize: fontSize.lg,
    color: colour.grey300,
    marginBottom: spacing * 2,
    paddingTop: 0,
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
    marginTop: 2,
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
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'black',
    // opacity: 1,
    borderRadius: 20,
    paddingHorizontal: spacing * 2,
    paddingTop: spacing * 4,
    paddingBottom: spacing * 6,
    alignItems: 'center',
  },
  modalButton: {
    borderRadius: 4,
    borderColor: colour.smoke,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: spacing,
    width: '100%',
  },
  modalButtonText: {
    color: colour.smoke,
    textAlign: 'center',
    fontSize: fontSize.lg,
  },
  modalButtonCancel: {
    borderWidth: 0,
  },
  modalButtonTextCancel: {
    color: colour.red,
    fontSize: fontSize.lg,
    marginTop: spacing,
  },
});

export default EditFood;
