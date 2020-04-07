import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to'

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { WorkbasketModule } from './workbasket/workbasket.module';
import { SearchModule } from './search/search.module';
import { AppRoutingModule } from './app.routing';

import { CasesModule } from './cases/cases.module';
import { AppConfig } from './app.config';
import { ErrorComponent } from './error/error.component';
import { SharedModule } from './shared/shared.module';
import { isPlatformBrowser, APP_BASE_HREF, PlatformLocation, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { OAuth2RedirectModule } from './oauth2/oauth2-redirect.module';
import { AppConfigGuard } from './app.config.guard';
import { AbstractAppConfig, ActivityModule } from '@hmcts/ccd-case-ui-toolkit';

export function getBaseHref(locationStrategy: LocationStrategy): string {
  console.log(locationStrategy.getBaseHref());
  console.log(locationStrategy.path);
  console.log(locationStrategy.prepareExternalUrl(''));
  return locationStrategy.getBaseHref();
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ccd-case-management-web' }),
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ScrollToModule.forRoot(),
    CoreModule,
    WorkbasketModule,
    SearchModule,
    CasesModule,
    SharedModule,
    OAuth2RedirectModule,
    ActivityModule
  ],
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [LocationStrategy]
    },
    AppConfig,
    AppConfigGuard,
    {
      provide: AbstractAppConfig,
      useExisting: AppConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
