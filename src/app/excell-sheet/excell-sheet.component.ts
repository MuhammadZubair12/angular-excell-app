import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcellSheetService } from './excell-sheet.service';
import { NzMessageService } from 'ng-zorro-antd/message';

type AOA = any[][];
@Component({
  selector: 'app-excell-sheet',
  templateUrl: './excell-sheet.component.html',
  styleUrls: ['./excell-sheet.component.css']
})
export class ExcellSheetComponent implements OnInit {

  constructor(
    private userapi: ExcellSheetService,
    private message:NzMessageService
  ) { }

  ngOnInit(): void {
  }

  data: any;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  saveData() {
    // console.log('User', this.data)
    this.userapi.createUser(this.data)
    .subscribe(
      result => {
        this.message.success("Data Added Successfully")
        // console.log(result);
      },
      error => {
        // console.log(error)
        this.message.error("Something went wrong!!!")
      }
    )

  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
