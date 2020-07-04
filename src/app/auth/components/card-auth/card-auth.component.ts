import { Component, OnInit, Input } from '@angular/core';
import { Alert } from './../../../core/models/alert.model';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss'],
})
export class CardAuthComponent implements OnInit {
  @Input() subtitle: String;
  @Input() disabled: boolean;
  @Input() alert: Alert;
  @Input() loading: boolean;
  @Input() btnFooterRouterLink: String = '';
  @Input() btnFooterName: String = '';
  @Input() btnSubmitName: String = 'Enviar';
  @Input() btnFooterVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
