import { trigger } from '@angular/animations';

import {transition, animate, style, state } from '@angular/animations';

export let fade = trigger('fade', [
    state("void", style({opacity: 0})),
    transition("void<=>*",[
        animate(300)
    ])
]);

export let slideOut = trigger('slideOut', [
    state('void', style({transform: 'translateX(100%)'})),
    transition("*=>void", [
        animate(1000)
    ])
])