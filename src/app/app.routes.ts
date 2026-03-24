import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { CaseStudiesComponent } from './pages/case-studies/case-studies.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'case-studies', component: CaseStudiesComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' }
];
