import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-case-studies',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './case-studies.component.html',
    styleUrls: ['./case-studies.component.css']
})
export class CaseStudiesComponent { }
