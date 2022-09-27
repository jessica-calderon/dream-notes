import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

//import logo from //change to our logo
import './App.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
}); 

function App() {
  return (
    <ApolloProvider client={client}>
      <div className=''>
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
