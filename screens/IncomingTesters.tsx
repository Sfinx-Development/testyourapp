import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TesterConfirmCard from "../components/TesterConfirmCard";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { confirmTesterToAppAsync } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

type NavigationProps = RootNavigationScreenProps<"IncomingTesters">;

export default function IncomingTesters({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const myApps = useAppSelector((state) => state.appSlice.myApps);

  const unconfirmedTesters = useAppSelector(
    (state) => state.appSlice.uncofirmedTesters
  );

  const handleConfirmTesterToApp = (testerToAppId: string) => {
    if (activeAccount) {
      dispatch(confirmTesterToAppAsync(testerToAppId));
    }
  };

  useEffect(() => {
    console.log("UNCONFIRMED TESTERS: ", unconfirmedTesters);
  }, [unconfirmedTesters]);

  const renderAppCard = ({ item }: { item: any }) => (
    <TesterConfirmCard
      appName={item.appName}
      testerUsername={item.username}
      testerMail={item.playStoreMail}
      testerId={item.testerId}
      onClick={() => handleConfirmTesterToApp(item.testerToAppId)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {unconfirmedTesters.length > 0 ? (
        <FlatList
          data={unconfirmedTesters}
          renderItem={renderAppCard}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text
          style={[
            {
              fontSize: 20,
              top: 100,
              textAlign: "center",
            },
            { color: colors.secondary, fontFamily: colors.fontFamily },
          ]}
        >
          No incoming testers
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  flatListContainer: {
    justifyContent: "space-between",
  },
  header: {
    padding: 20,
    top: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutText: {
    color: "blue",
  },
  content: {
    padding: 20,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
  },
  cardImage: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
});
