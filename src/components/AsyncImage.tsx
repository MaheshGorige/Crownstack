import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

interface Props {
  readonly source: { uri: string };
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: 50,
    height: 50,
  },
  placeholder: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export const AsyncImage = ({ source }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={source}
        resizeMode={"contain"}
        onLoad={onLoad}
        style={styles.image}
      />
      {!isLoaded && <View style={styles.placeholder}></View>}
    </View>
  );
};
