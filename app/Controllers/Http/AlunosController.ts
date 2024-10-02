import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
export default class AlunosController {
    public async index({ auth }: HttpContextContract) {
        const adm = await auth.authenticate()
        const alunos = await Aluno.query().where('admId', adm.id)
        return alunos
    }

    public async store({ request, auth }: HttpContextContract) {
        const adm = await auth.authenticate()
        const {name, matricula} = request.only(['name', 'matricula'])
        const alunoReturn = (await adm).related('alunos').create({ name, matricula })
        return alunoReturn
    }

    public async show({ response, auth, params }: HttpContextContract) {
        try {
            //const adm = await auth.authenticate()
            const aluno = await Aluno.findByOrFail("id", params.id)
            return aluno
        } catch (error) {
            return response.status(400).json({ error: "Aluno não encontrado(a)" })

        }
    }


    public async update({ request, response, params }: HttpContextContract) {
        try {
            const { ativo } = request.only(['ativo'])
            const aluno = await Aluno.findByOrFail("id", params.id)
            aluno.merge({ ativo })
            await aluno.save()
            return aluno
        } catch (error) {
            return response.status(400).json({ error: "Aluno não encontrado(a)" })
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            const aluno = await Aluno.findByOrFail("id", params.id)
            await aluno.delete()
            return response.status(200).json({ message: "Aluno deletado(a) com sucesso" })

        } catch (error) {
            return response.status(400).json({ error: "Aluno não encontrado(a)" })

        }
    }

}
