import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AboutusService {
  public aboutus_url = environment.server_url + '/aboutus/';
  constructor(private apiService: ApiService) {}
  aboutusInfo() {
    return this.apiService.get(this.aboutus_url);
  }
}
