import { ContactlistPage } from './app.po';

describe('contactlist App', function() {
  let page: ContactlistPage;

  beforeEach(() => {
    page = new ContactlistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
