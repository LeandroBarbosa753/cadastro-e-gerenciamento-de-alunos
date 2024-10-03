import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turma from 'App/Models/Turma'
export default class TurmasController {
    public async index({ auth }: HttpContextContract) {
        const adm = await auth.authenticate()
        const turmas = await Turma.query().where('adm_id', adm.id)
        return turmas
    }

    public async store({ request, auth }: HttpContextContract) {
        const adm = await auth.authenticate()
        const { name } = request.only(['name'])
        const turmaReturn = (await adm).related('turmas').create({ name })
        return turmaReturn
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            const turma = await Turma.findByOrFail("id", params.id)
            return turma
        } catch (error) {
            return response.status(400).json({ error: "Turma não encontrada" })

        }
    }


    public async update({ request, response, params }: HttpContextContract) {
        try {
            const { name } = request.only(['name'])
            const turma = await Turma.findByOrFail("id", params.id)
            turma.merge({ name })
            await turma.save()
            return turma
        } catch (error) {
            return response.status(400).json({ error: "Turma não encontrada" })
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            const turma = await Turma.findByOrFail("id", params.id)
            await turma.delete()
            return response.status(200).json({ message: "Turma deletada com sucesso" })

        } catch (error) {
            return response.status(400).json({ error: "Turma não encontrada" })

        }
    }
}
