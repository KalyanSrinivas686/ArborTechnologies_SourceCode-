import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cli-tool',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cli-tool.html',
    styleUrl: './cli-tool.css'
})
export class CliToolComponent {
    lines = [
        { text: 'arbor init --project high-scale-saas', type: 'cmd' },
        { text: '→ Detecting infrastructure patterns...', type: 'log' },
        { text: '→ Mapping multi-region redundancy...', type: 'log' },
        { text: '→ Optimizing egress paths...', type: 'log' },
        { text: 'Success: Environment ready in 42s.', type: 'success' },
        { text: 'arbor deploy --live', type: 'cmd' }
    ];
}
