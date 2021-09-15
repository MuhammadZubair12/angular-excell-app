import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


const modules = [
  CommonModule,
  NzMenuModule,
  NzIconModule,
  NzInputModule,
  NzButtonModule,
  NzTreeModule,
  NzFormModule,
  NzSelectModule,
  NzCheckboxModule,
  NzMessageModule,
  NzModalModule,
  NzTableModule,
  NzBreadCrumbModule,
  NzBadgeModule,
  NzTagModule,
  NzDropDownModule,
  NzSpinModule,
  NzInputNumberModule,
  NzUploadModule,
  NzStatisticModule,
  NzAlertModule,
  NzDatePickerModule,
  NzPopoverModule,
  NzLayoutModule
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class UIModule { }
