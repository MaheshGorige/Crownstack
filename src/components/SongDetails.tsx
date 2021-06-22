import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Song } from "./Home";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopColor: "#F5F5F5",
    borderBottomColor: "#F6F6F6",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 22,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeBtnWrapper: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  imageWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  artistName: {
    fontSize: 16,
  },
  collectionName: {
    color: "#999",
    textAlign: "center",
  },
  infoWrapper: {
    padding: 20,
  },
  subHeading: {
    fontWeight: "bold",
    lineHeight: 22,
  },
  footer: {
    flex: 0.5,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
});

interface Props {
  readonly song: Song | undefined;
  readonly onClose: () => void;
}

export const SongDetails = ({ song, onClose }: Props) => {
  const getDate = (date: string) => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(
      date
    ).getFullYear()}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={song !== undefined}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Song Details</Text>
          </View>
          <View style={styles.closeBtnWrapper}>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ marginRight: 15, fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>

        {song && (
          <View style={{ flex: 8 }}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: song.artworkUrl100 }}
                style={styles.image}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.artistName}>{song.artistName}</Text>
              <Text style={styles.collectionName}>{song.collectionName}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text>
                <Text style={styles.subHeading}>Genre name:</Text>{" "}
                {song.primaryGenreName}
              </Text>
              <Text>
                <Text style={styles.subHeading}>Released on:</Text>{" "}
                {getDate(song.releaseDate)}
              </Text>
              <Text>
                <Text style={styles.subHeading}>Country:</Text> {song.country}
              </Text>
              <Text>
                <Text style={styles.subHeading}>collection price:</Text>{" "}
                {song.collectionPrice} {song.currency}
              </Text>
            </View>
          </View>
        )}
        {song && song.copyright && (
          <View style={styles.footer}>
            <Text>{song?.copyright}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};
