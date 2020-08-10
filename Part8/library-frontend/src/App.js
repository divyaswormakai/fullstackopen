import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useSubscription } from '@apollo/client';
import Favorites from './components/Favorite';
import { BOOK_ADDED } from './subscriptions';
import { ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      console.log(bookAdded);
      window.alert('New book added');
      updateCacheWith(bookAdded);
    },
  });

  const updateCacheWith = (bookAdded) => {
    const includedIn = (set, object) =>
      set.map((p) => p.title).includes(object.title);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    console.log('Data in store');
    console.log(dataInStore.allBooks);
    console.log(bookAdded);

    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      console.log('New book is now added');
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) },
      });
    }
  };

  const UserLogout = () => {
    setToken(null);
    localStorage.removeItem('userToken');
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token === null ? (
          <button onClick={() => setPage('login')}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('favorite')}>Recommendation</button>
            <button onClick={UserLogout}>Logout</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Favorites show={page === 'favorite'} />
    </div>
  );
};

export default App;
