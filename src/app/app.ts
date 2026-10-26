import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Application root — routing only.
 *
 * Layout chrome lives in the layouts:
 *  - PublicLayout : public portfolio (top header, footer, chat widget)
 *  - AdminShell   : CMS under /admin (own header + section navigation)
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class App {
  protected title = 'protofollo';
}
