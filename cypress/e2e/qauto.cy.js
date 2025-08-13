describe('UI Elements Check', () => {
  const urls = {
    facebook: 'https://www.facebook.com/Hillel.IT.School',
    telegram: 'https://t.me/ithillel_kyiv',
    youtube: 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
    instagram: 'https://www.instagram.com/hillel_itschool/',
    linkedin: 'https://www.linkedin.com/school/ithillel/',
    owner: 'https://ithillel.ua',
    support: 'mailto:developer@ithillel.ua'
  };

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('Should contain Sign up button anywhere on the page', () => {
    cy.contains('button', 'Sign up', { timeout: 10000 })
      .should('exist')
      .and('be.visible')
      .and('be.enabled');
  });

  context('Footer social links', () => {
    beforeEach(() => {
      cy.get('#contactsSection', { timeout: 10000 })
        .should('be.visible')
        .as('footerSection');
    });

    it('Contains all social media links', () => {
      const socialLinks = [
        urls.facebook,
        urls.telegram,
        urls.youtube,
        urls.instagram,
        urls.linkedin
      ];

      cy.get('@footerSection').within(() => {
        socialLinks.forEach(link => {
          cy.get(`a[href="${link}"]`, { timeout: 5000 })
            .should('exist')
            .and('be.visible');
        });
      });
    });

    it('Contains link to owner site', () => {
      cy.get('@footerSection')
        .find(`a[href="${urls.owner}"]`, { timeout: 5000 })
        .should('exist')
        .and('be.visible');
    });

    it('Contains support email link', () => {
      cy.get('@footerSection')
        .find(`a[href="${urls.support}"]`, { timeout: 5000 })
        .should('exist')
        .and('be.visible');
    });
  });
});

