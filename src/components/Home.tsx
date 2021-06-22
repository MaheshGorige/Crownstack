import React, { useState } from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SongItem } from "./SongItem";
import { SongDetails } from "./SongDetails";

export interface Song {
  readonly wrapperType: string;
  readonly artistId: number;
  readonly collectionId: number;
  readonly artistName: string;
  readonly collectionName: string;
  readonly artistViewUrl: string;
  readonly collectionViewUrl: string;
  readonly primaryGenreName: string;
  readonly artworkUrl60: string;
  readonly artworkUrl100: string;
  readonly releaseDate: string;
  readonly country: string;
  readonly collectionPrice: number;
  readonly currency: string;
  readonly copyright: string;
}

interface Response {
  readonly results: Song[];
  readonly resultCount: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopColor: "#ccc",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export const Home = () => {
  const [songs, setSongs] = useState<Song[]>();
  const [selectedSong, setSelectedSong] = useState<Song>();
  const [isLoading, setIsLoading] = useState(false);

  const getSongs = (): Promise<Response> =>
    fetch("https://itunes.apple.com/search?term=Michael+jackson").then((resp) =>
      resp.json()
    );

  const handleSongs = async () => {
    setIsLoading(true);
    const response = await getSongs();
    setIsLoading(false);
    setSongs(response.results);
  };

  useEffect(() => {
    handleSongs();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <Text style={styles.headerText}>Songs</Text>
      </View>
      <View style={{ flex: 9 }}>
        {isLoading ? (
          <View style={[{ flex: 1, padding: 20 }]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={songs}
            keyExtractor={({ collectionId }, index) =>
              `${collectionId}-${index}`
            }
            renderItem={({ item }) => (
              <SongItem item={item} onOpen={(song) => setSelectedSong(song)} />
            )}
          />
        )}
      </View>
      <SongDetails
        song={selectedSong}
        onClose={() => setSelectedSong(undefined)}
      />
    </View>
  );
};
