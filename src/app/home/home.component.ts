import {
  Component,
  OnInit,
  SecurityContext
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [
    Title
  ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    public sanitizer: DomSanitizer
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public alertTimeout = 2000;
  public alerts: any = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`,
      publishedOn: new Date().getTime()
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`,
      publishedOn: new Date().getTime()
    }    
  ];

  public showAlert() {
    let alert = {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    };
    this.publishAlert(alert)
  }

  private publishAlert(alert){
    alert.msg = this.sanitizer.sanitize(SecurityContext.HTML, alert.msg)    
    alert.publishedOn = new Date().getTime();
    this.alerts.push(alert);
  }

  public closedAlert(alert, publishedOn){
    console.log(alert);
    let index = -1;
    for(var i=0; i<this.alerts.length;i++){
      if(this.alerts[i].publishedOn === publishedOn) {
        index = i;
        break;
      }
    }
    if(index != -1){
      this.alerts.splice(index, 1);
    }
  }
}
