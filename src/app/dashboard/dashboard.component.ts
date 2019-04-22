import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rows = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'subject', name: 'Subject' },
    { prop: 'time', name: 'Time' },
    { prop: 'totalMarks', name: 'Total Marks' },

  ];

  temp = [];
  table: any;

  sortOrders = [];
  quiz: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getQuiz();
  }

  addQuiz(){
    this.router.navigateByUrl('/newquiz');
  }

  getQuiz() {
    this.authService.getQuiz().subscribe((data) => {
      console.log(data);
      if (data['success'] === true) {
        this.quiz = data['msg'];
        this.sortOrders = [];
        this.sortOrders.push({ 'show': 'All', 'value': this.rows.length });
        this.temp = [...this.quiz];
        this.rows = this.temp;
      } else {
        console.log('error');
      }
    });
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  showResponse(row) {
    this.router.navigate(['/response', row['_id']]);
  }

  deleteQuiz(row){
    this.authService.deleteQuiz(row['id']).subscribe((data) => {
      if (data['success'] === true) {
        this.getQuiz();
      } else {
        console.log('error');

      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      // console.log(d);
      return d.title.toLowerCase().indexOf(val) !== -1 || d.subject.toLowerCase().indexOf(val) !== -1;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

}
