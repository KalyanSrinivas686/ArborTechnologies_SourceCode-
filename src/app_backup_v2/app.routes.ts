import { Routes } from '@angular/router';
import { MealOpsComponent } from './components/sudasko/sudasko';

export const routes: Routes = [
    { path: 'sudasko', component: MealOpsComponent },
    { path: 'sudasko/pay', component: MealOpsComponent }
];
