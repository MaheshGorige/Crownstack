import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AsyncImage } from "./AsyncImage";
import { Song } from "./Home";

interface Props {
  readonly item: Song;
  readonly onOpen: (song: Song) => void;
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
  },
  imageWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const SongItem = ({ item, onOpen }: Props) => {
  return (
    <TouchableOpacity onPress={() => onOpen(item)}>
      <View style={styles.item}>
        <View style={styles.imageWrapper}>
          <AsyncImage source={{ uri: item.artworkUrl60 }} />
        </View>
        <View style={{ flex: 8 }}>
          <Text style={{ fontSize: 16 }}>{item.artistName}</Text>
          <Text style={{ color: "#999" }}>{item.collectionName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
