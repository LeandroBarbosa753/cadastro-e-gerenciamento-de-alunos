import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adm from 'App/Models/Adm'
export default class AdmsController {
  public async index({ }: HttpContextContract) {
    const adms = await Adm.query().preload('turmas').preload('alunos')
    return adms
  }


  public async store({ request }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    const adm = await Adm.create({
      name,
      email,
      password
    })
    return adm

  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const adm = await Adm.findByOrFail("id", params.id)
      return adm
    } catch (error) {
      return response.status(404).json({ error: "Servidor não encontrado" })

    }


  }


  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { name, email, password } = request.only(['name', 'email', 'password'])
      const adm = await Adm.findByOrFail("id", params.id)
      adm.merge({ name, email, password })
      await adm.save()
      return adm
    } catch (error) {
      return response.status(400).json({ error: "Servidor não encontrado" })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const adm = await Adm.findByOrFail("id", params.id)
      await adm.delete()
      return response.status(203).json({ message: "Servidor deletado" })
    } catch (error) {
      return response.status(400).json({ error: "Servidor não encontrado" })
    }

  }
}
