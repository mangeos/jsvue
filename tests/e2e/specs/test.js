// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://www.student.bth.se/~maoi19/editor')
    cy.contains('h1', 'Documents')
  })
})


describe('My Second Test', () => {
  it('pushing the save button', () => {
    cy.visit('http://www.student.bth.se/~maoi19/editor')
    cy.get('button').contains('save').click()
  })
})


describe('My Second Test', () => {
  it('pushing the show all button', () => {
    cy.visit('http://www.student.bth.se/~maoi19/editor')
    cy.get('button').contains('show all').click()
    cy.get('#myeditor').find('.flexis').its('length').should('be.gte', 1)
  })
})
