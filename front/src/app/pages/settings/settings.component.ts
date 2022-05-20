import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: []
})
export class SettingsComponent implements OnInit {

  date: any;
  persona: any;

  constructor(
    public settingsService: SettingsService,
  ) {

  }

  ngOnInit(): void {
  }



}
