export default async function bootstrap() {
    const { appConfig } = await import('./app/app.config');
    const { bootstrapApplication } = await import('@angular/platform-browser');
    const { AppComponent } = await import('./app/app.component');
    
    return bootstrapApplication(AppComponent, appConfig);
  }