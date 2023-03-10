import { Component, h } from '@stencil/core';
import 'jeep-sqlite';
import { Route } from 'stencil-router-v2';
import { ROUTES } from '../../global/routes';
import store from '../../store/store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    const Router = store.router;

    const dbInitialized = store.database.get('isInitialized');

    if (!dbInitialized) {
      return <h1>Connecting to database ...</h1>;
    }

    return (
      <div class="content">
        <header>Super Secure Record Store</header>

        <main>
          <Router.Switch>
            <Route path={ROUTES.ROOT} render={() => <records-list />} />
            <Route path={/.*/} render={() => <records-list />} />
          </Router.Switch>
        </main>
      </div>
    );
  }
}
