import {Routes} from '@angular/router';
import {Home} from './home/home.component';
import {Details} from './details/details.component';
const routeConfig: Routes = [
    {
      path: '',
      component: Home,
      title: 'Home page',
    },
    {
      path: 'details/:id',
      component: Details,
      title: 'Home details',
    },
  ];
  export default routeConfig;