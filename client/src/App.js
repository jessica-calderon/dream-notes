import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
//import logo from //change to our logo
import './App.css';

const httpLink = createHttpLink({
  uri: `/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <div className='container'>
        <Home />
      </div>
      <Footer />
      </div>
    </ApolloProvider>

  );
}

   
  

export default App;
