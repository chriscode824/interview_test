import { ProjectManagementPage } from './app.po';

describe('project-management App', () => {
  let page: ProjectManagementPage;

  beforeEach(() => {
    page = new ProjectManagementPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
