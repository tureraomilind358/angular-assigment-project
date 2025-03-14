import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-assigment-project';

  gridApi: any;
  gridColumnApi: any;
  formData = { id: null, ruleName: '', active: '', type: '', subType: '', domain: '', impacted: 0, favourite: '', scheduled: '', lastScheduledDate: '', alert: '' };
  isEdit = false; // Track whether we are editing an existing row

  rowData: any = [
    { id: 997, ruleName: "2DS - Trace Changes", active: "Y", type: "Match", subType: "2DS - Trace Changes", domain: "", impacted: 0, favourite: "N", scheduled: "Y", lastScheduledDate: "01-May-2024 01:15 PM", alert: "Y" },
    { id: 996, ruleName: "Trace Changes", active: "Y", type: "Match", subType: "2DS - Trace Changes", domain: "", impacted: 0, favourite: "N", scheduled: "N", lastScheduledDate: "01-May-2024 01:15 PM", alert: "N" },
    { id: 986, ruleName: "File Monitor", active: "Y", type: "Match", subType: "1DS - File Monitor", domain: "", impacted: 57994, favourite: "N", scheduled: "Y", lastScheduledDate: "01-May-2024 01:15 PM", alert: "Y" },
    { id: 985, ruleName: "testreve1", active: "Y", type: "Match", subType: "1DS - File Monitor", domain: "", impacted: 13773, favourite: "N", scheduled: "N", lastScheduledDate: "01-May-2024 01:15 PM", alert: "N" }
  ];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Rule ID', sortable: true, filter: true },
    { field: 'ruleName', headerName: 'Rule Name', sortable: true, filter: true },
    { field: 'active', headerName: 'Active Status', sortable: true, filter: true },
    { field: 'type', headerName: 'Rule Type', sortable: true, filter: true },
    { field: 'subType', headerName: 'Sub Type', sortable: true, filter: true },
    { field: 'domain', headerName: 'Domain Category', sortable: true, filter: true },
    { field: 'impacted', headerName: 'Impacted Users', sortable: true, filter: true },
    { field: 'favourite', headerName: 'Favourite Rule', sortable: true, filter: true },
    { field: 'scheduled', headerName: 'Scheduled Task', sortable: true, filter: true },
    { field: 'lastScheduledDate', headerName: 'Last Scheduled Date', sortable: true, filter: true },
    { field: 'alert', headerName: 'Alert Status', sortable: true, filter: true }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    filter: true,
    sortable: true
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  toggleColumn(colId: string) {
    if (!this.gridColumnApi) {
      console.error('gridColumnApi is not initialized');
      return;
    }

    const column = this.gridColumnApi.getColumn(colId);
    if (column) {
      const isCurrentlyVisible = column.isVisible();
      this.gridColumnApi.setColumnVisible(colId, !isCurrentlyVisible);
      console.log(`Column ${colId} is now ${!isCurrentlyVisible ? 'visible' : 'hidden'}`);
    } else {
      console.error(`Column with ID ${colId} not found`);
    }
  }

  getSelectedRows() {
    const selectedNodes = this.gridApi.getSelectedNodes(); // Get selected row nodes
    if (selectedNodes.length > 0) {
      const selectedData = selectedNodes.map((node: { data: any }) => node.data); // Extract data from selected rows
      console.log('Selected Rows:', selectedData); // Log selected row data
    } else {
      console.log('No rows selected');
    }
  }


  isShow = true;
  add(){
    this.isShow = false;
  }



  // Save or Update Data
  saveData() {
    if (this.isEdit) {
      // Update existing record
      const index = this.rowData.findIndex((item: { id: number }) => item.id === this.formData.id);
      if (index !== -1) {
        this.rowData[index] = { ...this.formData };
        console.log('Updated Data:', this.formData);
      }
    } else {
      // Add new record
      const newId = Math.max(...this.rowData.map((item: { id: number }) => item.id), 0) + 1;
      const newRecord = { ...this.formData, id: newId };
      this.rowData.push(newRecord);
      console.log('Saved Data:', newRecord);
    }

    // Reset form
    this.formData = { id: null, ruleName: '', active: '', type: '', subType: '', domain: '', impacted: 0, favourite: '', scheduled: '', lastScheduledDate: '', alert: '' };

    // Reset UI state
    this.isShow = true; // Hide form
    this.isEdit = false;
  }


  // Edit Selected Row
  editSelectedRow() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      this.formData = { ...selectedNodes[0].data };
      this.isEdit = true; // Set edit mode
      this.isShow = false; // Hide form
    } else {
      console.log("No row selected for editing");
    }
  }



}


