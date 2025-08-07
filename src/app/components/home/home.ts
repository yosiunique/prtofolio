import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
   
  currentNoteIndex = 0;
  note: string[] = [
  'Hi, I’m Yoseph Getachew a Full Stack Web Developer at Enat Bank SC.',
  'I specialize in building scalable and smart web applications.',
  'I write clean, maintainable code using Angular, React, and Spring Boot.',
  'I craft responsive UIs with a strong focus on performance and accessibility.',
  'I’m passionate about coding and constantly learning new technologies.',
  'I enjoy solving complex problems and turning ideas into functional products.',
  'I thrive in collaborative environments where innovation happens.',
  'Let’s build something amazing together.'
];
     displayedNote = '';
 

  constructor(private cdr:ChangeDetectorRef,zone:NgZone) {
    //this.cycleNotes();
  }
  ngOnInit(): void {
      setInterval(() => {
     this.currentNoteIndex = (this.currentNoteIndex + 1) % this.note.length;
      this.displayedNote = this.note[this.currentNoteIndex];
     this.cdr.detectChanges(); // Ensure the view updates with the new note
    }, 5000);
  }
   
 skills: string[] = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'Node.js', 'Git', 'REST APIs'
  ];

  experiences = [
    {
      company: 'Tech Solutions Inc.',
      role: 'Frontend Developer',
      duration: '2023 - Present',
      description: 'Built responsive web apps using Angular and integrated RESTful APIs.'
    },
    {
      company: 'Web Creative Studio',
      role: 'Intern Developer',
      duration: '2022 - 2023',
      description: 'Assisted in UI design and implementation for multiple client websites.'
    }
  ];
}