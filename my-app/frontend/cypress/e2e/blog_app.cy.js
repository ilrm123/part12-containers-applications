describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Apina Mies',
      username: 'aappa123',
      password: 'monkeyman'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login:')
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('aappa123')
      cy.get('#password').type('monkeyman')
      cy.get('#login-button').click()

      cy.contains('Logged in as aappa123')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('aappa123')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password!')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('aappa123')
      cy.get('#password').type('monkeyman')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Otsikko')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('Osoite')
      cy.contains('Add blog').click()

      cy.contains('Otsikko, written by Kirjoittaja')
    })

    it('A blog can be liked', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Otsikko')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('Osoite')
      cy.contains('Add blog').click()
      cy.contains('Show').click()
      cy.contains('Like').click()
      cy.visit('http://localhost:3000')
      cy.contains('Show').click()

      cy.contains('Likes:1')
    })

    it('A blog can be removed', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Otsikko')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('Osoite')
      cy.contains('Add blog').click()
      cy.visit('http://localhost:3000')
      cy.contains('Show').click()
      cy.contains('Remove blog').click()
      cy.on('window:confirm', () => true)
      cy.visit('http://localhost:3000')

      cy.contains('Otsikko').should('not.exist')
    })

    it('Blogs are sorted according to likes', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Otsikko')
      cy.get('#author').type('Kirjoittaja')
      cy.get('#url').type('Osoite')
      cy.contains('Add blog').click()

      cy.visit('http://localhost:3000')
      cy.contains('Create new blog').click()
      cy.get('#title').type('Parempi')
      cy.get('#author').type('Tyyppi')
      cy.get('#url').type('like.com')
      cy.contains('Add blog').click()
      cy.contains('Show').click()
      cy.contains('Show').click()
      cy.contains('Close').click()
      cy.contains('Like').click()

      cy.visit('http://localhost:3000')
      cy.contains('Show').click()

      cy.contains('Url:like.com')
    })

  })

})

