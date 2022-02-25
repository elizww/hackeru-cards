import { BrowserRouter } from 'react-router-dom';
import Header from './layout/header/Header';
import { UserProvider } from './user/UserProvider';

const App = () => (
    <div className="App">
        <BrowserRouter>
            <UserProvider>
                <Header />
            </UserProvider>
        </BrowserRouter>
    </div>
);

export default App;
