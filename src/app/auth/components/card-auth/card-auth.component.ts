import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss'],
})
export class CardAuthComponent implements OnInit {
  @Input() title: String;
  @Input() subtitle: String;
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() btnFooterRouterLink: String = '';
  @Input() btnFooterName: String = '';
  @Input() btnSubmitName: String = 'Enviar';
  @Input() btnFooterVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
