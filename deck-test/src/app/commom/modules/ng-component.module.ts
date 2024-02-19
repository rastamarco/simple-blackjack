import {NgModule} from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [ 
        DropdownModule,
        ProgressSpinnerModule,
        MessagesModule,
        MessageModule,
        ButtonModule
    ],
    exports: [ 
        DropdownModule,
        ProgressSpinnerModule,
        MessagesModule,
        MessageModule,
        ButtonModule
    ],
})
export class AppModuleNgComponents { }