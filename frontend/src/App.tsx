import AppRoute from "./routes/AppRoute";
import QueryProvider from "./providers/QueryProvider";
import { BrowserRouter } from "react-router";
import AuthInitializer from "./providers/AuthInitialize";
import ThemeProvider from "./providers/ThemeProvider";
import { CollapsedProvider } from "./providers/CollapsedProvider";
import { ChartProvider } from "./providers/ChartProvider";


const App = () => {
    return (
        <ThemeProvider>
            <CollapsedProvider>
                <QueryProvider>
                    <BrowserRouter>
                        <AuthInitializer>
                            <ChartProvider>
                                <AppRoute />
                            </ChartProvider>
                        </AuthInitializer>
                    </BrowserRouter>
                </QueryProvider>
            </CollapsedProvider>
        </ThemeProvider>
    );
};
export default App;
