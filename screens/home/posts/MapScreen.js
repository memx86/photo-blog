import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

import useHideParentBottomBar from "../../../assets/hooks/useHideParentBottomBar";

const MapScreen = ({ parentNavigation }) => {
  const route = useRoute();
  const location = route.params?.location;
  const locationName = route.params?.locationName;
  const { latitude, longitude } = location;

  useHideParentBottomBar({
    route,
    navigation: parentNavigation,
    name: "Map",
  });

  return (
    <View style={s.container}>
      <MapView
        style={s.container}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={locationName} />
      </MapView>
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
  },
});
export default MapScreen;
