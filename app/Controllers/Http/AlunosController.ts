import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
export default class AlunosController {
    public async index({ auth }: HttpContextContract) {
        const adm = await auth.authenticate()
        const alunos = await Aluno.query().where('adm_id', adm.id)
        return alunos
    }

    public async store({ request, auth }: HttpContextContract) {
        const adm = await auth.authenticate()
        const { name, matricula, turma_name } = request.only(['name', 'matricula', 'turma_name'])
        const alunoReturn = (await adm).related('alunos').create({ name, matricula, turma_name })
        return alunoReturn
    }


    public async show({ response, params }: HttpContextContract) {
        try {
            const aluno = await Aluno.findByOrFail("id", params.id)
            return aluno
        } catch (error) {
            return response.status(400).json({ error: "Aluno não encontrado(a)" })

        }
    }


    public async update({ request, response, params }: HttpContextContract) {
        try {
            const { ativo, turma_name } = request.only(['ativo', 'turma_name'])
            const aluno = await Aluno.findByOrFail("id", params.id)
            aluno.merge({ ativo, turma_name })
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
