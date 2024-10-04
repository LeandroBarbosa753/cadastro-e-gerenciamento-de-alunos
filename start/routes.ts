import Route from '@ioc:Adonis/Core/Route'


Route.post('/session', 'SessionsController.store')
Route.delete('/session', 'SessionsController.destroy').middleware('auth')

Route.resource('/adm', 'AdmsController').apiOnly()

Route.group(() => {
    Route.resource('/aluno', 'AlunosController').apiOnly()
    Route.resource('/turma', 'TurmasController').apiOnly()
}).middleware('auth')

