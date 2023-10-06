import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _NoteService:NoteService, private _Router:Router){

  }
  notes:any = null;
  searchKey:string = ''
  noteId:string = ''

  noteAddForm:FormGroup = new FormGroup({
    title:new FormControl(null),
    content:new FormControl(null)
  })

  noteEditForm:FormGroup= new FormGroup({
    title:new FormControl(null),
    content:new FormControl(null)
  })

  getNote(){
    this._NoteService.getNotes().subscribe({
      next:(repsonse)=>{
        console.log(repsonse.notes);  
        this.notes = repsonse.notes;
        // console.log(this.notes[0].title);
        

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  
  addNote(noteAddForm:FormGroup){
    // console.log(noteAddForm.value);
    
    this._NoteService.addNotes(noteAddForm.value).subscribe({
      next:(repsonse)=>{
        console.log(repsonse);
        this.getNote();
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  editNote(noteEditForm:FormGroup){
    // console.log(noteEditForm.value);
    
    this._NoteService.editNotes(this.noteId,noteEditForm.value).subscribe({
      next:(repo)=>{
        console.log(repo);
        this.getNote();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getNoteId(id:string){
    this.noteId = id
    
  }



  ngOnInit(): void {
    this.getNote();
  }

}
