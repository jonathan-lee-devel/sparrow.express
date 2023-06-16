describe('Initial Test', () => {
  it('Passes after waiting for dev server to spin up', () => {
    cy.visit('http://localhost:3000')
    cy.wait(10_000)
  })
})
