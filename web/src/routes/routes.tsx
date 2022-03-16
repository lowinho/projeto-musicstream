import { Route, Switch } from 'react-router-dom'
import { Account } from '../pages/Account';
import { Author } from '../pages/Author';
import { ChangePassword } from '../pages/ChangePassword';
import { Genre } from '../pages/Genre';

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PlayMusic } from '../pages/PlayMusic';
import { MyList } from '../pages/MyList';
import { User } from '../pages/User';
import { Music } from '../pages/Music';

export function Routes() {
  return (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/user"  component={User} />
        <Route path="/home" component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/mylist/:id" component={MyList} />
        <Route path="/play-music/:id" component={PlayMusic} />
        <Route path="/music" component={Music} />
        <Route path="/genre" component={Genre} />
        <Route path="/author" component={Author} />
        <Route path="/change-password" component={ChangePassword} />
    </Switch>
  );
}

export default Routes;
