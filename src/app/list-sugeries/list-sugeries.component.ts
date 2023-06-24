import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-sugeries',
  templateUrl: './list-sugeries.component.html',
  styleUrls: ['./list-sugeries.component.css']
})
export class ListSugeriesComponent {
  agent_name:any=""
  priorityColor:any = {

   'Very High': 'rgb(196, 17, 71)',
    
    'High': 'red',
    
    'Normal': 'green'
    
     };

  constructor(private api:ApiService){
    api.fetchSurgeries().subscribe(
      (response)=>{
        this.surgeries=response
      }
    )
  }
  surgeries:any=[]

  updateAssignedAgentClick=(id:any,assigned_agent:any)=>{
    let dataToSend:any={"id":id,"assigned_agent":assigned_agent}
    
    
    this.api.updateAssignedAgent(dataToSend).subscribe(
      (response:any)=>{
        console.log(response)
      }
    )
      this.api.viewAssignedAgentDetails(assigned_agent).subscribe(
        (response:any)=>{
         this.details=response
         console.log(response)
        }
    )
    }
    details:any=[]
  }
  


    

