import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logged_in: Boolean = false;
  language: String = 'English';
  user_role: String | undefined | null;
  count:any;

  // private translate: TranslateService,
  constructor(private router: Router,private cartService:CartService) {}

  ngOnInit() {

     this.cartService.cartUpdates$.subscribe(()=>{
      this.count= this.cartService.count;
    });
    
  }

  ngDoCheck() {
    this.user_role = sessionStorage.getItem('role');
    const user_session_id = sessionStorage.getItem('user_session_id');
    if (user_session_id) {
      this.logged_in = true;
    }
 
    
  }

  // switchLanguage(language: string) {
  //   this.translate.use(language);
  //   if (language == 'en') {
  //     this.language = "English";
  //   } else if (language == 'hn') {
  //     this.language = "हिंदी(Hindi)";
  //   }
  // }

  logOut() {
    sessionStorage.removeItem('user_session_id');
    sessionStorage.removeItem('role');
    this.logged_in = false;
    this.router.navigateByUrl('/sign-in');
    // location.reload()
  }
}
