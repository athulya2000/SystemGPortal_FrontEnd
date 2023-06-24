import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  fetchSurgeries=()=>{
    return this.http.get("http://localhost:8080/viewAllSurgeries")
  }
 updateAssignedAgent=(dataToSend:any)=>{
  return this.http.put("http://localhost:8080/updateAssignedAgent",dataToSend)
 }
 viewAssignedAgentDetails=(agent_name:any)=>{
  return this.http.get("http://localhost:8080/agentDetails/"+agent_name)
 }
}
