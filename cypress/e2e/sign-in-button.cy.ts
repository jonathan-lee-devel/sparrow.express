/// <reference types="cypress" />

describe('Sign-In Button', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Sign in with Google button redirects to Sign-In page', () => {
        cy.get('[id^=user-image-dropdown-button]').click({multiple: false})
        cy.get('[id^=user-image-dropdown-button-sign-in]').click({multiple: false})
        cy.get('[id^=login-with-google-button]').click({multiple: false, force: true, waitForAnimations: true})

        cy.location().then((location) => {
            expect(location.hash).to.be.empty
            expect(location.host).to.eq('localhost:3000')
            expect(location.protocol).to.eq('http:')
            expect(location.pathname).to.eq('/sign-in')
        })
    })

    it('Click Sign-In then close modal should redirect to Landing Page', () => {
        cy.get('[id^=user-image-dropdown-button]').click({multiple: false})
        cy.get('[id^=user-image-dropdown-button-sign-in]').click({multiple: false})
        cy.get('[id^=sign-in-modal-close-button]').click({multiple: false, force: true, waitForAnimations: true})

        cy.location().then((location) => {
            expect(location.hash).to.be.empty
            expect(location.host).to.eq('localhost:3000')
            expect(location.protocol).to.eq('http:')
            expect(location.pathname).to.eq('/')
        })
    })
})
