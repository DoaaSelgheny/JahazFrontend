import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
        private translate: TranslateService,

  )
  {

  }
settings = {
    platformName: 'Water Tenant Monitoring Platform',
    monitoringDuration: 10,
    notifications: true
  };

  onSave() {
    console.log('Saved Settings:', this.settings);
    // هنا تضرب API
  }

  onCancel() {
    console.log('Cancelled');
  }

  ngOnInit(): void {
  }

  systemInfo = [
  { label: 'Version', value: '1.0.0', icon: 'fa-code' },
  { label: 'Database', value: 'PostgreSQL', icon: 'fa-database' },
  { label: 'Backend', value: 'Node.js + Express', icon: 'fa-server' },
  { label: 'Frontend', value: 'React + Tailwind', icon: 'fa-globe' }
];

}
