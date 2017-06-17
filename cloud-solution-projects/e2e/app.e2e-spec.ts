import { CloudSolutionProjectsPage } from './app.po';

describe('cloud-solution-projects App', () => {
  let page: CloudSolutionProjectsPage;

  beforeEach(() => {
    page = new CloudSolutionProjectsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
