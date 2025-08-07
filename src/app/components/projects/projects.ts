import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
chooseFile(event:any){
console.log("file choosed!")
const file:File=event.target.files[0];
console.log("file uploded successfully",file);

const reader=new FileReader();
if(file){
  reader.onload=()=>{
    console.log(reader.result as string);
  };
  reader.readAsText(file);
}


}
}
