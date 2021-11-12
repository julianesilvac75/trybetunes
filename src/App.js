import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import LoadingMessage from './components/LoadingMessage';

class App extends React.Component {
  constructor() {
    super();

    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.handleLoginRender = this.handleLoginRender.bind(this);

    this.state = {
      userName: '',
      isLoginButtonDisabled: true,
      loading: false,
      logged: false,
    };
  }

  handleLoginRender(props) {
    const { isLoginButtonDisabled,
      userName,
      logged } = this.state;

    if (logged) {
      return <Redirect to="/search" />;
    }
    return (<Login
      { ...props }
      isLoginButtonDisabled={ isLoginButtonDisabled }
      onUserNameChange={ this.onUserNameChange }
      onSaveButtonClick={ this.onSaveButtonClick }
      userName={ userName }
    />);
  }

  onUserNameChange({ target }) {
    const { value } = target;
    const minNameLength = 3;

    this.setState({
      isLoginButtonDisabled: value.length < minNameLength,
      userName: value,
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              loading ? <LoadingMessage /> : this.handleLoginRender(props)
            ) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
