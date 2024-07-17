import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Fafa from "@app/examples/swipeable";

export default function Dada() {
  return (
    <ScrollView>
      <Text>dada</Text>
      <Fafa/>
      {/* <ChartWithGridExample/> */}
      {/* <ChartWithNestedTransformsExample/> */}
      {[...Array(50)].map(
        (_, i) => <Text key={i}>dada {i}</Text>
      )}
    </ScrollView>
  );
}
