import { PaperProvider } from "react-native-paper";
import Container from "./src/screens/Container";

export default function App() {
    return (
        <PaperProvider>
            <Container />
        </PaperProvider>
    );
}
